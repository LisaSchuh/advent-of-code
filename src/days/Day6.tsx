import React, { useState } from "react";

const DATA = `Time:        46     82     84     79
Distance:   347   1522   1406   1471`;

const DATA2 = `Time:        46828479
Distance:   347152214061471`;

function createArray(n: number): number[] {
  return Array.from({ length: n }, (_, index) => index + 1);
}

function calculateMaxWins(data: string) {
  const lines = data.split("\n");
  const times = lines[0]
    .split(" ")
    .slice(1)
    .map(Number)
    .filter((x) => x > 0);
  const distances = lines[1]
    .split(" ")
    .slice(1)
    .map(Number)
    .filter((x) => x > 0);

  return times
    .map((time, index) => {
      const possibleOfWins = createArray(time)
        .map((msecond): number => {
          return (time - msecond) * msecond > distances[index] ? 1 : 0;
        })
        .reduce((acc, cur) => acc + cur, 0);
      return possibleOfWins;
    })
    .reduce((acc, cur) => acc * cur, 1);
}

export const Day6 = () => {
  const [part1, setPart1] = useState<number>(0);
  const [part2, setPart2] = useState<number>(0);

  const calculatePart1 = () => {
    const numberOfWins = calculateMaxWins(DATA);
    setPart1(numberOfWins);
  };

  const calculatePart2 = () => {
    const numberOfWins = calculateMaxWins(DATA2);
    setPart2(numberOfWins);
  };

  return (
    <div>
      <h2>Day 6</h2>
      <button onClick={calculatePart1}>CalculatePart1</button>
      <p>Value part 1: {part1}</p>
      <button onClick={calculatePart2}>CalculatePart2</button>
      <p>Value part 2: {part2}</p>
    </div>
  );
};
