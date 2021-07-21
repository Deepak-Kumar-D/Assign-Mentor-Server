import express from "express";
import { Student } from "../models/assignStudent.js";

const studentRouter = express.Router();

//Find Student
studentRouter.get("/getStudent", async (request, response) => {
  const student = await Student.find();

  response.send(student);
});

//Create Student
studentRouter.post("/createStudent", async (request, response) => {
  const { name, email } = request.body;

  if ((!name, !email)) {
    return response.status(422).json({ error: "Field is empty!" });
  }
  try {
    const isExist = await Student.findOne({ email: email });

    if (isExist) {
      return response.status(422).json({ error: "Email already exists!" });
    }

    const student = new Student({ name, email });
    await student.save();

    response.status(201).json({ message: "Student created successfully!" });
  } catch (err) {
    console.log(err);
  }
});

//update mentor
studentRouter.patch("/updateStudent", async (request, response) => {
  const { studentId, newMentorId } = request.body;
  if (!student || !mentor) {
    return response.status(422).json({ error: "Field is empty!" });
  }

  try {
    await Student.updateOne(
      { _id: studentId },
      { $set: { mentor: { mentorId: mentorId, mentorName: mName.name } } }
    );

    response.status(200).json({ message: "Mentor updated!" });
  } catch (err) {
    console.log(err);
  }
});

export { studentRouter };
