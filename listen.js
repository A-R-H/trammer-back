const app = require("./app");

const PORT = process.env.PORT || 8080;

app.listen(PORT, err => {
  if (err) throw err;
  console.log(`Listening on port ${PORT}`);
});
