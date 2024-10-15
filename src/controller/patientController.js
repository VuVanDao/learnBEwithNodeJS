const patientservice = require("../services/patientservice.js");

let postBookAppointment = async (req, res) => {
  try {
    let info = await patientservice.postBookAppointment(req.body);
    return res.status(200).json(info);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
module.exports = {
  postBookAppointment: postBookAppointment,
};
