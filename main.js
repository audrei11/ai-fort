/* ===== CUSTOM CURSOR ===== */
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let ringX = 0, ringY = 0, dotX = 0, dotY = 0;
let raf;

document.addEventListener('mousemove', e => {
  dotX = e.clientX; dotY = e.clientY;
  dot.style.left = dotX + 'px';
  dot.style.top = dotY + 'px';
});

function animateRing() {
  ringX += (dotX - ringX) * 0.12;
  ringY += (dotY - ringY) * 0.12;
  ring.style.left = ringX + 'px';
  ring.style.top = ringY + 'px';
  raf = requestAnimationFrame(animateRing);
}
animateRing();

/* ===== NAVBAR SCROLL ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

/* ===== HAMBURGER ===== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

/* ===== SCROLL FADE-IN ===== */
const fadeTargets = document.querySelectorAll(
  '.service-card, .project-card, .testimonial-card, .stack-cat, .step, .value, .hero-content, .hero-visual'
);
fadeTargets.forEach(el => el.classList.add('fade-up'));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const siblings = Array.from(entry.target.parentElement.querySelectorAll('.fade-up'));
    const idx = siblings.indexOf(entry.target);
    setTimeout(() => entry.target.classList.add('visible'), idx * 70);
    observer.unobserve(entry.target);
  });
}, { threshold: 0.1 });

fadeTargets.forEach(el => observer.observe(el));

/* ===== MAGNETIC BUTTONS ===== */
document.querySelectorAll('.btn-primary, .btn-ghost').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

/* ===== ACTIVE NAV HIGHLIGHT ===== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 140) current = s.id;
  });
  navLinks.forEach(a => {
    const isActive = a.getAttribute('href') === `#${current}`;
    a.style.color = isActive ? '#e8e8f0' : '';
  });
}, { passive: true });

/* ===== CONTACT FORM ===== */
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const orig = btn.textContent;
  const fd = new FormData(e.target);
  const payload = Object.fromEntries(fd.entries());

  btn.textContent = 'Sending…';
  btn.disabled = true;

  fetch('https://n8n.srv868353.hstgr.cloud/webhook/ccbf1e2b-514c-456d-b568-58832b5f8f26', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
    .then(() => {
      btn.textContent = 'Message Sent ✓';
      btn.style.background = 'linear-gradient(135deg, #059669, #10b981)';
      e.target.reset();
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = '';
        btn.disabled = false;
      }, 3500);
    })
    .catch(() => {
      btn.textContent = 'Failed — try again';
      btn.style.background = 'linear-gradient(135deg, #dc2626, #ef4444)';
      btn.disabled = false;
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = '';
      }, 3000);
    });
});

/* ===== CHATBOT ===== */
const RESPONSES = {
  services: `I offer 6 core services:<br><br>
    <b>1. Workflow Automation</b> — n8n, Make, Zapier<br>
    <b>2. RAG Systems</b> — intelligent doc retrieval<br>
    <b>3. Voice AI Agents</b> — 24/7 client comms<br>
    <b>4. AI Chatbots & Agents</b> — FB bots, ops agents<br>
    <b>5. Data Scraping & Leads</b> — Apify pipelines<br>
    <b>6. Custom Web Apps</b> — Claude AI + VS Code<br><br>
    Which one are you interested in? 👇`,

  availability: `Yes, I'm currently <b>available for new projects!</b> 🟢<br><br>
    I usually start within a few days of agreement. Want to kick things off? Just send me a message at <b>rasantos1013@gmail.com</b> or use the contact form below.`,

  tools: `My core stack:<br><br>
    ⚡ <b>Automation:</b> n8n, Make, Zapier<br>
    🤖 <b>AI:</b> Claude AI, GPT-4, Voice AI, RAG<br>
    🕷️ <b>Scraping:</b> Apify<br>
    🗄️ <b>CRM & Comms:</b> Slack, SMS, Email<br>
    💻 <b>Dev:</b> Claude AI + VS Code, Web Apps<br>
    📊 <b>Business:</b> POS, KDS, Dashboards`,

  start: `Easy! Here's how we start:<br><br>
    <b>1.</b> Send me a message with your project idea<br>
    <b>2.</b> I'll reply within 24 hours with a clear plan<br>
    <b>3.</b> We agree on scope, timeline & price<br>
    <b>4.</b> I build, you review, we launch ✅<br><br>
    Email: <b>rasantos1013@gmail.com</b><br>
    Website: <b>redelworkz.pro</b>`,

  pricing: `Pricing depends on the project scope, but generally:<br><br>
    💡 <b>Simple automations</b> — starts at $150<br>
    ⚡ <b>RAG / AI systems</b> — from $300<br>
    🤖 <b>Voice AI agents</b> — from $400<br>
    💻 <b>Custom web apps</b> — from $500<br><br>
    DM me for a free estimate — no commitment needed!`,

  hello: `Hey there! 👋 Great to meet you.<br><br>
    I'm <b>Redel Santos</b>, an AI Automation Specialist from Dasma, Cavite.<br><br>
    I build n8n workflows, RAG systems, Voice AI agents, and more. What brings you here today?`,

  default: `Thanks for your message! 😊<br><br>
    For a detailed discussion, reach me at:<br>
    📧 <b>rasantos1013@gmail.com</b><br>
    🌐 <b>redelworkz.pro</b><br><br>
    Or just fill out the contact form on this page — I'll get back to you within 24 hours!`
};

