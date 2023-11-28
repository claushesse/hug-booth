import { useState, useEffect } from "react";
import "./App.css";
import { CardsContainer } from "./components/CardsContainer/CardsContainer";
import { Card } from "./components/Card/Card";
import { steps } from "./utils";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

function App() {
  const [lastCard, setLastCard] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const [countDirection, setCountDirection] = useState(1);
  const { width, height } = useWindowSize();

  document.addEventListener("keydown", (event) => {
    const keyNumber = Number(event.key);
    if (!isNaN(keyNumber) && keyNumber > 0 && keyNumber < 9) {
      setSelectedCard(keyNumber);
    } else if (!isNaN(keyNumber) && keyNumber === 0) {
      setSelectedCard(null);
    }
  });

  useEffect(() => {
    let interval = setInterval(() => {
      if (lastCard === 6) {
        setCountDirection(-1);
      } else if (lastCard === 0) {
        setCountDirection(1);
      }
      setLastCard((prevLastCard) => prevLastCard + countDirection);
    }, 600);
    if (selectedCard) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [lastCard, selectedCard, countDirection]);

  return (
    <div>
      {/* {selectedCard === 8 && (
        <Confetti
          width={width}
          height={height}
          colors={["#000000", "#FFFFFF"]}
        />
      )} */}
      <div className="title">HUG RATE</div>
      <CardsContainer>
        {steps.map((step) => {
          return (
            <Card
              key={step.name}
              name={step.name}
              color={step.color}
              opacity={step.id <= lastCard || !!selectedCard ? 1 : 0}
              selected={selectedCard - 1 === step.id}
              id={step.id}
            />
          );
        })}
      </CardsContainer>
    </div>
  );
}

export default App;
