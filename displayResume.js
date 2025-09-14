import fs from "fs";
import { marked } from "marked";
import TerminalRenderer from "marked-terminal";

import { loadResume } from "./loadResume.js";

export const displayResume = async () => {
	const filePath = await loadResume();

	marked.setOptions({
		renderer: new TerminalRenderer(),
	});

    console.log(`-------------RENDERER CREATED----------------`);

	const md = fs.readFileSync(filePath, "utf-8");
	console.log(marked(md));

    fs.rmSync(filePath)
};