function detectIntent(msg) {
  const m = msg.toLowerCase();
  if (/\b(hi|hello|hey|kumusta|sup|good)\b/.test(m)) return 'hello';
  if (/service|offer|do you|what can|help/.test(m)) return 'services';
  if (/availab|free|open|start|begin|project/.test(m)) return 'availability';
  if (/tool|stack|technolog|use|platform|n8n|make|zapier/.test(m)) return 'tools';
  if (/how|process|work|start|begin|step/.test(m)) return 'start';
  if (/price|cost|rate|how much|fee|charge|pay/.test(m)) return 'pricing';
  return 'default';
}

const chatWindow  = document.getElementById('chatbot-window');
const chatToggle  = document.getElementById('chatbot-toggle');
const chatClose   = document.getElementById('chat-close');
const chatInput   = document.getElementById('chat-input');
const chatSend    = document.getElementById('chat-send');
const chatMsgs    = document.getElementById('chat-messages');
const chatNotif   = document.getElementById('chat-notif');
const quickBtns   = document.querySelectorAll('.quick-btn');

chatToggle.addEventListener('click', () => {
  chatWindow.classList.toggle('open');
  chatNotif.style.display = 'none';
});
chatClose.addEventListener('click', () => chatWindow.classList.remove('open'));

function appendMsg(html, type) {
  const div = document.createElement('div');
  div.className = `chat-msg ${type}`;
  if (type === 'bot') {
    div.innerHTML = `<img src="profile.png" class="msg-avatar" alt="Redel"/><div class="msg-bubble">${html}</div>`;
  } else {
    div.innerHTML = `<div class="msg-bubble">${html}</div>`;
  }
  chatMsgs.appendChild(div);
  chatMsgs.scrollTop = chatMsgs.scrollHeight;
  return div;
}

function showTyping() {
  const div = document.createElement('div');
  div.className = 'chat-msg bot typing-indicator';
  div.innerHTML = `<img src="profile.png" class="msg-avatar" alt="Redel"/><div class="msg-bubble"><div class="chat-typing"><span></span><span></span><span></span></div></div>`;
  chatMsgs.appendChild(div);
  chatMsgs.scrollTop = chatMsgs.scrollHeight;
  return div;
}

function botReply(key) {
  const typing = showTyping();
  setTimeout(() => {
    typing.remove();
    appendMsg(RESPONSES[key] || RESPONSES.default, 'bot');
  }, 900 + Math.random() * 400);
}

function sendMessage(text) {
  if (!text.trim()) return;
  appendMsg(text, 'user');
  chatInput.value = '';
  const intent = detectIntent(text);
  botReply(intent);
  document.getElementById('chat-quick-replies').style.display = 'none';
}

chatSend.addEventListener('click', () => sendMessage(chatInput.value));
chatInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(chatInput.value); });

quickBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    sendMessage(btn.textContent);
  });
});

