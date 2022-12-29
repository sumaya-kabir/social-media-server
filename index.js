const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const userRoute = require("./routes/users")

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(morgan("common"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/users", userRoute)
app.use("/auth", authRoute);
app.use("/posts", postRoute);

dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);


app.listen(port, () => {
    console.log(`social media running on the port ${port}`);
});