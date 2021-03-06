import express from "express";
import { Mentor } from "../models/assignMentor.js";
import { Student } from "../models/assignStudent.js";

const mentorRouter = express.Router();

//Find Mentors
mentorRouter.get("/getMentor", async (request, response) => {
  const mentor = await Mentor.find();

  response.status(200).json(mentor);
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

    response.status(200).json({ message: "Mentor added successfully!" });
  } catch (err) {
    response.json(err);
  }
});

//Assign students to Mentor
mentorRouter.patch("/updateMentor", async (request, response) => {
  const { mentorId, studentId } = request.body;

  if (!mentorId || !studentId) {
    return response.status(422).json({ error: "Field is empty!" });
  }

  try {
    studentId.forEach(async (ele) => {
      const sName = await Student.findOne({ _id: ele });
      const mName = await Mentor.findOne({ _id: mentorId });

      await Mentor.updateOne(
        { _id: mentorId },
        {
          $push: {
            students: { studentId: ele, studentName: sName.name },
          },
        }
      );

      await Student.updateOne(
        { _id: ele },
        {
          $set: {
            mentor: { mentorId: mentorId, mentorName: mName.name },
            status: "true",
          },
        }
      );
    });

    response
      .status(200)
      .json({ message: "Student added to Mentor successfully!" });
  } catch (err) {
    response.json(err);
  }
});

export { mentorRouter };
