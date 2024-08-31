import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   fullname: {
      type: String,
      required: true  // Corrected "require" to "required"
   },
   email: {
      type: String,
      required: true, // Corrected "require" to "required"
      unique: true
   },
   phoneNumber: {
      type: Number,
      required: true  // Corrected "require" to "required"
   },
   password: {
      type: String,
      required: true  // Corrected "require" to "required"
   },
   role: {
      type: String,
      enum: ['student', 'recruiter'],
      required: true,
   },
   profile: {
      bio: {
         type: String
      },
      skills: [{
         type: String,
      }],
      resume: {
         type: String,
         // URL of resume file
      },
      resumeOriginalName: {
         type: String
      },
      company: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Company'
      },
      profilePhoto: {
         type: String,
         default: ""  // Corrected "defult" to "default"
      }
   }
},
{
   timestamps: true
});

export const User = mongoose.model("User", userSchema);
