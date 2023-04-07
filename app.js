const express = require("express");
const app = express();
const port = 5000;

app.get("/", (request, response) => {
  response.send("hello");
});

app.post("/", (request, response) => {
  response.json({ message: "haha guys!", status: "haha" });
});
app.listen(port, () => {
  console.log(`first backend ${port}`);
});
