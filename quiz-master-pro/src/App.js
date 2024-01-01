import { useEffect, useState } from 'react';
import './App.css';
import * as React from 'react';
import Button from '@mui/material/Button';

function App() {
  const [questions, setQuestions] = useState([])
  const [category, setCategory] = useState(23);
  const [difficulty, setDifficulty] = useState('easy');
  const [amount, setAmount] = useState(10);
  const [starterDiv, setStarterDiv] = useState(true)
  const [quizDiv, setQuizDiv] = useState(false)
  const [resultDiv, setResultDiv] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [btnStyle, setbtnStyle] = useState('outlined')


  const apiUrl = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;

  useEffect(() => {
    fetchQuestions();
  }, [category, difficulty,]);

  function fetchQuestions() {
    fetch(apiUrl)
      .then(res => res.json())
      .then(res => {
        console.log('API response:', res);

        if (res.results && Array.isArray(res.results)) {
          const modifiedResults = res.results.map(function (item) {
            const newItem = { ...item };
            newItem.options = [newItem.correct_answer, ...newItem.incorrect_answers];
            newItem.options = shuffle(newItem.options);
            return newItem;
          });

          setQuestions(modifiedResults);
        } else {
          console.error('Error fetching questions: Results not found or not an array');
        }
      })
      .catch(error => console.error('Error fetching questions:', error));
  }

  function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]
      ];
    }

    return array;
  }

  function StartQuiz() {
    setStarterDiv(false)
    setQuizDiv(true)
    console.log(questions);
  }

  function Next() {
    setCurrentIndex(currentIndex + 1)
    if (currentIndex === questions.length - 1) {
      setQuizDiv(false)
      setResultDiv(true)
    }
  }
  function select(index, e) {
    const value = e.target.value
    setbtnStyle('contained')
    console.log(value);
  }

  function Restart() {
    setResultDiv(false)
    setStarterDiv(true)
  }
  if (!questions.length) {
    return <div>
      <h1>Loading...</h1>
    </div>
  }
  const currentQuestion = questions[currentIndex]
  return (
    <div className="App">
      {starterDiv
        ?
        <div className='StarterPage'>
          <form action="" method="post" className="form-api">
            <h1> Start The Quiz </h1>

            <label htmlFor="trivia_amount">Number of Questions:</label>
            <input type="number" placeholder='Enter Question Amount By Default will be 10' name="trivia_amount" onChange={(e) => setAmount(e.target.value)} id="trivia_amount" className="form-control" min="1" max="50" />

            <br />

            <label htmlFor="trivia_category">Select Category: </label>
            <select name="trivia_category" className="form-control" onChange={(e) => setCategory(e.target.value)}>
              <option value="any">Any Category</option>
              <option value="9">General Knowledge</option><option value="10">Entertainment: Books</option>
              <option value="11">Entertainment: Film</option><option value="12">Entertainment: Music</option>
              <option value="13">Entertainment: Musicals &amp; Theatres</option>
              <option value="14">Entertainment: Television</option>
              <option value="15">Entertainment: Video Games</option>
              <option value="16">Entertainment: Board Games</option>
              <option value="17">Science &amp; Nature</option>
              <option value="18">Science: Computers</option>
              <option value="19">Science: Mathematics</option>
              <option value="20">Mythology</option>
              <option value="21">Sports</option>
              <option value="22">Geography</option>
              <option value="23">History</option>
              <option value="24">Politics</option>
              <option value="25">Art</option>
              <option value="26">Celebrities</option>
              <option value="27">Animals</option>
              <option value="28">Vehicles</option>
              <option value="29">Entertainment: Comics</option>
              <option value="30">Science: Gadgets</option>
              <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
              <option value="32">Entertainment: Cartoon &amp; Animations</option>		</select>

            <br />

            <label htmlFor="trivia_difficulty">Select Difficulty: </label>
            <select name="trivia_difficulty" className="form-control" onChange={(e) => setDifficulty(e.target.value)}>
              <option value="any">Any Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <br />



            <Button variant="contained" onClick={StartQuiz}>Start Quiz</Button>
          </form>

        </div>
        :
        <span></span>}

      {quizDiv
        ?
        <div className='QuizDiv'>
          <h2>{currentIndex + 1 + '-'} {currentQuestion.question}</h2>
          {currentQuestion.options.map(function (item, index) {
            return <div >
              <Button variant={btnStyle} name='options' onClick={(e) => select(index, e)} value={item}>{item}</Button>
            </div>
          })}
        </div>
        :
        <span></span>}

      {resultDiv
        ?
        <div className='ResultDiv'>
          {/* Render result page here */}
        </div>
        :
        <span></span>}

      <div className='QuizDiv'></div>
      <div className='ResultDiv'></div>
    </div>
  );
}

export default App;
