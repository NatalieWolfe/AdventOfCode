'use strict';

const fs = require('fs');

let totalSquareInchesOverlapped = 0;
let fabric = [];

// fabric be like: [
//    [0, 0, 0, 0, ..., 0, 0],
//    [0, 0, 1, 1, ..., 0, 0],
//    [0, 0, 3, 3, ..., 0, 0],
//    [0, 0, 0, 0, ..., 0, 0],
// ]


// Inputs be like: #1 @ 565,109: 14x24
const inputs = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split('\n');
const claims = inputs.map((line) => {
  let coordinates = null;
  let claimSize = null;

  const match = line.match(/#\d+ @ (\d+,\d+): (\d+x\d+)/);
  if (match) {
    coordinates = match[1].split(',').map((n) => parseInt(n, 10));
    claimSize = match[2].split('x').map((n) => parseInt(n, 10));
  }

  return coordinates && claimSize ? {coordinates, claimSize} : null;
});

// claims be like: [
//   {coordinates: [565, 109], claimSize: [14, 24]},
//   {coordinates: [413, 723], claimSize: [16, 28]},
//   {coordinates: [136, 229], claimSize: [27, 11]}
// ]

claims.forEach((claim) => {
  if (!claim) {
    return;
  }

  const left = claim.coordinates[0];
  const top = claim.coordinates[1];
  const width = claim.claimSize[0];
  const height = claim.claimSize[1];

  for (let rowIndex = top; rowIndex < top + height; ++rowIndex) {
    if (!fabric[rowIndex]) {
      fabric[rowIndex] = [];
    }

    const row = fabric[rowIndex];
    for (let squareIndex = left; squareIndex < left + width; ++squareIndex) {
      if (!row[squareIndex]) {
        row[squareIndex] = {claims: 0};
      }

      const square = row[squareIndex];
      ++square.claims;
    }
  }
});

for (let rowIndex = 0; rowIndex < fabric.length; ++rowIndex) {
  const row = fabric[rowIndex];
  if (!row) {
    continue;
  }

  for (let squareIndex = 0; squareIndex < row.length; ++squareIndex) {
    const square = row[squareIndex];
    if (square && square.claims >= 2) {
      ++totalSquareInchesOverlapped;
    }
  }
}

console.log(totalSquareInchesOverlapped);
