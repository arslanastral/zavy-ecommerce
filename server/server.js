import express from "express";
const app = express();

app.get("/", (request, response) => {
  response.send("<h1>This is our backend test with team acc on render</h1>");
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