/* ===== BOOKING CALENDAR ===== */
(function () {
  const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const SLOTS  = ['9:00 AM','10:00 AM','11:00 AM','1:00 PM','2:00 PM','3:00 PM','4:00 PM'];

  let cur = new Date();
  cur.setDate(1);
  let selectedDate = null;
  let selectedSlot = null;

  const grid      = document.getElementById('calGrid');
  const title     = document.getElementById('calMonthYear');
  const slotsBox  = document.getElementById('calSlots');
  const slotsGrid = document.getElementById('calSlotsGrid');
  const selDate   = document.getElementById('calSelectedDate');
  const submitBtn = document.getElementById('bookingSubmit');
  const selDisplay = document.getElementById('bookingSelection');

  function isAvailable(d) {
    const today = new Date(); today.setHours(0,0,0,0);
    const day = d.getDay();
    return d >= today && day !== 0 && day !== 6;
  }

  function renderCalendar() {
    const y = cur.getFullYear(), m = cur.getMonth();
    title.textContent = `${MONTHS[m]} ${y}`;
    grid.innerHTML = '';

    const first = new Date(y, m, 1).getDay();
    const total = new Date(y, m + 1, 0).getDate();
    const prevTotal = new Date(y, m, 0).getDate();
    const today = new Date(); today.setHours(0,0,0,0);

    for (let i = 0; i < first; i++) {
      const d = document.createElement('div');
      d.className = 'cal-day other-month';
      d.textContent = prevTotal - first + 1 + i;
      grid.appendChild(d);
    }
    for (let i = 1; i <= total; i++) {
      const date = new Date(y, m, i);
      const d = document.createElement('div');
      d.textContent = i;
      const cls = ['cal-day'];
      if (date.toDateString() === today.toDateString()) cls.push('today');
      if (selectedDate && date.toDateString() === selectedDate.toDateString()) cls.push('selected');
      if (isAvailable(date)) {
        cls.push('available');
        d.addEventListener('click', () => selectDate(date));
      }
      d.className = cls.join(' ');
      grid.appendChild(d);
    }
    const remaining = 42 - first - total;
    for (let i = 1; i <= remaining; i++) {
      const d = document.createElement('div');
      d.className = 'cal-day other-month';
      d.textContent = i;
      grid.appendChild(d);
    }
  }

  function selectDate(date) {
    selectedDate = date;
    selectedSlot = null;
    renderCalendar();
    renderSlots();
    updateSubmit();
  }

  function renderSlots() {
    slotsBox.classList.add('visible');
    selDate.textContent = selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    slotsGrid.innerHTML = '';
    SLOTS.forEach(s => {
      const btn = document.createElement('button');
      btn.className = 'cal-slot' + (selectedSlot === s ? ' selected' : '');
      btn.type = 'button';
      btn.textContent = s;
      btn.addEventListener('click', () => { selectedSlot = s; renderSlots(); updateSubmit(); });
      slotsGrid.appendChild(btn);
    });
  }

  function updateSubmit() {
    if (selectedDate && selectedSlot) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<svg viewBox="0 0 20 20" fill="none"><rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M3 8h14M7 2v3M13 2v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg> Confirm Booking`;
      selDisplay.innerHTML = `
        <div class="booking-selected-display">
          <div class="bsd-date">${selectedDate.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric'})}</div>
          <div class="bsd-time">⏰ ${selectedSlot}</div>
          <div class="bsd-tz">Philippine Time (PHT, UTC+8)</div>
        </div>`;
    } else {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<svg viewBox="0 0 20 20" fill="none"><rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M3 8h14M7 2v3M13 2v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg> Choose a date first`;
    }
  }

  document.getElementById('calPrev').addEventListener('click', () => {
    cur.setMonth(cur.getMonth() - 1);
    renderCalendar();
  });
  document.getElementById('calNext').addEventListener('click', () => {
    cur.setMonth(cur.getMonth() + 1);
    renderCalendar();
  });

  document.getElementById('bookingForm').addEventListener('submit', e => {
    e.preventDefault();
    const payload = {
      name:  document.getElementById('bfName').value,
      email: document.getElementById('bfEmail').value,
      message: document.getElementById('bfMsg').value,
      date:  selectedDate.toDateString(),
      time:  selectedSlot,
    };
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    fetch('https://n8n.srv868353.hstgr.cloud/webhook/dfe333a9-80af-49a5-b329-3b3cadf54dee', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(() => {
        submitBtn.textContent = 'Booking Confirmed ✓';
        submitBtn.style.background = 'linear-gradient(135deg,#059669,#10b981)';
        e.target.reset();
        selectedDate = null;
        selectedSlot = null;
        slotsBox.classList.remove('visible');
        selDisplay.innerHTML = `<div class="bs-placeholder"><svg viewBox="0 0 48 48" fill="none"><rect x="6" y="8" width="36" height="34" rx="4" stroke="currentColor" stroke-width="1.5"/><path d="M6 18h36M16 6v6M32 6v6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="16" cy="28" r="2" fill="currentColor" opacity=".3"/><circle cx="24" cy="28" r="2" fill="currentColor" opacity=".3"/><circle cx="32" cy="28" r="2" fill="currentColor" opacity=".3"/></svg><p>Select a date and time<br/>on the calendar</p></div>`;
        renderCalendar();
        setTimeout(() => {
          submitBtn.style.background = '';
          submitBtn.disabled = true;
          submitBtn.innerHTML = `<svg viewBox="0 0 20 20" fill="none"><rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M3 8h14M7 2v3M13 2v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg> Choose a date first`;
        }, 4000);
      })
      .catch(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Failed — try again';
        submitBtn.style.background = 'linear-gradient(135deg,#dc2626,#ef4444)';
        setTimeout(() => {
          submitBtn.style.background = '';
          submitBtn.innerHTML = `<svg viewBox="0 0 20 20" fill="none"><rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M3 8h14M7 2v3M13 2v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg> Confirm Booking`;
        }, 3000);
      });
  });

  renderCalendar();
})();

/* ===== NUMBER COUNTER ANIMATION ===== */
function animateCount(el, target, duration = 1500) {
  let start = 0;
  const step = timestamp => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    el.textContent = Math.floor(progress * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}
