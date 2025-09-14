import fs from "fs";
import { Readable } from "stream";

const resumeLink = "https://drive.google.com/uc?export=download&id=12E7Eu97l9N0V6HEu02O11xGQbcUF2-2u";

/* Load resume using the link */

const downloadLink = process.env.RESUME_LINK || resumeLink;
const filePath = "./resume.pdf";

export const loadResume = async () => {
	const response = await fetch(downloadLink);
	if (!response.ok) {
		console.log(response);
		console.error(`HTTP error ${response.status}`);
		process.exit(1);
	}

	// response.body is not a Node Stream but a Web Stream
	const nodeStream = Readable.fromWeb(response.body);
	const fileStream = fs.createWriteStream(filePath);
	await new Promise((resolve, reject) => {
		nodeStream.pipe(fileStream);
		nodeStream.on("error", reject);
		fileStream.on("finish", resolve);
	});

	console.log(`-------------RESUME LOADED----------------`);

	return filePath;
};
