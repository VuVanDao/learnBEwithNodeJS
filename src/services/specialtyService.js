const { where } = require("sequelize");
const db = require("../models/index.js");
const { raw } = require("body-parser");

let createNewSpecialty = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.imageBase64 ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        await db.specialty.create({
          name: data.name,
          image: data.imageBase64,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown,
        });
        resolve({
          errCode: 0,
          errMessage: "create successful",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getAllSpecialty = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.specialty.findAll();
      if (data && data.length > 0) {
        data.map((item) => {
          item.image = new Buffer(item.image, "base64").toString("binary");
          return item;
        });
        resolve({
          errCode: 0,
          errMessage: "Done!!!!!!!",
          data: data,
        });
      } else {
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getDetailSpecialtyById = async (inputId, location) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId || !location) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        let data = await db.specialty.findOne({
          where: {
            id: inputId,
          },
          attributes: ["descriptionHTML", "descriptionMarkdown"],
          raw: true,
        });
        if (data) {
          let doctorSpecialty = [];
          if (location === "ALL") {
            doctorSpecialty = await db.Doctor_infor.findAll({
              where: {
                specialtyId: inputId,
              },
              attributes: ["doctorId", "provinceId"],
              raw: true,
            });
          } else {
            //find by location
            doctorSpecialty = await db.Doctor_infor.findAll({
              where: {
                specialtyId: inputId,
                provinceId: location,
              },
              attributes: ["doctorId", "provinceId"],
              raw: true,
            });
          }

          data.doctorSpecialty = doctorSpecialty;
        } else {
          data = {};
        }
        resolve({
          errMessage: "ok",
          errCode: 0,
          data: data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  createNewSpecialty: createNewSpecialty,
  getAllSpecialty: getAllSpecialty,
  getDetailSpecialtyById: getDetailSpecialtyById,
};
