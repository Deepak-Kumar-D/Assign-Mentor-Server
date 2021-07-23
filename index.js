import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { mentorRouter } from "./routes/mentor.js";
import { studentRouter } from "./routes/student.js";

const app = express();
const PORT = process.env.PORT || 5002;

const url = process.env.MONGODB_URL || "mongodb://localhost/assignMentor";

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const con = mongoose.connection;
con.on("open", () => {
  console.log("Mongodb is connected!");
});

app.use(cors());
app.use(express.json());

app.use("/", mentorRouter);
app.use("/", studentRouter);

app.use("/", async (request, response) => {
  response.send("Node file is running...");
});

app.listen(PORT, () => {
  console.log(`Database running @ PORT ${PORT}...`);
});
