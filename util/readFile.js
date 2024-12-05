import { readFileSync } from "node:fs" 

export const fileToString = path => readFileSync(path).toString().trim();