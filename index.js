const express = require("express");
const bodyParser = require("body-parser");

const uploadRoute = require("./upload");
const PrintMemoryUsage = require("./memory");
const { getToken, ensureAuthenticated } = require("./security");

const filesPaths = process.env.FILEPATH || "/data/files";
const port = process.env.PORT || 3000;
const memLogInterval = process.env.MemLogInterval || -1; //10000;

const app = express();

// Add a basic route to check if server's up

app.use(bodyParser.json({ type: "application/json" }));
app.use(uploadRoute);

app.use("/files", ensureAuthenticated);
app.use("/files", express.static(filesPaths));
app.post("/getSignedHash", (req, res) => {
  const contents = req.body.fileName;
  res.status(200).send({ hash: getToken(contents) });
});

app.get("/", (req, res) => {
  res.status(200).send(`Server up and running`);
});

app.listen(port, () => {
  console.log("Server running at http://127.0.0.1:3000/");
});
