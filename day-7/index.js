const { fileToString } = require("../util/readFile.js");
const path = require("path");

const data = fileToString(path.join(__dirname, "input.txt"));
const lines = data.split("\n");
const CONCAT = true;

const result = {
	"Part 1": solveEquations(lines),
	"Part 2": solveEquations(lines, CONCAT),
}

console.table(result);

function solveEquations(lines, concat = false) {
	let total = 0;

	if (concat) {
		for (const line of lines) {
			total += solver(line, true);
		}
	} else {
		for (const line of lines) {
			total += solver(line);
		}
	}

	return total;
}

function solver(line, concat = false) {
	const [key, nums] = line.split(': ')
	const vals = nums.split(" ").map(v => +v);
	const final = +key;

	let possible = new Set([vals[0]]);
	
	for (let i = 1; i < vals.length; i++) {
		const next = vals[i];
		const newResults = new Set();

		possible.forEach(res => {
			newResults.add(res + next);
			newResults.add(res * next);
			if (concat)
				newResults.add(Number(String(res) + String(next)));
		});

		possible = newResults;
	}

	return (possible.has(final)) ? final : 0;
}