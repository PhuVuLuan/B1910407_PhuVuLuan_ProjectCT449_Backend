const express = require("express");
const studentManager = require("../controller/controller");
const router = express.Router();

router.route("/")
    .get(studentManager.findAll)
    .post(studentManager.create)
    .delete(studentManager.deleteAll);

router.route("/favorite")
    .get(studentManager.findAllFavorite);

router.route("/:id")
    .get(studentManager.findOne)
    .put(studentManager.update)
    .delete(studentManager.delete);

module.exports = router;