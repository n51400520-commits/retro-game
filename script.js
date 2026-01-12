const quizData = [
  { q: "Бірінші PlayStation қай жылы шықты?", a: ["1994", "1998"], correct: 0 },
  { q: "Super Mario Bros қай платформада шықты?", a: ["NES", "PS1"], correct: 0 },
  { q: "Pac-Man ойынының басты кейіпкері кім?", a: ["Pac-Man", "Mario"], correct: 0 }
];

let current = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const modal = document.getElementById("resultModal");
const resultTitle = document.getElementById("resultTitle");
const closeModal = document.getElementById("closeModal");

function loadQuestion() {
  const q = quizData[current];
  questionEl.textContent = q.q;
  answersEl.innerHTML = "";
  q.a.forEach((ans, i) => {
    const btn = document.createElement("button");
    btn.textContent = ans;
    btn.addEventListener("click", () => checkAnswer(i));
    answersEl.appendChild(btn);
  });
}

function checkAnswer(i) {
  const q = quizData[current];
  if (i === q.correct) {
    // Дұрыс жауап → конфетти
    confetti();
    changeTheme();
    resultTitle.textContent = "✅ Дұрыс!";
    modal.showModal();
  } else {
    // Қате жауап → shake
    answersEl.classList.add("shake");
    setTimeout(() => answersEl.classList.remove("shake"), 500);
    resultTitle.textContent = "❌ Қате!";
    modal.showModal();
  }
  current = (current + 1) % quizData.length;
}

function changeTheme() {
  // Түстерді ауыстыру
  const root = document.documentElement;
  const colors = [
    { bg: "#000", text: "#0f0", btnBg: "#111", btnText: "#fff" },
    { bg: "#111", text: "#ff0", btnBg: "#333", btnText: "#0ff" },
    { bg: "#222", text: "#f0f", btnBg: "#444", btnText: "#fff" }
  ];
  const theme = colors[Math.floor(Math.random() * colors.length)];
  root.style.setProperty("--bg-color", theme.bg);
  root.style.setProperty("--text-color", theme.text);
  root.style.setProperty("--button-bg", theme.btnBg);
  root.style.setProperty("--button-text", theme.btnText);
}

closeModal.addEventListener("click", () => modal.close());

loadQuestion();
