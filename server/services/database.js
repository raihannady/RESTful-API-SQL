const _ = require("lodash");
const MySQL = require("promise-mysql2");

const fileName = "server/services/database.js";
const TABLE = "course_dummy";

const ConnectionPool = MySQL.createPool({
  host: process.env.MYSQL_CONFIG_HOST || "localhost",
  user: process.env.MYSQL_CONFIG_USER || "root",
  password: process.env.MYSQL_CONFIG_PASSWORD || "",
  database: process.env.MYSQL_CONFIG_DATABASE || "test",
  port: process.env.MYSQL_CONFIG_PORT || "3306",
  connectionLimit: process.env.MYSQL_CONFIG_CONNECTION_LIMIT || "1",
});

/*
 * PRIVATE FUNCTION
 */
const __constructQueryResult = (query) => {
  const result = [];
  if (!_.isEmpty(query[0])) {
    query[0].forEach((item) => {
      const key = Object.keys(item);

      // Reconstruct query result
      const object = {};
      key.forEach((data) => {
        object[data] = item[data];
      });

      result.push(object);
    });
  }

  return result;
};

/*
 * PUBLIC FUNCTION
 */

const getStudentData = async () => {
  try {
    const timeStart = process.hrtime();
    const poolConnection = await ConnectionPool.getConnection();
    const query = await poolConnection.query(`SELECT * FROM student;`);
    await poolConnection.connection.release();
    const result = __constructQueryResult(query);
    const message = "Data retrieved successfully";

    const timeDiff = process.hrtime(timeStart);
    const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);

    console.log([fileName, "Get Student Data", "INFO"], {
      message: { timeTaken },
    });

    return Promise.resolve({ message, result });
  } catch (err) {
    console.log([fileName, "Get Student Data", "ERROR"], {
      message: { info: `${err}` },
    });
    return Promise.resolve([]);
  }
};

const studentLecturer = async () => {
  try {
    const timeStart = process.hrtime();
    const poolConnection = await ConnectionPool.getConnection();
    const query = await poolConnection.query(
      `SELECT * FROM student INNER JOIN lecturer ON student.lecturer_id = lecturer.lecturer_id;`
    );
    await poolConnection.connection.release();
    const result = __constructQueryResult(query);

    const timeDiff = process.hrtime(timeStart);
    const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);
    const message = "Data retrieved successfully";

    console.log([fileName, "Get Student Lecturer", "INFO"], {
      message: { timeTaken },
    });

    return Promise.resolve({ message, result });
  } catch (err) {
    console.log([fileName, "Get Student Lecturer", "ERROR"], {
      message: { info: `${err}` },
    });
    return Promise.resolve([]);
  }
};

const studentCourse = async () => {
  try {
    const timeStart = process.hrtime();
    const poolConnection = await ConnectionPool.getConnection();
    const query = await poolConnection.query(
      `SELECT * FROM studentcourse 
      INNER JOIN course ON studentcourse.course_id = course.course_id
      INNER JOIN student ON studentcourse.student_id = student.student_id ;`
    );
    await poolConnection.connection.release();
    const result = __constructQueryResult(query);
    const message = "Data retrieved successfully";

    const timeDiff = process.hrtime(timeStart);
    const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);

    console.log([fileName, "Get Student Course", "INFO"], {
      message: { timeTaken },
    });

    return Promise.resolve({ message, result });
  } catch (err) {
    console.log([fileName, "Get Student Course", "ERROR"], {
      message: { info: `${err}` },
    });
    return Promise.resolve([]);
  }
};

const addStudentData = async (dataObject) => {
  const { lecturer_id, fullname, nickname } = dataObject;

  try {
    const timeStart = process.hrtime();
    const poolConnection = await ConnectionPool.getConnection();
    await poolConnection.query(
      `INSERT INTO student (fullname, nickname, lecturer_id) VALUES ('${fullname}', '${nickname}', '${lecturer_id}');`
    );
    const result = { fullname, nickname, lecturer_id };
    const message = "Data Added successfully";

    const timeDiff = process.hrtime(timeStart);
    const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);

    console.log([fileName, "Add Data", "INFO"], {
      message: { timeTaken },
    });

    return Promise.resolve({ message, result });
  } catch (err) {
    console.log([fileName, "Add Data", "ERROR"], {
      message: { info: `${err}` },
    });
    return Promise.resolve(false);
  }
};

const updateStudentData = async (dataObject) => {
  const { student_id, fullname, nickname, lecturer_id } = dataObject;
  console.log(lecturer_id);

  try {
    const timeStart = process.hrtime();
    const poolConnection = await ConnectionPool.getConnection();
    await poolConnection.query(
      `UPDATE student SET fullname = "${fullname}", nickname = "${nickname}", lecturer_id = "${lecturer_id}" WHERE student_id = ${student_id};`
    );

    await poolConnection.connection.release();
    const result = { fullname, nickname, lecturer_id };
    const message = "Data Updated successfully";

    const timeDiff = process.hrtime(timeStart);
    const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);

    console.log([fileName, "Update Data", "INFO"], {
      message: { timeTaken },
    });

    return Promise.resolve({
      message,
      result,
    });
  } catch (err) {
    console.log([fileName, "Update Data", "ERROR"], {
      message: { info: `${err}` },
    });
    return Promise.resolve(false);
  }
};
const deleteStudentData = async (dataObject) => {
  const { student_id } = dataObject;

  try {
    const timeStart = process.hrtime();
    const poolConnection = await ConnectionPool.getConnection();
    await poolConnection.query(
      `DELETE FROM student WHERE student_id = ${student_id};`
    );

    await poolConnection.connection.release();
    const result = { fullname, nickname, lecturer_id };
    const message = "Data Deleted successfully";

    const timeDiff = process.hrtime(timeStart);
    const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);

    console.log([fileName, "Delete Data", "INFO"], {
      message: { timeTaken },
    });

    return Promise.resolve({
      result,
      message,
    });
  } catch (err) {
    console.log([fileName, "Delete Data", "ERROR"], {
      message: { info: `${err}` },
    });
    return Promise.resolve(false);
  }
};

// const getDataByName = async (dataObject) => {
//   const { name } = dataObject;

//   try {
//     const timeStart = process.hrtime();
//     const poolConnection = await ConnectionPool.getConnection();
//     const query = await poolConnection.query(
//       `SELECT * FROM ${TABLE} WHERE name LIKE '%${name}%';`
//     );
//     await poolConnection.connection.release();
//     const result = __constructQueryResult(query);

//     const timeDiff = process.hrtime(timeStart);
//     const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);

//     console.log([fileName, "Get Data By Name", "INFO"], {
//       message: { timeTaken },
//     });

//     return Promise.resolve(result);
//   } catch (err) {
//     console.log([fileName, "Get Data By Name", "ERROR"], {
//       message: { info: `${err}` },
//     });
//     return Promise.resolve([]);
//   }
// };

module.exports = {
  getStudentData,
  addStudentData,
  updateStudentData,
  deleteStudentData,
  studentLecturer,
  studentCourse,
};
