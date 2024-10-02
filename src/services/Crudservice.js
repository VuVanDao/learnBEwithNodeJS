var bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const db = require("../models/index.js");
const { where } = require("sequelize");
const { raw } = require("body-parser");

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phonenumber: data.phonenumber,
        gender: data.gender == "1" ? true : false,
        roleId: data.roleId,
      });
      // console.log(data);
      resolve("okkkkkkkkk");
    } catch (error) {
      reject(e);
    }
  });
};
let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hash = await bcrypt.hashSync(password, salt);
      resolve(hash);
    } catch (e) {
      console.log(e);
    }
  });
};
let getAllUser = async () => {
  return new Promise((resolve, reject) => {
    try {
      let user = db.User.findAll({
        raw: true,
      });
      resolve(user);
    } catch (error) {
      console.log(error);
    }
  });
};
let getInfoUserById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: id },
        raw: true,
      });
      if (user) {
        resolve(user);
      } else {
        resolve({});
      }
    } catch (error) {
      reject(e);
    }
  });
};
let updateUserData = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { id: data.id },
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        user.phonenumber = data.phonenumber;
        user.gender = data.gender;
        await user.save(); //do config.js co raw:true(vua moi xoa xong)
        let allUser = await db.User.findAll();
        resolve(allUser);
      } else {
        resolve();
      }
    } catch (error) {
      reject(error);
    }
  });
};
let deleteUserById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: id },
      });

      if (user) {
        await user.destroy();
      }
      let allUser = await db.User.findAll();
      resolve(allUser);
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  createNewUser: createNewUser,
  getAllUser: getAllUser,
  getInfoUserById: getInfoUserById,
  updateUserData: updateUserData,
  deleteUserById: deleteUserById,
};
