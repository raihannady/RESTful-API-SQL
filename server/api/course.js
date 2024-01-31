const _ = require("lodash");
const Router = require("express").Router();

const Validation = require("../helpers/validationHelper");
const courseHelper = require("../helpers/courseHelper");
const GeneralHelper = require("../helpers/generalHelper");

const getStudentList = async (req, res) => {
  try {
    const data = await courseHelper.getStudentList();

    return res.send(data);
  } catch (err) {
    console.log(["getStudent", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

const studentLecturer = async (req, res) => {
  try {
    const data = await courseHelper.getStudentLecturer();

    return res.send(data);
  } catch (err) {
    console.log(["studentLecturer", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

const studentCourse = async (req, res) => {
  try {
    const data = await courseHelper.getStudentCourse();

    return res.send(data);
  } catch (err) {
    console.log(["studentCourse", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};
const addStudent = async (req, res) => {
  try {
    Validation.studentValidation(req.query);
    // const { fullname, nickname } = req.body; <<< for reference

    const data = await courseHelper.addStudent({ ...req.body });

    return res.send(data);
  } catch (err) {
    console.log(["addStudent", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

const updateStudent = async (req, res) => {
  try {
    Validation.studentValidation(req.query);

    // const request = { ...req.body }; << for reference

    const data = await courseHelper.updateStudent(...req.body);

    return res.send(data);
  } catch (err) {
    console.log(["updateStudent", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

const deleteStudent = async (req, res) => {
  try {
    // const { student_id, fullname, nickname } = req.body; << for reference

    const data = await courseHelper.deleteStudent(...req.body);

    return res.send(data);
  } catch (err) {
    console.log(["deleteStudent", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

Router.get("/student", getStudentList);
Router.post("/student", addStudent);
Router.patch("/student", updateStudent);
Router.delete("/student/:student_id", deleteStudent);
Router.get("/student/lecturer", studentLecturer);
Router.get("/student/course", studentCourse);

module.exports = Router;
