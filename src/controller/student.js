const Student = require("../model/Student");
const bcrypt = require("bcrypt");
const {
  validateRequestFields,
  okJsonRequest,
  notOkRequest,
} = require("../utility/request");

async function addStudent(req, res) {
  const validate = await validateRequestFields(req, [
    "name",
    "email",
    "dob",
    "class",
  ]);
  if (validate !== "") {
    return notOkRequest(res, { msg: "missing fields" + validate });
  }

  const data = await req.body;
  try {
    let password = await bcrypt
      .genSalt(parseInt(process.env.PASS_SALT_ROUND))
      .then((salt) => {
        return bcrypt.hash(data.password, salt);
      });

    const new_student = new Student({
      name: data.name,
      email: data.email,
      dob: data.dob,
      class: data.class,
      password: password,
    });

    await new_student.save();
  } catch (e) {
    return notOkRequest(res, {
      msg: "Unable to add user",
      err_data: e.message,
    });
  }
  return okJsonRequest(res, { msg: "User Added Successfully!" });
}

async function getStudent(req, res) {
  if (!req.params.id) {
    return notOkRequest(res, { msg: "please add student id in url!" });
  }

  try {
    const student = await Student.findById(req.params.id);
    if (student) {
      return okJsonRequest(res, {
        msg: "student found",
        email: student.email,
        name: student.name,
        dob: student.dob,
        class: student.class,
        id: student.id,
      });
    }
    return notOkRequest(res, { msg: "unable to find id" });
  } catch (e) {
    return notOkRequest(res, {
      msg: "Please pass correct id",
      err_data: e.message,
    });
  }
}

async function getAllStudent(req, res) {
  const students_from_db = await Student.find({});
  let students = students_from_db.map((student) => {
    return {
      id: student.id,
      email: student.email,
      name: student.name,
      class: student.class,
      dob: student.dob,
    };
  });

  return okJsonRequest(res, {
    msg: "succesfully got all students",
    students: students,
  });
}

async function updateStudent(req, res) {
  if (!req.params.id) {
    return notOkRequest(res, { msg: "please add student id in url!" });
  }

  const data = req.body;

  try {
    const student = await Student.findById(req.params.id);
    if ("email" in data) {
      student.email = data.email;
    }
    if ("class" in data) {
      student.class = data.class;
    }
    if("name" in data){
      student.name = data.name;
    }
    if("dob" in data){
      student.dob = data.dob;
    }
    if("password" in data){
      student.password = await bcrypt
      .genSalt(parseInt(process.env.PASS_SALT_ROUND))
      .then((salt) => {
        return bcrypt.hash(data.password, salt);
      });
    }
    await student.save();
    return okJsonRequest(res, { msg: "Succefully updated user!"});
  } catch (e) {
    return notOkRequest(res, { msg: "Something wrong!", "err_data": e.message });
  }
}

async function deleteStudent(req, res) {
  if (!req.params.id) {
    return notOkRequest(res, { msg: "please add student id in url!" });
  }
  const id = req.params.id;

  try {
    const student = await Student.findByIdAndDelete(id);
  } catch (e) {
    return notOkRequest(res, {
      msg: "unable to remove student!",
      err_data: e.message,
    });
  }
  return okJsonRequest(res, { msg: "succesfully remove student" });
}


// for creating test user
async function init(req, res){
  const search_student =  await Student.find({email:"test@email.com"});
  if(search_student.length == 0){
    let password = await bcrypt
      .genSalt(parseInt(process.env.PASS_SALT_ROUND))
      .then((salt) => {
        return bcrypt.hash("test", salt);
      });
    const new_student = new Student({
      name: "test",
      email: "test@email.com",
      dob: "2000-04-02",
      class: "12",
      password: password,
    });
    await new_student.save();
    return okJsonRequest(res, {"msg":"Initalize complete"})
  }
  return notOkRequest(res, {"msg":"Aleardy Initalize!"})
}

module.exports = {
  addStudent,
  getStudent,
  getAllStudent,
  deleteStudent,
  updateStudent,
  init
};
