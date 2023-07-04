import React, { useState,useEffect } from 'react';
import chatbotImage from '../aibot-bg.png';
import './Sudokusolve.css';
import magicalImage from './gradient.jpg';

import Header from '../Headerfile/Header';
import Upload from '../Uploadfile/Upload';

function App() {
  const [sudoku, setSudoku] = useState(() =>
  Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => 0))
);

  //checking
  const [inputValid, setInputValid] = useState(true);
  const [message, setMessage] = useState('');
  // to make work typewriting only when button is clicked 
  
 

  const solveSudoku = () => {
    //to check for 17 inputs
    const inputCount = sudoku.flat().reduce((count, cell) => count + (cell !== 0 ? 1 : 0), 0);
  

    // if (inputCount < 17) {
    //   setMessage('Please enter minimum 17 inputs ')
      
    //   // alert('At least 17 inputs are required to solve the Sudoku.');
    //   return;
    // }

        fetch('https://purushothamandev.pythonanywhere.com/solve', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sudoku: sudoku }),
        })
          .then((response) => response.json())
          .then((data) => {
            const solvedSudoku = data.solved_sudoku;
            console.log(solvedSudoku);
            
            setSudoku(solvedSudoku);
            // 
          
            // 
            setInputDisabled(sudoku.map((row) => row.map((cell) => cell !== 0)));
          })
          .catch((error) => {
            setMessage('Sudoku input is not correct')
          
            // alert('Sudoku input is not correct');
            console.error('Error:', error);
          });
      };
     
      const [inputDisabled, setInputDisabled] = useState(() =>
  Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => false))
);


 
  const handleInputChange = (e, row, col) => {
    const value = e.target.value;
    const isValidInput = /^\d?$|^([1-9])$/.test(value); // Regex to validate input
    
    if (isValidInput) {
      const newSudoku = [...sudoku];
      newSudoku[row][col] = value === '' ? 0 : parseInt(value, 10);
      setSudoku(newSudoku);

      setInputValid(true); 
      
    } else {
      // Show error message to the user
      setInputValid(false);
      setMessage('Please enter input from 0 to 9')
      // alert('Invalid input! Please enter a number from 0 to 9.');
    }
  };

//  checking sudoku validity
const checkSudoku = () => {
  
  const isValidSudoku = validateSudoku();
  const message = isValidSudoku ? 'Sudoku is valid.' : 'Sudoku is not valid.';
  setMessage(message);
  // alert(message);
};
const clearsudoku=()=>{

}
const validateSudoku = () => {
  // Check rows
  for (let i = 0; i < 9; i++) {
    const row = sudoku[i];
    if (!isValidSet(row)) {
      return false;
    }
  }

  // Check columns
  for (let i = 0; i < 9; i++) {
    const column = sudoku.map((row) => row[i]);
    if (!isValidSet(column)) {
      return false;
    }
  }

  // Check subgrids
  for (let i = 0; i < 9; i += 3) {
    for (let j = 0; j < 9; j += 3) {
      const subgrid = [];
      for (let k = i; k < i + 3; k++) {
        for (let l = j; l < j + 3; l++) {
          subgrid.push(sudoku[k][l]);
        }
      }
      if (!isValidSet(subgrid)) {
        return false;
      }
    }
  }

  return true;
};

const isValidSet = (set) => {
  const seen = new Set();
  for (let i = 0; i < set.length; i++) {
    const value = set[i];
    if (value !== 0) {
      if (seen.has(value)) {
        return false;
      }
      seen.add(value);
    }
  }
  return true;
};

// 
  
  function resetSudoku(){
    
    setMessage('Reseted! now enter new input ')
    setSudoku( Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => 0)));
    setInputDisabled( Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => false)));
    setInputValid(true);
    
    // setInputDisabled(Array(9).fill(Array(9).fill(false)));

  }
  return (
    <div className="App">
    <Header/>
      <div className="App-header">
      <div className="left-div">
      
      <div className='img-chat'>
      <img className='bot' src="https://images.squarespace-cdn.com/content/v1/61f30f2d94a2222a9c7f5389/1683099320334-4KE7G9P7WQ4FAURTYX79/giphy+%282%29.gif" alt='chatbot' height={250} width={250}>

      </img>
      <h5 className='message'><em>{message}</em></h5>
      </div>
      <h3>Welcome to Suduko Sensei:<br></br> where numbers meet brain power</h3>
      
      <h4 className='message'>I'm here to assist you</h4>
      
      {/* <h4>Hi Im chat bot love to have u</h4> */}
      </div>
      <div classnmae='holder'>
      <div className="sudokugrid">
     
      <table>
        <tbody>
          
          {sudoku.map((row, rowIndex) => (
          <tr className={(rowIndex + 1)%3 === 0 ? 'sudoku-row': ''} key={rowIndex}>
            {row.map((cell, colIndex) => (
              <td className ={(colIndex+1)%3 === 0 ? 'sudoku-col':''}key={rowIndex + colIndex}>
              <input
                className={`cellInput ${ inputDisabled[rowIndex][colIndex] ? 'disabled' : ''
                          } ${inputValid ? '' : 'invalid'}`}
                key={colIndex}
                // type="number"
                min="1"
                max="9"
                value={cell === 0 ? '' : cell}
                onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                disabled={sudoku[rowIndex][colIndex]!==0}/>
              </td>
            ))}
          </tr>
        ))}
          
        </tbody>
      </table>
      <Upload 
      ></Upload>
      
      </div>
      <div className="buttonContainer">
      <button className="checkButton" onClick={checkSudoku}>
        Check
      </button>
      <button className="solveButton" onClick={solveSudoku}>
        Solve
      </button>
      <button className="resetButton" onClick={resetSudoku}>
        Reset
      </button>
      </div>
      
      </div>
      </div>
     
      </div>
  );
}

export default App;

