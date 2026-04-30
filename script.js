async function query(data) {
    const response = await fetch(
        "https://cloud.flowiseai.com/api/v1/vector/upsert/8de78eb0-6750-4460-b0c6-109aeeb49dd3",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );
    const result = await response.json();
    return result;
}

query({
  "overrideConfig": {
      "topK": 1,
      "url": "example",
      "relativeLinksMethod": "example",
      "limit": 1,
  }
}).then((response) => {
    console.log(response);
});

/* ─────────────────────────────────────────────────
     THEME & NAV
  ───────────────────────────────────────────────── */
  let isDark = true;
  function toggleTheme() {
    isDark = !isDark;
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    document.querySelector('.theme-toggle').textContent = isDark ? '☀️' : '🌙';
    if (radarChartInstance) {
      radarChartInstance.options.scales.r.pointLabels.color = isDark ? '#8899aa' : '#64748b';
      radarChartInstance.options.scales.r.grid.color = isDark ? 'rgba(99,179,237,0.15)' : 'rgba(59,130,246,0.15)';
      radarChartInstance.update();
    }
  }
  function toggleMenu() { document.getElementById('mobileMenu').classList.toggle('open'); }
  function submitForm() {
    const btn = document.querySelector('.form-submit');
    btn.textContent = '✅ Message Sent!';
    btn.style.background = 'var(--accent2)';
    setTimeout(() => { btn.innerHTML = '✈️ Send Message'; btn.style.background = ''; }, 3000);
  }
  function downloadJSON(e) {
    e.preventDefault();
    const flow = {
      nodes:[
        {id:"llm1",type:"ChatOpenAI",label:"GPT-4 LLM",position:{x:300,y:200}},
        {id:"prompt1",type:"PromptTemplate",label:"System Prompt",position:{x:100,y:200}},
        {id:"chain1",type:"ConversationalRetrievalQAChain",label:"QA Chain",position:{x:500,y:200}},
        {id:"vs1",type:"Pinecone",label:"Vector Store",position:{x:300,y:400}}
      ],
      edges:[{source:"prompt1",target:"chain1"},{source:"llm1",target:"chain1"},{source:"vs1",target:"chain1"}],
      metadata:{name:"Data Analysis Assistant",description:"RAG-powered chatbot",version:"1.0.0",author:"Kent Clarence Mina"}
    };
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([JSON.stringify(flow,null,2)],{type:'application/json'}));
    a.download = 'kent-flowise-flow.json';
    a.click();
  }

  /* ─────────────────────────────────────────────────
     SCROLL REVEAL & SKILL BARS
  ───────────────────────────────────────────────── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        if (e.target.classList.contains('skill-card')) animateBars(e.target);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  function animateBars(card) {
    card.querySelectorAll('.skill-fill').forEach(fill => {
      setTimeout(() => fill.style.width = fill.dataset.width + '%', 200);
    });
  }

  /* ─────────────────────────────────────────────────
     CHARTS
  ───────────────────────────────────────────────── */
  let radarChartInstance;
  window.addEventListener('load', () => {
    const c = { border:'rgba(99,179,237,0.15)', muted:'#8899aa' };
    const rc = document.getElementById('radarChart');
    if (rc) {
      radarChartInstance = new Chart(rc, {
        type:'radar',
        data:{ labels:['Excel','SQL','Python','Power BI','Tableau'], datasets:[{data:[90,85,80,82,75],backgroundColor:'rgba(99,179,237,0.15)',borderColor:'#63b3ed',pointBackgroundColor:'#63b3ed',pointRadius:4,borderWidth:2}] },
        options:{ responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{ r:{ min:0,max:100,ticks:{display:false},grid:{color:c.border},pointLabels:{color:c.muted,font:{size:11,family:'JetBrains Mono'}},angleLines:{color:c.border} } } }
      });
    }
    const p1 = document.getElementById('proj1Chart');
    if (p1) new Chart(p1,{type:'line',data:{labels:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug'],datasets:[{label:'Revenue',data:[42,55,48,67,72,88,95,110],borderColor:'#63b3ed',backgroundColor:'rgba(99,179,237,0.1)',tension:0.4,fill:true,pointRadius:3},{label:'Orders',data:[30,38,35,50,58,70,76,90],borderColor:'#4fd1c5',backgroundColor:'rgba(79,209,197,0.08)',tension:0.4,fill:true,pointRadius:3}]},options:{responsive:true,maintainAspectRatio:true,plugins:{legend:{labels:{color:'#8899aa',font:{size:10}}}},scales:{x:{ticks:{color:'#8899aa',font:{size:9}},grid:{color:'rgba(99,179,237,0.08)'}},y:{ticks:{color:'#8899aa',font:{size:9}},grid:{color:'rgba(99,179,237,0.08)'}}}}});
    const p2 = document.getElementById('proj2Chart');
    if (p2) new Chart(p2,{type:'doughnut',data:{labels:['Retained','Resigned','Transferred','Retired'],datasets:[{data:[62,18,12,8],backgroundColor:['#63b3ed','#fc5c65','#ffd32a','#4fd1c5'],borderWidth:0}]},options:{responsive:true,maintainAspectRatio:true,cutout:'65%',plugins:{legend:{position:'right',labels:{color:'#8899aa',font:{size:10},boxWidth:10}}}}});
    const p3 = document.getElementById('proj3Chart');
    if (p3) new Chart(p3,{type:'bar',data:{labels:['NCR','Region VII','Region III','Region IV-A','Region XI'],datasets:[{label:'Cases (000s)',data:[820,310,275,420,190],backgroundColor:['#63b3ed','#4fd1c5','#f6ad55','#fc5c65','#a78bfa'],borderRadius:6}]},options:{responsive:true,maintainAspectRatio:true,plugins:{legend:{display:false}},scales:{x:{ticks:{color:'#8899aa',font:{size:8}},grid:{display:false}},y:{ticks:{color:'#8899aa',font:{size:9}},grid:{color:'rgba(99,179,237,0.08)'}}}}});
    const p4 = document.getElementById('proj4Chart');
    if (p4) new Chart(p4,{type:'scatter',data:{datasets:[{label:'Pass',data:Array.from({length:20},()=>({x:Math.random()*100,y:Math.random()*40+60})),backgroundColor:'rgba(79,209,197,0.7)',pointRadius:5},{label:'Fail',data:Array.from({length:10},()=>({x:Math.random()*60,y:Math.random()*50})),backgroundColor:'rgba(252,92,101,0.7)',pointRadius:5}]},options:{responsive:true,maintainAspectRatio:true,plugins:{legend:{labels:{color:'#8899aa',font:{size:10}}}},scales:{x:{title:{display:true,text:'Study Hours',color:'#8899aa',font:{size:9}},ticks:{color:'#8899aa',font:{size:9}},grid:{color:'rgba(99,179,237,0.08)'}},y:{title:{display:true,text:'Score',color:'#8899aa',font:{size:9}},ticks:{color:'#8899aa',font:{size:9}},grid:{color:'rgba(99,179,237,0.08)'}}}}});
  });

  /* ─────────────────────────────────────────────────
     CHATBOT ENGINE
  ───────────────────────────────────────────────── */
  const SYSTEM_PROMPT = `You are a friendly and knowledgeable AI assistant on Kent Clarence Mina's personal data analyst portfolio website. Your job is to help visitors learn about Kent and his work.

Here is everything you know about Kent:

NAME: Kent Clarence Mina
ROLE: Aspiring Data Analyst
BACKGROUND: IT/Computer Science student with a passion for data analytics, data visualization, and problem-solving.
EMAIL: rheakentmina@gmail.com
GITHUB: github.com/Kunn0916
LINKEDIN: linkedin.com/in/kent-mina

SKILLS & TOOLS:
- Data Analysis: Data cleaning (92%), Exploratory Data Analysis (87%), Data Visualization (90%), Statistical Analysis (78%)
- Tools: Excel (90%), SQL (85%), Python (80%), Power BI (82%), Tableau (75%), Pandas, Matplotlib, Seaborn, Scikit-learn
- Soft Skills: Communication (88%), Critical Thinking (93%), Problem Solving, Teamwork, Data Storytelling, Time Management
- AI Tools: Flowise AI for building LLM-powered pipelines

PROJECTS:
1. Retail Sales EDA & Trend Analysis — Python, Pandas, Matplotlib. Analyzed 50,000+ retail transactions to identify seasonal trends and revenue drivers.
2. HR Analytics Dashboard (Power BI) — SQL, DAX, Power BI. Interactive dashboard tracking employee attrition and KPIs.
3. COVID-19 Data Analysis Philippines — SQL, Excel, Tableau. Geographic heatmap and time-series dashboard of regional case data.
4. Student Performance Predictor — Python, Scikit-learn, Seaborn. ML classification model predicting student pass/fail with 89% accuracy.

FLOWISE AI APP: Kent built a RAG-powered Data Analysis Q&A chatbot using Flowise, connected to a knowledge base of analytics documentation and Python/SQL tutorials.

AVAILABILITY: Kent is currently open to internship opportunities, entry-level data analyst roles, and freelance data projects.

PERSONALITY: Kent is curious, detail-oriented, creative, and passionate about turning raw data into meaningful insights.

INSTRUCTIONS:
- Be warm, helpful, and concise. Keep answers focused and conversational.
- If asked about hiring or collaboration, encourage the visitor to email Kent at rheakentmina@gmail.com.
- If asked something outside the scope of Kent's portfolio, politely redirect the conversation.
- Don't make up details not listed above.
- Format answers clearly; use short bullet points when listing things.
- Always be encouraging about Kent's skills and potential.`;

  let chatHistory = [];
  let chatOpen = false;

  /* Render a message bubble */
  function renderMessage(role, text, time) {
    const wrap = document.createElement('div');
    wrap.className = 'msg ' + (role === 'user' ? 'user' : 'bot');

    const ava = document.createElement('div');
    ava.className = 'msg-avatar';
    ava.textContent = role === 'user' ? '🧑' : '🤖';

    const col = document.createElement('div');
    col.className = 'msg-col';

    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble';
    bubble.textContent = text;

    const ts = document.createElement('div');
    ts.className = 'msg-time';
    ts.textContent = time || now();

    col.appendChild(bubble);
    col.appendChild(ts);
    wrap.appendChild(ava);
    wrap.appendChild(col);

    document.getElementById('chat-messages').appendChild(wrap);
    scrollBottom();
    return bubble;
  }

  /* Typing indicator */
  function showTyping() {
    const wrap = document.createElement('div');
    wrap.className = 'msg bot';
    wrap.id = 'typing-indicator';

    const ava = document.createElement('div');
    ava.className = 'msg-avatar';
    ava.textContent = '🤖';

    const col = document.createElement('div');
    col.className = 'msg-col';

    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble';
    bubble.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';

    col.appendChild(bubble);
    wrap.appendChild(ava);
    wrap.appendChild(col);
    document.getElementById('chat-messages').appendChild(wrap);
    scrollBottom();
  }

  function removeTyping() {
    const t = document.getElementById('typing-indicator');
    if (t) t.remove();
  }

  function scrollBottom() {
    const m = document.getElementById('chat-messages');
    m.scrollTop = m.scrollHeight;
  }

  function now() {
    return new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
  }

  /* Toggle chat window */
  function toggleChat() {
    chatOpen = !chatOpen;
    const win = document.getElementById('chat-window');
    const btn = document.getElementById('chat-trigger');
    const badge = document.getElementById('chat-badge');
    win.classList.toggle('open', chatOpen);
    btn.classList.toggle('open', chatOpen);
    if (chatOpen) {
      badge.style.display = 'none';
      document.getElementById('chat-input').focus();
    }
  }

  /* Send a suggestion chip */
  function sendSuggestion(el) {
    document.getElementById('chat-input').value = el.textContent;
    // Hide suggestions after first use
    document.getElementById('chat-suggestions').style.display = 'none';
    sendMessage();
  }

  /* Main send function */
  async function sendMessage() {
    const input = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send');
    const text = input.value.trim();
    if (!text) return;

    input.value = '';
    sendBtn.disabled = true;

    // Render user bubble
    renderMessage('user', text);

    // Push to history
    chatHistory.push({ role: 'user', content: text });

    // Show typing
    showTyping();

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: chatHistory
        })
      });

      const data = await response.json();
      removeTyping();

      if (data.content && data.content[0]) {
        const reply = data.content[0].text;
        renderMessage('bot', reply);
        chatHistory.push({ role: 'assistant', content: reply });
      } else {
        throw new Error('No content in response');
      }
    } catch (err) {
      removeTyping();
      renderMessage('bot', "Sorry, I'm having a bit of trouble right now. Please try again in a moment, or reach out to Kent directly at rheakentmina@gmail.com 💌");
    }

    sendBtn.disabled = false;
    input.focus();
  }

  /* Boot — show greeting */
  window.addEventListener('load', () => {
    setTimeout(() => {
      renderMessage('bot', "👋 Hi there! I'm Kent's AI assistant. I can tell you about his skills, projects, background, and whether he's available to hire. What would you like to know?");
    }, 800);
  });
