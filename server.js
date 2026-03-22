const express = require("express");
const multer = require("multer");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const archiver = require("archiver");
const cors = require("cors");

const parseResume = require("./utils/parser");
const generateHTML = require("./utils/generator");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    const dataBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(dataBuffer);

    const parsedData = parseResume(pdfData.text);

    res.json(parsedData);
  } catch (err) {
    res.status(500).send("Parsing error");
  }
});

app.post("/generate", async (req, res) => {
  try {
    const userData = req.body;

    const html = generateHTML(userData);

    fs.writeFileSync("output/index.html", html);

    const output = fs.createWriteStream("output/site.zip");
    const archive = archiver("zip");

    archive.pipe(output);
    archive.file("output/index.html", { name: "index.html" });
    archive.finalize();

    output.on("close", () => {
      res.download("output/site.zip");
    });

  } catch (err) {
    res.status(500).send("Generation error");
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
