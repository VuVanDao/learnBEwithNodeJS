const clinicService = require("../services/clinicService.js");

let createNewClinic = async (req, res) => {
  try {
    let info = await clinicService.createNewClinic(req.body);
    return res.status(200).json(info);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
module.exports = {
  createNewClinic: createNewClinic,
};
