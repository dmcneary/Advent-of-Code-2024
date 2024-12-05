import { fileToString } from "../util/readFile.js";

const data = fileToString("./input.txt");
const lines = data.split('\n');

let validCount = 0,
	fixableCount = 0;

for (const line of lines) {
	const vals = line.split(' ').map(el => +el);

	if (
		checkIncreasing(vals) ||
		checkDecreasing(vals)
	) {
		validCount++;
	} else {
		for (let i = 0; i < vals.length; i++) {
			const spliced = vals.toSpliced(i, 1);
			if (
				checkIncreasing(spliced) ||
				checkDecreasing(spliced)
			) {
				fixableCount++;
				break;
			}
		}
	}
}

const result = {
	"Part 1": validCount,
	"Part 2": validCount + fixableCount
};

console.table(result);

function checkIncreasing(vals) {
	for (let i = 1; i < vals.length; i++) {
		if (vals[i] <= vals[i - 1]) return false;
	}

	return checkInterval(vals);
}

function checkDecreasing(vals) {
	for (let i = 1; i < vals.length; i++) {
		if (vals[i] >= vals[i - 1]) return false;
	}

	return checkInterval(vals);
}

function checkInterval(vals) {
	const set = new Set(vals);
	if (set.size !== vals.length) return false;

	for (let i = 1; i < vals.length; i++) {
		const diff = Math.abs(vals[i] - vals[i - 1]);
		if (diff < 1 || diff > 3) return false;
	}

	return true;
}