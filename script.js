/* ─────────────────────────────────────────────
   FLOWISE VECTOR STORE (CLEAN VERSION)
───────────────────────────────────────────── */

async function upsertVectorStore(data) {
  try {
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
    console.log("Vector Store Response:", result);
    return result;

  } catch (error) {
    console.error("Flowise error:", error);
  }
}

/* ─────────────────────────────────────────────
   MANUAL UPLOAD FUNCTION (CALL WHEN NEEDED)
───────────────────────────────────────────── */

function uploadToVectorStore(textContent) {
  const payload = {
    overrideConfig: {
      topK: 3,
      limit: 10,

      // IMPORTANT FIX for your earlier error
      taskType: "RETRIEVAL_DOCUMENT"
    },

    // depends on Flowise setup
    text: textContent
  };

  upsertVectorStore(payload);
}

/* ─────────────────────────────────────────────
   THEME & NAV
───────────────────────────────────────────── */

let isDark = true;

function toggleTheme() {
  isDark = !isDark;

  document.documentElement.setAttribute(
    "data-theme",
    isDark ? "dark" : "light"
  );

  document.querySelector(".theme-toggle").textContent =
    isDark ? "☀️" : "🌙";

  if (radarChartInstance) {
    radarChartInstance.options.scales.r.pointLabels.color =
      isDark ? "#8899aa" : "#64748b";

    radarChartInstance.options.scales.r.grid.color =
      isDark ? "rgba(99,179,237,0.15)" : "rgba(59,130,246,0.15)";

    radarChartInstance.update();
  }
}

function toggleMenu() {
  document.getElementById("mobileMenu").classList.toggle("open");
}

function submitForm() {
  const btn = document.querySelector(".form-submit");
  btn.textContent = "✅ Message Sent!";
  btn.style.background = "var(--accent2)";

  setTimeout(() => {
    btn.innerHTML = "✈️ Send Message";
    btn.style.background = "";
  }, 3000);
}

/* ─────────────────────────────────────────────
   DOWNLOAD FLOW FILE
───────────────────────────────────────────── */

function downloadJSON(e) {
  e.preventDefault();

  const flow = {
    nodes: [
      { id: "llm1", type: "ChatOpenAI", label: "GPT-4 LLM", position: { x: 300, y: 200 } },
      { id: "prompt1", type: "PromptTemplate", label: "System Prompt", position: { x: 100, y: 200 } },
      { id: "chain1", type: "ConversationalRetrievalQAChain", label: "QA Chain", position: { x: 500, y: 200 } },
      { id: "vs1", type: "Pinecone", label: "Vector Store", position: { x: 300, y: 400 } }
    ],
    edges: [
      { source: "prompt1", target: "chain1" },
      { source: "llm1", target: "chain1" },
      { source: "vs1", target: "chain1" }
    ],
    metadata: {
      name: "Data Analysis Assistant",
      description: "RAG-powered chatbot",
      version: "1.0.0",
      author: "Kent Clarence Mina"
    }
  };

  const a = document.createElement("a");
  a.href = URL.createObjectURL(
    new Blob([JSON.stringify(flow, null, 2)], {
      type: "application/json"
    })
  );

  a.download = "kent-flowise-flow.json";
  a.click();
}

/* ─────────────────────────────────────────────
   HOW TO USE VECTOR UPLOAD
─────────────────────────────────────────────
Example:

uploadToVectorStore("This is my document about data analysis");
-------------------------------------------------------------- */
