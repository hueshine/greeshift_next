import { useState, useRef } from "react";
import Head from "next/head";
import Banner from "../../layout/Banner/Banner";

import style from "./style.module.scss";
import { Container } from "@mui/material";

import Button from "@/components/Button/Button";

import gsap from "gsap";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";

const Quiz = ({ apiData }) => {
  let imageUrl = "https://www.app.greenshift.creasion.org/storage";
  gsap.registerPlugin(ScrollToPlugin);

  const elTop = useRef(null);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const [answerChecked, setAnswerChecked] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [quizResult, setQuizResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const questions = apiData;

  const { question, image, answers, correctAnswer, review } =
    questions[currentQuestionIndex];

  const onAnswerSelected = (answer, idx) => {
    if (selectedAnswerIndex === null) {
      setAnswerChecked(true);
      setSelectedAnswerIndex(idx);
      setSelectedAnswer(answer);
    }
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === correctAnswer) {
      setQuizResult((prev) => ({
        ...prev,
        score: prev.score + 5,
        correctAnswers: prev.correctAnswers + 1,
      }));
    } else {
      setQuizResult((prev) => ({
        ...prev,
        wrongAnswers: prev.wrongAnswers + 1,
      }));
    }
    if (currentQuestionIndex !== questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
    setSelectedAnswer("");
    setSelectedAnswerIndex(null);
    setAnswerChecked(false);

    const ctx = gsap.context(() => {
      gsap.to(window, { duration: 0.5, scrollTo: elTop.current });
    });

    return () => ctx.revert();
  };

  const QuizProgress = () => {
    const calculateWidth = () => {
      if (questions.length === 0) return "0%";
      const percentage = ((currentQuestionIndex + 1) / questions.length) * 100;
      return `${percentage}%`;
    };
    return (
      <div className={style.qsns_line}>
        <span style={{ width: calculateWidth() }}></span>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Quiz | GREENSHIFT NEPAL</title>
        <meta name="description" content="/chitwna.jpeg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:image"
          content="./1a3b9e8c-88a0-449a-8c74-0f58aef99fe6.png"
        />
        <meta property="og:image:width" content="640" />
        <meta property="og:image:height" content="442" />
      </Head>

      <Banner title={"How Green Are You?"} />

      <div className={style.wrapper} ref={elTop}>
        <div className={style.quiz_title}>
          <Container maxWidth={"md"}>
            <p>
              How much do you know about the threats that our planet faces from
              plastic pollution?
            </p>
          </Container>
        </div>

        <Container maxWidth="md">
          <QuizProgress />

          {!showResults ? (
            <>
              <div className={style.question}>
                <h4>{question}</h4>

                <img src={`${imageUrl}/${image}`} alt="" />
              </div>

              <div className={style.options_wrap}>
                {answers.map((answer, idx) => {
                  return (
                    <div
                      className={`${style.option} ${
                        selectedAnswerIndex === idx
                          ? answer === correctAnswer
                            ? style.correct
                            : style.incorrect
                          : selectedAnswer && answer === correctAnswer
                          ? style.correct
                          : ""
                      }`}
                      key={idx}
                      onClick={() => onAnswerSelected(answer, idx)}
                    >
                      <span></span>
                      <p>{answer}</p>
                    </div>
                  );
                })}
              </div>

              {answerChecked ? (
                <>
                  <div className={style.answer_review}>
                    {selectedAnswer == correctAnswer ? (
                      <h5 style={{ color: "#45B855" }}>Correct</h5>
                    ) : (
                      <h5 style={{ color: "#D04242" }}>Incorrect</h5>
                    )}

                    <div
                      className={style.text}
                      dangerouslySetInnerHTML={{
                        __html: review,
                      }}
                    />
                  </div>

                  <div className={style.next_step}>
                    <button
                      onClick={handleNextQuestion}
                      disabled={!answerChecked}
                    >
                      Continue
                    </button>
                  </div>
                </>
              ) : (
                ""
              )}
            </>
          ) : (
            <div className={style.result}>
              <div className={style.result_box}>
                <div className={style.box}>
                  <svg x="0px" y="0px" viewBox="0 0 150 150">
                    <circle cx="77" cy="73.4" r="59.9" />
                    <text
                      transform="matrix(1 0 0 1 52.623 88.7207)"
                      class="st1 st2"
                    >
                      {questions.length < 10
                        ? "0" + questions.length
                        : questions.length}
                    </text>
                  </svg>

                  <p>Total Questions</p>
                </div>

                <div className={style.box}>
                  <svg
                    x="0px"
                    y="0px"
                    viewBox="0 0 150 150"
                    className={style.correct}
                  >
                    <circle cx="75" cy="73.6" r="61.9" />
                    <text transform="matrix(1 0 0 1 52.623 88.7207)">
                      {quizResult.correctAnswers < 10
                        ? "0" + quizResult.correctAnswers
                        : quizResult.correctAnswers}
                    </text>
                  </svg>

                  <p>Correct Answers</p>
                </div>

                <div className={style.box}>
                  <svg
                    x="0px"
                    y="0px"
                    viewBox="0 0 150 150"
                    className={style.incorrect}
                  >
                    <circle cx="75" cy="73.6" r="61.9" />
                    <text transform="matrix(1 0 0 1 52.623 88.7207)">
                      {quizResult.wrongAnswers < 10
                        ? "0" + quizResult.wrongAnswers
                        : quizResult.wrongAnswers}
                    </text>
                  </svg>

                  <p>Incorrect Answers</p>
                </div>
              </div>

              <div className={style.result_text}>
                <h3>
                  Did you get a chance to reflect on the current state of
                  plastic pollution around the world?{" "}
                </h3>
                <p>
                  The situation is dire, but it has the potential to become even
                  worse. Now is the time to act. Let's each do our part to
                  create a cleaner, healthier planet.{" "}
                </p>
                <p>
                  Take the pledge today and turn your commitment into meaningful
                  action!
                </p>

                <Button
                  text="Take the Pledge"
                  link={"/join-the-green-movement/pledge"}
                />
              </div>
            </div>
          )}
        </Container>
      </div>
    </>
  );
};

export const getStaticProps = async ({}) => {
  // Fetch additional data from the API
  const response = await fetch("https://app.greenshift.creasion.org/api/quiz");
  const apiData = await response.json();

  return {
    props: {
      apiData,
    },
    revalidate: 30,
  };
};

export default Quiz;
