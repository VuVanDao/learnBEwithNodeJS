const doctorservice = require("../services/doctorservice.js");
let GetTopDoctorHome = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 10;
  try {
    let response = await doctorservice.getTopDoctorHome(+limit);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server....",
    });
  }
};
const GetAllDoctors = async (req, res) => {
  try {
    let doctors = await doctorservice.GetAllDoctors();
    return res.status(200).json(doctors);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const postInforDoctors = async (req, res) => {
  try {
    let response = await doctorservice.saveDetailInforDoctor(req.body);
    console.log("body", req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
const getDetailDoctorById = async (req, res) => {
  try {
    if (!req.query.id) {
      return res.status(200).json({
        errCode: -1,
        errMessage: "Error from server",
      });
    }
    let infor = await doctorservice.getDetailDoctorById(req.query.id);
    return res.status(200).json(infor);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
bulkCrateSchedule = async (req, res) => {
  try {
    let infor = await doctorservice.bulkCreateSchedule(req.body);
    return res.status(200).json(infor);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
getScheduleByDate = async (req, res) => {
  try {
    let infor = await doctorservice.getScheduleByDate(
      req.query.doctorId,
      req.query.date
    );
    return res.status(200).json(infor);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getExtraInfoDoctorById = async (req, res) => {
  try {
    let infor = await doctorservice.getExtraInfoDoctorById(req.query.doctorId);
    return res.status(200).json(infor);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
module.exports = {
  GetTopDoctorHome: GetTopDoctorHome,
  GetAllDoctors: GetAllDoctors,
  postInforDoctors: postInforDoctors,
  getDetailDoctorById: getDetailDoctorById,
  bulkCrateSchedule: bulkCrateSchedule,
  getScheduleByDate: getScheduleByDate,
  getExtraInfoDoctorById: getExtraInfoDoctorById,
};
