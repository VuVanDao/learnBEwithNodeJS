const { where } = require("sequelize");
const db = require("../models/index.js");
const { raw } = require("body-parser");

let createNewClinic = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.address ||
        !data.imageBase64 ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        await db.Clinic.create({
          name: data.name,
          address: data.address,
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
let getAllClinic = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Clinic.findAll();
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
let getDetailClinicById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        let data = await db.Clinic.findOne({
          where: {
            id: inputId,
          },
          attributes: [
            "descriptionHTML",
            "descriptionMarkdown",
            "address",
            "name",
          ],
          raw: true,
        });
        if (data) {
          let doctorClinic = [];
          doctorClinic = await db.Doctor_infor.findAll({
            where: {
              clinicId: inputId,
            },
            attributes: ["doctorId", "provinceId"],
            raw: true,
          });
          data.doctorClinic = doctorClinic;
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
  createNewClinic: createNewClinic,
  getAllClinic: getAllClinic,
  getDetailClinicById: getDetailClinicById,
};
