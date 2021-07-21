import express from "express";
import { Mentor } from "../models/assignMentor.js";
import { Student } from "../models/assignStudent.js";

const mentorRouter = express.Router();

//Find Mentors
mentorRouter.get("/getMentor", async (request, response) => {
  const mentor = await Mentor.find();

  response.send(mentor);
});

//Show students of a mentor
mentorRouter.get("/showMentor", async (request, response) => {
  const { mentorId } = request.body;

  if (!mentorId) {
    return respponse.status(401).send({ error: "Field is empty!" });
  }

  try {
    const mentor = await Mentor.findOne(
      { _id: mentorId },
      { students: { studentName: 1 } }
    );

    response.status(200).send(mentor);
  } catch (err) {
    console.log(err);
  }
});

//Create Mentor
mentorRouter.post("/createMentor", async (request, response) => {
  const { name, email } = request.body;

  if (!name) {
    return response.status(422).json({ error: "Field is empty!" });
  }

  try {
    const isExist = await Mentor.findOne({ email: email });

    if (isExist) {
      return response.status(422).json({ error: "Email already exists!" });
    }

    const mentor = new Mentor({ name, email });
    await mentor.save();

    response.status(201).json({ message: "Mentor added successfully!" });
  } catch (err) {
    response.send(err);
  }
});

//Add students to Mentor
mentorRouter.patch("/updateMentor", async (request, response) => {
  const { mentorId, studentId } = request.body;

  if (!mentorId || !studentId) {
    return response.status(422).json({ error: "Field is empty!" });
  }

  try {
    const sName = await Student.findOne({ _id: studentId });
    const mName = await Mentor.findOne({ _id: mentorId });

    await Mentor.updateOne(
      { _id: mentorId },
      { $push: { students: { studentId: studentId, studentName: sName.name } } }
    );

    await Student.updateOne(
      { _id: studentId },
      { $set: { mentor: { mentorId: mentorId, mentorName: mName.name } } }
    );

    response
      .status(201)
      .json({ message: "Student added to Mentor successfully!" });
  } catch (err) {
    response.send(err);
  }
});

export { mentorRouter };
