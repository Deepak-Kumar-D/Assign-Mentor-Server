import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mentor: { mentorId: { type: String }, mentorName: { type: String } },
  status: { type: String },
});

export const Student = mongoose.model("Student", studentSchema);
