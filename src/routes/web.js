const express = require("express");

const HomeController = require("../controller/HomeController.js");
const userController = require("../controller/userControler.js");
const doctorController = require("../controller/doctorController.js");
const patientController = require("../controller/patientController.js");
const specialtyController = require("../controller/specialtyController.js");
let route = express.Router();

let initWebRoutes = (app) => {
  route.get("/", HomeController.getHomePage);
  route.get("/about", HomeController.getAboutPage);
  route.get("/crud", HomeController.getCRUD);
  route.post("/post-crud", HomeController.postCRUD);
  route.get("/get-crud", HomeController.displayCRUD);
  route.get("/edit-crud", HomeController.getEditCrud);
  route.post("/put-crud", HomeController.putCrud);
  route.get("/delete-crud", HomeController.deleteCrud);

  route.post("/api/login", userController.handleLogin);
  route.get("/api/get-all-user", userController.handleGetAllUsers);
  route.post("/api/create-new-user", userController.handleCreateNewUsers);
  route.put("/api/edit-user", userController.handleEditUsers);
  route.delete("/api/delete-user", userController.handleDeleteUsers);

  route.get("/api/allcode", userController.GetAllCode);
  route.get("/api/top-doctor-home", doctorController.GetTopDoctorHome);
  route.get("/api/get-all-doctors", doctorController.GetAllDoctors);
  route.post("/api/save-infor-doctors", doctorController.postInforDoctors);
  route.get(
    "/api/get-detail-doctor-by-id",
    doctorController.getDetailDoctorById
  );
  route.post("/api/bulk-create-schedule", doctorController.bulkCrateSchedule);
  route.get(
    "/api/get-schedule-doctor-by-date",
    doctorController.getScheduleByDate
  );
  route.get(
    "/api/get-extra-info-doctor-by-id",
    doctorController.getExtraInfoDoctorById
  );
  route.get(
    "/api/get-profile-doctor-by-id",
    doctorController.getProfileDoctorById
  );

  route.post(
    "/api/patient-book-appointment",
    patientController.postBookAppointment
  );

  route.post(
    "/api/verify-book-appointment",
    patientController.postVerifyBookAppointment
  );

  route.post(
    "/api/create-new-specialty",
    specialtyController.createNewSpecialty
  );

  return app.use("/", route);
};
module.exports = initWebRoutes;
