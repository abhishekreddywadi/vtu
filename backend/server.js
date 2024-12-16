const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConnect = require("./Database/databaseConnection");
const userRoutes = require("./routes/userRoutes");
const { verifyToken } = require("./middlerware/userMiddleware");

app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT || 3000;

// connect to MongoDB
dbConnect();

app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
