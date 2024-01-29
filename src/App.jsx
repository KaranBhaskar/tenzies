import "./App.css";
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";

function Btn({ numberArray, setNumbers }) {
  const array = numberArray.map((array) => (
    <button
      key={array.id}
      onClick={() => {
        const newArray = numberArray.map((newArray) => {
          if (newArray.id === array.id) {
            return {
              ...newArray,
              isSelected: !newArray.isSelected,
            };
          } else {
            return newArray;
          }
        });
        setNumbers(newArray);
      }}
      className={array.isSelected ? "selected" : ""}
    >
      {array.number}
    </button>
  ));
  return array;
}

function identical(array) {
  for (let i = 1; i < array.length; i++) {
    if (array[i].number !== array[i - 1].number) {
      return false;
    }
  }
  console.log("true");
  return true;
}

function App() {
  const [numbers, setNumbers] = useState([]);
  const numberOfBtns = 10;
  let isAllSelected = false;

  for (let number of numbers) {
    if (!number.isSelected) {
      isAllSelected = false;
      break;
    }
    isAllSelected = true;
  }
  useEffect(() => {
    getNewBoard();
  }, []);

  const tenzies = identical(numbers) && isAllSelected;
  function getNewBoard() {
    const array = [];
    for (let i = 0; i < numberOfBtns; i++) {
      array.push({
        id: i,
        number: Math.floor(Math.random() * 6),
        isSelected: false,
      });
    }
    setNumbers(array);
  }
  function getNewNumbers() {
    const newArray = numbers.map((number) => {
      if (number.isSelected) {
        return number;
      } else {
        return {
          ...number,
          number: Math.floor(Math.random() * 6),
        };
      }
    });
    setNumbers(newArray);
    if (tenzies) {
      getNewBoard();
    }
  }

  return (
    <>
      {tenzies && <Confetti />}
      <div className="container">
        <div className="content">
          <h1>Tenzies</h1>
          <p>
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
          <div className="dices">
            <Btn numberArray={numbers} setNumbers={setNumbers} />
          </div>
          <button onClick={getNewNumbers}>
            {tenzies ? "Reset Game" : "Roll"}
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
