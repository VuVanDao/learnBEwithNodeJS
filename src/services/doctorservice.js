const { raw } = require("body-parser");
const db = require("../models/index.js");
const { where, Model } = require("sequelize");
require("dotenv").config();
const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;
const _ = require("lodash");
let getTopDoctorHome = (limitInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        limit: limitInput,
        order: [["createdAt", "DESC"]],
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.Allcode,
            as: "positionData",
            attributes: ["valueEn", "valueVi"],
          },
          {
            model: db.Allcode,
            as: "genderData",
            attributes: ["valueEn", "valueVi"],
          },
        ],
        where: { roleId: "R2" },
        raw: true,
        nest: true,
      });
      resolve({
        errCode: 0,
        data: users,
      });
    } catch (error) {
      reject(error);
    }
  });
};
let GetAllDoctors = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctors = await db.User.findAll({
        where: { roleId: "R2" },
        attributes: {
          exclude: ["password", "image"],
        },
      });
      resolve({
        errCode: 0,
        data: doctors,
      });
    } catch (error) {
      reject(error);
    }
  });
};
const saveDetailInforDoctor = (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputData.doctorId || !inputData.action) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        if (inputData.action === "CREATE") {
          await db.Markdown.create({
            contentHTML: inputData.contentHTML,
            contentMarkdown: inputData.contentMarkdown,
            description: inputData.description,
            doctorId: inputData.doctorId,
          });
        } else if (inputData.action === "EDIT") {
          let doctorMarkdown = await db.Markdown.findOne({
            where: {
              doctorId: inputData.doctorId,
            },
            raw: false,
          });
          if (doctorMarkdown) {
            doctorMarkdown.contentHTML = inputData.contentHTML;
            doctorMarkdown.contentMarkdown = inputData.contentMarkdown;
            doctorMarkdown.description = inputData.description;
            doctorMarkdown.updateAt = new Date();
            console.log("doctorMarkdown:", doctorMarkdown);
            await doctorMarkdown.save();
          }
        }
        resolve({
          errCode: 0,
          errMessage: "save infor doctor success!",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const getDetailDoctorById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        let data = await db.User.findOne({
          where: {
            id: inputId,
          },
          include: [
            {
              model: db.Markdown,
              attributes: ["description", "contentHTML", "contentMarkdown"],
            },
            {
              model: db.Allcode,
              as: "positionData",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          attributes: {
            exclude: ["password"],
          },
          raw: false,
          nest: true,
        });
        if (data && data.image) {
          data.image = new Buffer(data.image, "base64").toString("binary");
        }
        if (!data) data = {};
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
bulkCreateSchedule = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.arrSchedule || !data.doctorId || !data.formatDate) {
        resolve({
          errCode: 1,
          errMessage: "Missing required data",
        });
      } else {
        let schedule = data.arrSchedule;
        if (schedule && schedule.length > 0) {
          schedule = schedule.map((item) => {
            item.maxNumber = MAX_NUMBER_SCHEDULE;
            return item;
          });
        }

        let existing = await db.schedule.findAll({
          where: {
            doctorId: data.doctorId,
            date: data.formatDate,
          },
          attributes: ["timeType", "date", "doctorId", "maxNumber"],
          raw: true,
        });
        if (existing && existing.length > 0) {
          existing = existing.map((item) => {
            item.date = new Date(item.date).getTime();
            return item;
          });
        }
        let toCreate = _.differenceWith(schedule, existing, (a, b) => {
          return a.timeType === b.timeType && a.date === b.date;
        });
        if (toCreate && toCreate.length > 0) {
          await db.schedule.bulkCreate(toCreate);
        }

        resolve({
          errCode: 0,
          errMessage: "OK",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
getScheduleByDate = (doctorId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(doctorId, date);
      if (!doctorId || !date) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let dataSchedule = await db.schedule.findAll({
          where: {
            doctorId: doctorId,
            date: date,
          },
          raw: false,
        });
        if (!dataSchedule) {
          dataSchedule = [];
        }
        resolve({
          errCode: 0,
          data: dataSchedule,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  getTopDoctorHome: getTopDoctorHome,
  GetAllDoctors: GetAllDoctors,
  saveDetailInforDoctor: saveDetailInforDoctor,
  getDetailDoctorById: getDetailDoctorById,
  bulkCreateSchedule: bulkCreateSchedule,
  getScheduleByDate: getScheduleByDate,
};
