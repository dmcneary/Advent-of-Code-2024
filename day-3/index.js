import { fileToString } from "../util/readFile.js";

const data = fileToString("./input.txt");

let enable = true;

const part1RegEx = /mul\(\d+,\d+\)/g;
const part2RegEx = /(do\(\))|(don't\(\))|(mul\(\d+,\d+\))/g;

const part1 = data.match(part1RegEx).reduce((acc, curr) => {
	const [a, b] = curr.match(/\d+,\d+/)[0].split(',');
	return acc + (a * b);
}, 0);

const part2 = data.match(part2RegEx).reduce((acc, curr) => {
	if (/(do\(\))|(don't\(\))/.test(curr)) {
		enable = /do\(\)/.test(curr);
		return acc;
	} else if (enable) {
		const [a, b] = curr.match(/\d+,\d+/)[0].split(',');
		return acc + (a * b);
	} else return acc;
}, 0);;

const result = {
	"Part 1": part1,
	"Part 2": part2 
};

console.table(result);