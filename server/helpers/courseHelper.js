// const _ = require("lodash");

// const baseURL = "https://pokeapi.co/api/v2";
// const fibonacciSequence = require("./generalHelper");

const getDatabase = require("../services/database");

const getStudentList = async () => {
  let studentList = getDatabase.getStudentData();

  return Promise.resolve(studentList);
};

const getStudentLecturer = async () => {
  let studentLecturerList = getDatabase.studentLecturer();

  return Promise.resolve(studentLecturerList);
};

const getStudentCourse = async () => {
  let studentCourse = getDatabase.studentCourse();

  return Promise.resolve(studentCourse);
};

const addStudent = async (dataObject) => {
  const { lecturer_id, fullname, nickname } = dataObject;
  let student = getDatabase.addStudentData({ lecturer_id, fullname, nickname });

  return Promise.resolve(student);
};

const updateStudent = async (dataObject) => {
  const { student_id, fullname, nickname, lecturer_id } = dataObject;
  console.log(dataObject);
  let student = getDatabase.updateStudentData({
    student_id,
    fullname,
    nickname,
    lecturer_id,
  });

  return Promise.resolve(student);
};

const deleteStudent = async (dataObject) => {
  const { student_id } = dataObject;
  console.log(dataObject);
  let student = getDatabase.deleteStudentData({ student_id });

  return Promise.resolve(student);
};

module.exports = {
  getStudentList,
  addStudent,
  deleteStudent,
  updateStudent,
  getStudentLecturer,
  getStudentCourse,
};
