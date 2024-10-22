const specialtyService = require("../services/specialtyService.js");

let createNewSpecialty = async (req, res) => {
  try {
    let info = await specialtyService.createNewSpecialty(req.body);
    return res.status(200).json(info);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getAllSpecialty = async (req, res) => {
  try {
    let info = await specialtyService.getAllSpecialty();
    return res.status(200).json(info);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
module.exports = {
  createNewSpecialty: createNewSpecialty,
  getAllSpecialty: getAllSpecialty,
};
