const questions = [
    {
        question: "1. Which language is used to structure web pages?",
        options: ["Python", "HTML", "Java", "C++"],
        answer: 1
    },
    {
        question: "2. Which language is used to style web pages?",
        options: ["CSS", "SQL", "C", "PHP"],
        answer: 0
    },
    {
        question: "3. Which language adds interactivity to a web page?",
        options: ["HTML", "CSS", "JavaScript", "XML"],
        answer: 2
    },
    {
        question: "4. What does DBMS stand for?",
        options: [
            "Data Backup Management System",
            "Database Management System",
            "Digital Base Management Software",
            "Data Binary Management System"
        ],
        answer: 1
    },
    {
        question: "5. Which SQL command retrieves data?",
        options: ["INSERT", "DELETE", "UPDATE", "SELECT"],
        answer: 3
    }
];

let currentQuestion = 0;
let answers = [];
let student = "";
let timeLeft = 60;
let timerInterval;
let finished = false;


// Start Quiz
function startQuiz() {

    const name = document.getElementById("studentName")
        .value.trim();

    if (name === "") {

        document.getElementById("message").textContent =
            "Please enter your name.";

        return;
    }

    student = name;

    currentQuestion = 0;

    answers = new Array(questions.length).fill(null);

    timeLeft = 60;

    finished = false;

    document.getElementById("loginPage")
        .classList.add("hidden");

    document.getElementById("resultPage")
        .classList.add("hidden");

    document.getElementById("quizPage")
        .classList.remove("hidden");

    document.getElementById("timer").textContent = timeLeft;

    showQuestion();

    clearInterval(timerInterval);

    timerInterval = setInterval(function () {

        timeLeft--;

        document.getElementById("timer").textContent = timeLeft;

        if (timeLeft <= 0) {
            submitQuiz();
        }

    }, 1000);
}


// Display Question
function showQuestion() {

    const q = questions[currentQuestion];

    document.getElementById("questionNumber").textContent =
        "Question " + (currentQuestion + 1) +
        " of " + questions.length;

    document.getElementById("question").textContent =
        q.question;

    document.getElementById("answerMessage").textContent = "";

    const optionsDiv = document.getElementById("options");

    optionsDiv.innerHTML = "";

    q.options.forEach(function (option, index) {

        const label = document.createElement("label");

        label.className = "option";

        const radio = document.createElement("input");

        radio.type = "radio";

        radio.name = "answer";

        radio.value = index;

        radio.checked = answers[currentQuestion] === index;

        radio.addEventListener("change", function () {

            answers[currentQuestion] = index;

        });

        label.appendChild(radio);

        label.appendChild(document.createTextNode(option));

        optionsDiv.appendChild(label);

    });

    document.getElementById("previousBtn").disabled =
        currentQuestion === 0;

    document.getElementById("nextBtn").disabled =
        currentQuestion === questions.length - 1;
}


// Next Question
function nextQuestion() {

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        showQuestion();

    }
}


// Previous Question
function previousQuestion() {

    if (currentQuestion > 0) {

        currentQuestion--;

        showQuestion();

    }
}


// Submit Quiz
function submitQuiz() {

    if (finished) return;

    finished = true;

    clearInterval(timerInterval);

    let score = 0;

    questions.forEach(function (q, index) {

        if (answers[index] === q.answer) {

            score++;

        }

    });

    const percent = Math.round(
        (score / questions.length) * 100
    );

    document.getElementById("quizPage")
        .classList.add("hidden");

    document.getElementById("resultPage")
        .classList.remove("hidden");

    document.getElementById("welcome").textContent =
        "Student: " + student;

    document.getElementById("score").textContent =
        "Score: " + score + " / " + questions.length;

    document.getElementById("percentage").textContent =
        "Percentage: " + percent + "%";

    document.getElementById("remark").textContent =
        percent >= 60
            ? "Congratulations! You passed."
            : "Keep practicing and try again.";

}


// Restart Quiz
function restartQuiz() {

    clearInterval(timerInterval);

    document.getElementById("resultPage")
        .classList.add("hidden");

    document.getElementById("loginPage")
        .classList.remove("hidden");

    document.getElementById("studentName").value = "";

    document.getElementById("message").textContent = "";

}
