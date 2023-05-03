const StudentsService = require("../services/service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

// tao va luu mot sinh vien
exports.createStudent = async (req, res, next) => {
  if (!req.body?.name || !req.body?.mssv) {
    return next(new ApiError(400, "tên hoặc mã số sinh viên không thể rỗng"));
  }

  try {
    const studentService = new StudentsService(MongoDB.client);
    const document = await studentService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(new ApiError(500, "An error occured " + req.body.email));
  }
};

exports.findAll = async (req, res, next) => {
  let documents = [];
  try {
    const studentService = new StudentsService(MongoDB.client);
    const { name } = req.query;
    if (name) {
      documents = await studentService.findByName(name);
    } else {
      documents = await studentService.find({});
    }
  } catch (error) {
    return next(new ApiError(500, "An error occured "));
  }
  return res.send(documents);
};

exports.findOne = async (req, res, next) => {
  try {
    const studentService = new StudentsService(MongoDB.client);
    const document = await studentService.findById(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy sinh viên"));
    }
    return res.send(document);
  } catch (error) {
    return next(new ApiError(500, `Error retrieving contact id: ${req.params.id}`));
  }

};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(404, "Dữ liệu không thể trống"));
  }

  try {
    const studentService = new StudentsService(MongoDB.client);
    const document = await studentService.update(req.params.id, req.body);
    return res.send("cập nhật thành công");
  } catch (error) {
    return next(new ApiError(500, `Error updating student id: ${req.params.id}`));
  }
};

exports.delete = async (req, res, next) => {
  try {
    const studentService = new StudentsService(MongoDB.client);
    const document = await studentService.delete(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy sinh viên "));
    }
    res.send({ message: "xóa thành công" });
  } catch (error) {
    return next(new ApiError(500, `Error delete student id: ${req.params.id}`));
  }
};

exports.deleteAll = async (req, res, next) => {
  try {
    const studentService = new StudentsService(MongoDB.client);
    const deleteCount = await studentService.deleteAll();
    return res.send({
      message: `delete all ${deleteCount} students.`,
    });
  } catch (error) {
    return next(new ApiError(500, `Error delete all students.`));
  }
};
