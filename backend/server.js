const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/Auth");

const app = express();


app.use(cors());
app.use(express.json());

//to check root api settings
app.get("/", (req, res) => {
  res.send("API is working 🚀");
});


app.use("/api/auth", authRoutes);


mongoose.connect("mongodb+srv://RASH:1234@cluster1.2pi15.mongodb.net/Weather?retryWrites=true&w=majority&appName=Cluster1")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
