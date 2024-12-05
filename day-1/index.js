import { fileToString } from "../util/readFile.js";

const data = fileToString("input.txt");

const cols = splitData(data);
const [col1, col2] = cols;

const frequencies = {};

for (const id of col2) {
	frequencies[id] = (frequencies[id] || 0) + 1;
}

for (const col of cols) {
	col.sort((a, b) => a - b);
}

const result = {
	"Part 1": calculateDistance(cols),
	"Part 2": calculateSimilarity(col1, frequencies)
};

console.table(result);

function splitData(data) {
	const lines = data.split('\n');
	const col1 = [], col2 = [];

	for (const line of lines) {
		const splitCols = line.split(/\s+/g);
		col1.push(+splitCols[0]);
		col2.push(+splitCols[1]);
	}

	return [col1, col2];
}

function calculateDistance(columns) {
	const [col1, col2] = columns;
	let totalDistance = 0;

	for (let i = 0; i < col1.length; i++) {
		totalDistance += Math.abs(col1[i] - col2[i]);
	}

	return totalDistance;
}

function calculateSimilarity(col, freq) {
	let score = 0;

	for (const id of col) {
		score += id * freq[id] || 0;
	}

	return score;
}