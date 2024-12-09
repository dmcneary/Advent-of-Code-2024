const { fileToString } = require("../util/readFile.js");
const path = require("path");

const data = fileToString(path.join(__dirname, "input.txt"));
const matrix = data.split("\n").map(line => line.split(""));
const m = matrix.length, n = matrix[0].length;
const start = findStartPos(matrix);

const directions = [
	[-1, 0], // North
	[0, 1],  // East
	[1, 0],  // South
	[0, -1]   // West
];

const result = {
	"Part 1": part1(),
	"Part 2": part2()
};

console.table(result);

function part1() {
	const visited = new Array(m).fill(null).map(() => new Array(n).fill(false));

	let [x, y] = start;
	let currDir = 0;
	let posCount = 1; // include start position

	while (true) {
		visited[x][y] = true;
		let [dx, dy] = directions[currDir];

		if (matrix[x + dx][y + dy] === "#") {
			currDir = (currDir < directions.length - 1) ? currDir + 1 : 0;
			[dx, dy] = directions[currDir];
		}

		x += dx;
		y += dy;

		if (!isInBounds(x, y, m, n)) return posCount;
		else if (!visited[x][y]) posCount++;
	}
}

function part2() {
	const visited = new Array(m).fill(null).map(() => new Array(n).fill(false));

	let [x, y] = start
	let currDir = 0;
	let obstacleCount = 0;
	
	while (true) {
		if (visited[x][y]) {
			obstacleCount += checkObs(x, y, currDir, m, n);
		}

		visited[x][y] = true;
		let [dx, dy] = directions[currDir];

		if (matrix[x + dx][y + dy] === "#") {
			currDir = (currDir < directions.length - 1) ? currDir + 1 : 0;
			[dx, dy] = directions[currDir];
		}

		x += dx;
		y += dy;

		if (!isInBounds(x, y, m, n)) return obstacleCount;
	}
}

function findStartPos(mat) {
	for (let i = 0; i < mat.length; i++) {
		for (let j = 0; j < mat[0].length; j++) {
			if (mat[i][j] === "^") return [i, j];
		}
	}
}

function isInBounds(row, col, m, n) {
	return row >= 0 && row < m && col >= 0 && col < n;
}

function checkObs(row, col, dir, m, n) {
	const nextDir = (dir < directions.length - 1) ? dir + 1 : 0; // North -> East -> South  -> West -> North
	const nextStep = directions[nextDir][0] | directions[nextDir][1];

	if (dir % 2 === 0) {
		for (let i = col + nextStep; isInBounds(row, i, m, n); i += 1 * nextStep) {
			if (matrix[row][i] === "#") return 1;
		}
	} else {
		for (let i = row + nextStep; isInBounds(i, col, m, n); i += 1 * nextStep) {
			if (matrix[i][col] === "#") return 1;
		}
	}

	return 0;
}