const { fileToString } = require("../util/readFile.js");
const path = require("path");

const data = fileToString(path.join(__dirname, "./input.txt"));

const split = data.split("\n");
const breakline = split.indexOf("");

const rules = split.slice(0, breakline),
	updates = split.slice(breakline + 1);

const rulesTable = {},
	validUpdates = [],
	invalidUpdates = [];


for (const rule of rules) {
	const [pg1, pg2] = rule.split("|");
	if (!rulesTable[pg1]) rulesTable[pg1] = [];
	rulesTable[pg1].push(pg2);
}

for (const update of updates) {
	const pages = update.split(",");
	if (checkUpdate(pages)) validUpdates.push(pages);
	else invalidUpdates.push(pages);
}

invalidUpdates.forEach(update => {
	update.sort((a, b) => (
		rulesTable[a] && rulesTable[a].includes(b) ? 1 : 
		rulesTable[b] && rulesTable[b].includes(a) ? -1 : 
		0
	));
});

const result = {
	"Part 1": middlePageSum(validUpdates),
	"Part 2": middlePageSum(invalidUpdates)
};

console.table(result);

function checkUpdate(pages) {
	for (const pg1 of pages) {
		for (const pg2 of rulesTable[pg1]) {
			const pg1Idx = pages.indexOf(pg1), 
				pg2Idx = pages.indexOf(pg2);
			if (pg2Idx >= 0 && pg2Idx < pg1Idx)
				return false;
		}
	}

	return true;
}

function middlePageSum(updates) {
	let sum = 0;

	for (const update of updates) {
		const middlePg = +update[(update.length - 1) / 2];
		sum += middlePg;
	}

	return sum;
}