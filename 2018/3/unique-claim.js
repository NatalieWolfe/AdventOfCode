'use strict';

const fs = require('fs');

let uniqueClaimId = -1;
let possibleUniqueClaimIds = new Set();
let fabric = [];


// fabric be like: [
//    [[], [], ["1", "2"], ... []],
//    [[], ["3"], ["1", "2", "3"], ... []],
//    [[], ["3"], ["1", "3"], ... []],
//    [[], ["3"], ["3"], ... []]
// ]


// Inputs be like: #1 @ 565,109: 14x24
const inputs = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split('\n');
const claims = inputs.map((line) => {
  let claimId = null;
  let coordinates = null;
  let claimSize = null;

  const match = line.match(/#(\d+) @ (\d+,\d+): (\d+x\d+)/);
  if (match) {
    claimId = match[1];
    coordinates = match[2].split(',').map((n) => parseInt(n, 10));
    claimSize = match[3].split('x').map((n) => parseInt(n, 10));
    possibleUniqueClaimIds.add(claimId);
  }

  return coordinates && claimSize ? {claimId, coordinates, claimSize} : null;
});

// claims be like: [
//   {claimId: "1", coordinates: [565, 109], claimSize: [14, 24]},
//   {claimId: "2", coordinates: [413, 723], claimSize: [16, 28]},
//   {claimId: "3", coordinates: [136, 229], claimSize: [27, 11]}
// ]

claims.forEach((claim) => {
  if (!claim) {
    return;
  }

  const claimId = claim.claimId;
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
        row[squareIndex] = {claims: []};
      }

      const square = row[squareIndex];
      square.claims.push(claimId);
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
    if (square && square.claims.length >= 2) {
      square.claims.forEach((claimId) => possibleUniqueClaimIds.delete(claimId));
    }
  }
}

if (possibleUniqueClaimIds.size === 1) {
  for (let claimId of possibleUniqueClaimIds) {
    uniqueClaimId = claimId;
  }
}

console.log(uniqueClaimId);
