import { fileToString } from "../util/readFile.js";

const data = fileToString("./input.txt");
const matrix = data.split("\n").map(line => line.split(""));
const m = matrix.length, n = matrix[0].length;

const sequence = "XMAS";

const dirs = [
	[-1, -1],
	[-1, 0],
	[-1, 1],
	[0, 1],
	[1, 1],
	[1, 0],
	[1, -1],
	[0, -1]
];

const result = {
	"Part 1": 0,
	"Part 2": 0
};

for (let i = 0; i < m; i++) {
	for (let j = 0; j < n; j++) {
		if (matrix[i][j] === "X") {
			for (const [dx, dy] of dirs) {
				if (checkXMASSequence(i, j, dx, dy, 0))
					result["Part 1"]++;
			}
		}
		if (matrix[i][j] === "A") {
			result["Part 2"] += countXMAS(i, j);
		}
	}
}

console.table(result);

function checkXMASSequence(row, col, dx, dy, i) {
	if (i === sequence.length) return true;

	if (!isInBounds(row, col)) {
    return false; 
  }

	if (matrix[row][col] !== sequence[i]) {
		return false;
	}

	return checkXMASSequence(row + dx, col + dy, dx, dy, i + 1);
}

function countXMAS(centerRow, centerCol) {
	const directions = [
		[-1, -1],
		[1, 1],
		[-1, 1],
		[1, -1]
	];

	let patternCount = 0;

	for (let i = 0; i < directions.length; i++) {
		for (let j = i + 1; j < directions.length; j++) {
			const [dx1, dy1] = directions[i];
			const [dx2, dy2] = directions[j];
			const validXMAS =
				checkMAS(centerRow, centerCol, dx1, dy1) &&
				checkMAS(centerRow, centerCol, dx2, dy2);

			if (validXMAS) patternCount++;
		}
	}

	return patternCount;
}

function checkMAS(centerRow, centerCol, dx, dy) {
	return (
		isInBounds(centerRow - dx, centerCol - dy) &&
		isInBounds(centerRow + dx, centerCol + dy) &&
		matrix[centerRow - dx][centerCol - dy] === "M" &&
		matrix[centerRow + dx][centerCol + dy] === "S"
	);
}

function isInBounds(row, col) {
	return row >= 0 && row < m && col >= 0 && col < n;
}