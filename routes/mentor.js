import express from "express";
import { Mentor } from "../models/assignMentor.js";
import { Student } from "../models/assignStudent.js";

const mentorRouter = express.Router();

//Find Mentors
mentorRouter.get("/getMentor", async (request, response) => {
  const mentor = await Mentor.find();

  response.send(mentor);
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
mentorRouter.get("/updateMentor", async (request, respond) => {
  const { student } = request.body;
  try {
    const update = await Mentor.updateOne({ student: student });
    await mentor.save();

    response.status(201).json({ message: "Mentor added successfully!" });
  } catch (err) {
    response.send(err);
  }
});

export { mentorRouter };
