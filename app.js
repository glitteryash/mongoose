const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const fs = require("fs");

//connect to mongoDB
mongoose
  .connect("mongodb://localhost:27017/exampleDB")
  .then(() => {
    console.log("Connected to MongoDB.");
  })
  .catch((err) => {
    console.log("Connection Failed.");
    console.log(err);
  });

//define a schema
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, `Please fill the name.`],
    maxlength: [20, `Name is too long.`],
  },
  age: {
    type: Number,
    max: 100,
    required: [true, `Please fill the age.`],
  },
  major: {
    type: String,
    enum: ["EE", "Chem", "Computer Science", "Law", "undecided"],
    default: "undecided",
  },
  scholarship: {
    merit: {
      type: Number,
      max: 5000,
      min: 0,
      default: 0,
    },
    other: {
      type: Number,
      min: 0,
      default: 0,
    },
  },
});

//create an instance method
studentSchema.methods.totalScholarship = function () {
  return this.scholarship.merit + this.scholarship.other;
};

//creat a static method
studentSchema.statics.setOtherToZero = function () {
  return this.updateMany({}, { "scholarship.other": 0 });
};
// create a model for students
const Student = mongoose.model("Student", studentSchema);

studentSchema.pre("save", function (next) {
  console.log("pre save hook triggered");
  fs.writeFile("presave.txt", "One data is trying to be saved.", (err) => {
    if (err) {
      console.error("Error writing to file:", err);
      return next(err); // 如果出現錯誤，傳遞給 next()
    }
    console.log("File written successfully");
    next(); // 沒有錯誤，繼續保存操作
  });
});

const newStudent = new Student({
  name: "Ray Kelly",
  age: 31,
  major: "Chem",
  scholarship: { merit: 0, other: 0 },
});

newStudent
  .save()
  .then(() => {
    console.log("saved");
  })
  .catch((e) => {
    console.error("not saved", e);
  });

// Student.find({}).then((data) => {
//   console.log(data);
// });

// Student.findOne({ name: "Ann Gill" })
//   .then((data) => {
//     let result = data.totalScholarship();
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(`Error Message ${err}`);
//   });

//calculate every student's scholarship
// Student.find({})
//   .then((data) => {
//     data.forEach((oneStudent) => {
//       console.log(
//         `${oneStudent.name}'s scholarship is ${oneStudent.totalScholarship()}`
//       );
//     });
//   })
//   .catch((err) => {
//     console.log(`Error Message ${err}`);
//   });

//chang all student's other to 0
// Student.setOtherToZero()
//   .then((meg) => {
//     console.log(meg);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//create an object
// const Ann = new Student({
//   name: "Ann Gill",
//   age: 79,
//   major: "EE",
//   scholarship: { merit: 2500, other: 1300 },
// });

//save to DB
// Ann.save()
//   .then(() => {
//     console.log(`Student has been saved into DB.`);
//   })
//   .catch((e) => {
//     console.log(`Error has happened : ${e}`);
//   });

// Student.find({}).then((data) => {
//   console.log(data);
// });

// Student.findOneAndUpdate(
//   { name: "Ken Benson" },
//   { name: "Jerry Benson" },
//   { new: true }
// ).then((meg) => {
//   console.log(meg);
// });

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
