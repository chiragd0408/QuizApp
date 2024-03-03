const quizData = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Madrid", "Rome"],
      answer: "Paris",
      points: 1
    },
    {
      question: "Which country won the 2018 FIFA World Cup?",
      options: ["France", "Brazil", "Germany", "Argentina"],
      answer: "France",
      points: 1
    },
    {
      question: "Who painted the Mona Lisa?",
      options: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Michelangelo"],
      answer: "Leonardo da Vinci",
      points: 1
    },
    {
      question: "You're 4th place right now in a race. What place will you be in when you pass the person in 3rd place?",
      options: ["1st", "2nd", "3rd", "None of the above"],
      answer: "2nd",
      points: 1
    },
    {
      question: "How many 0.5cm slices can you cut from a bread that is 25cm long?",
      options: ["50", "25", "39", "None of the above"],
      answer: "50",
      points: 1
    },
    {
      question: "The answer is really big.",
      options: ["THE ANSWER", "Really big", "An elephant", "The data given is insufficient."],
      answer: "Really big",
      points: 1
    }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const submitButton = document.getElementById("submit");
  const resultElement = document.getElementById("result");
  
  function loadQuestion() {
    const question = quizData[currentQuestion];
    questionElement.textContent = question.question;
  
    optionsElement.innerHTML = "";
    for (let i = 0; i < question.options.length; i++) {
      const option = document.createElement("button");
      option.textContent = question.options[i];
      option.addEventListener("click", selectOption);
      optionsElement.appendChild(option);
    }
  }
  
  function selectOption(event) {
    const selectedOption = event.target.textContent;
    const question = quizData[currentQuestion];
  
    if (selectedOption === question.answer) {
      score += question.points;
      event.target.style.backgroundColor = "#4caf50";
    } else {
      event.target.style.backgroundColor = "#ff0000";
      const correctOption = Array.from(optionsElement.children).find(
        (option) => option.textContent === question.answer
      );
      correctOption.style.backgroundColor = "#4caf50";
    }
  
    disableOptions();
    submitButton.disabled = true;
  
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      setTimeout(loadQuestion, 1000);
    } else {
      setTimeout(showResult, 1000);
    }
  }
  
  function disableOptions() {
    const options = Array.from(optionsElement.children);
    options.forEach((option) => {
      option.disabled = true;
    });
  }
  
  function showResult() {
    questionElement.style.display = "none";
    optionsElement.style.display = "none";
    submitButton.style.display = "none";
  
    resultElement.textContent = `You scored ${score} out of ${quizData.length}!`;
    const pointsThreshold = 3;
  
    if (score >= pointsThreshold) {
      resultElement.textContent += " Congratulations! You are a winner!";
      resultElement.style.color = "#4caf50";
    } else {
      resultElement.textContent += " Sorry! You didn't reach the required points. You lost!";
      resultElement.style.color = "#ff0000";
  }
  }
  loadQuestion();
  