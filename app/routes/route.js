const express = require("express");
const students = require("../controllers/controller");

const router = express.Router();

router.route("/").get(students.findAll).post(students.createStudent).delete(students.deleteAll);

router.route("/:id").get(students.findOne).put(students.update).delete(students.delete);

module.exports = router;