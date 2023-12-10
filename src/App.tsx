import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Day1 } from "./days/Day1";
import { Day2 } from "./days/Day2";
import React from "react";
import { Day3 } from "./days/Day3";
import { Day4 } from "./days/Day4";
import { Day5 } from "./days/Day5";
import { Day6 } from "./days/Day6";
import { Day8 } from "./days/Day8";
import { Day7 } from "./days/Day7";
import { Day9 } from "./days/Day9";
import { Day10 } from "./days/Day10";


function App() {
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Advent of Code</h1>
      <div className="card">
        <Day10 />
        <Day9 />
        <Day8 />
        <Day7 />
        <Day6 />
        <Day5 />
        <Day4 />
        <Day3 />
        <Day2 />
        <Day1 />
      </div>
      <p className="read-the-docs">old school code, for people over 30</p>
    </>
  );
}

export default App;
