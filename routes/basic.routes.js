const express = require("express");
const router = express.Router();
const authorize = require("../middleware/auth.middleware");

// Add routes
router.post(
  "/instructor/create-course",
  authorize("instructor", "admin"),
  (req, res) => {
    return res.status(200).json({ msg: "Course created (mock)" });
  }
);
router.get("/student/courses", authorize("student"), (req, res) => {
  return res.status(200).json({ courses: ["Course A", "Course B"] });
});
router.get("/admin/users", authorize("admin"), (req, res) => {
  return res.status(200).json({ users: "admin" });
});

module.exports = router;
