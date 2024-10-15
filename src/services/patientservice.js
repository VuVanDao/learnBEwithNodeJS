const { raw } = require("body-parser");
const db = require("../models/index.js");
const { where, Model } = require("sequelize");
const emailService = require("../services/emailService.js");
require("dotenv").config();
const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;
const _ = require("lodash");
let postBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.email ||
        !data.date ||
        !data.doctorId ||
        !data.timeType ||
        !data.fullName
      ) {
        console.log("check", data);

        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        await emailService.sendSimpleEMail({
          receiverEmail: data.email,
          patientName: data.fullName,
          time: data.timeString,
          doctorName: data.doctorName,
          language: data.language,
          redirectLink: "https://www.facebook.com/",
        });
        //update
        let user = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.email,
            roleId: data.roleId,
          },
        });
        //booking
        if (user && user[0]) {
          await db.Booking.findOrCreate({
            where: { patientId: user[0].id },
            defaults: {
              statusId: "S1",
              doctorId: data.doctorId,
              patientId: user[0].id,
              date: data.date,
              timeType: data.timeType,
            },
          });
        }
        resolve({
          errCode: 0,
          errMessage: "Booking complete",
        });
      }
    } catch (error) {
      console.log("e:", error);

      reject(error);
    }
  });
};
module.exports = {
  postBookAppointment: postBookAppointment,
};
