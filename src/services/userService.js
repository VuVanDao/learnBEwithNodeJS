const { where } = require("sequelize");
const db = require("../models/index.js");

const { raw } = require("body-parser");
var bcrypt = require("bcryptjs");
const e = require("express");
const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};

      let isExist = await checkUserEmail(email);
      if (isExist) {
        let user = await db.User.findOne({
          where: { email: email },
          attributes: ["email", "roleId", "password", "firstName", "lastName"],
          raw: true,
        });
        if (user) {
          let check = bcrypt.compareSync(password, user.password);
          if (check) {
            userData.errorCode = 0;
            userData.errmassage = "ok";
            delete user.password;
            userData.user = user;
          } else {
            userData.errorCode = 3;
            userData.errmassage = " Password is wrong, please try again!!!";
          }
        } else {
          userData.errorCode = 2;
          userData.errmassage = "User name is not exist, please try again!!!";
        }
      } else {
        userData.errorCode = 1;
        userData.errmassage =
          "User name or password is wrong, please try again!!!";
      }
      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};
let checkUserEmail = (useremail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: useremail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getAllUsers = async (userid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userid === "ALL") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      }
      if (userid && userid !== "ALL") {
        users = await db.User.findOne({
          where: { id: userid },
          attributes: {
            exclude: ["password"],
          },
        });
      }
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};

let createNewUserr = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //check email already exist
      let check = await checkUserEmail(data.email);
      if (check === true) {
        resolve({
          errorCode: 1,
          message: "email is already exist",
        });
      } else {
        let hashPasswordFromBcrypt = await hashUserPassword(data.password);
        await db.User.create({
          email: data.email,
          password: hashPasswordFromBcrypt,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phonenumber: data.phonenumber,
          gender: data.gender,
          roleId: data.roleId,
          positionId: data.position,
          image: data.avatar,
        });
        console.log(data);
        resolve({
          errorCode: 0,
          message: "OkkkK",
        });
      }
    } catch (error) {
      reject(error);
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
let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.roleId || !data.position || !data.gender) {
        resolve({
          errorCode: 2,
          message: "Missing id",
        });
      }
      const user = await db.User.findOne({
        where: { id: data.id },
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        user.phonenumber = data.phonenumber;
        user.gender = data.gender;
        user.roleId = data.roleId;
        user.positionId = data.position;
        if (data.avatar) {
          user.image = data.avatar;
        }
        await user.save(); //do config.js co raw:true(vua moi xoa xong)
        resolve({
          errorCode: 0,
          message: "update complete",
        });
      } else {
        resolve({
          errorCode: 1,
          message: "user not found!!!!",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
      });
      if (!user) {
        resolve({
          errorCode: 2,
          message: "the user doesnt exist",
        });
      } else {
        await user.destroy();
        resolve({
          errorCode: 0,
          message: "delete complete",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let GetAllCodeService = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!typeInput) {
        resolve({
          errCode: 1,
          message: "Missing query selecter",
        });
      } else {
        let res = {};
        let allcode = await db.Allcode.findAll({
          where: {
            type: typeInput,
          },
        });
        res.errCode = 0;
        res.message = allcode;
        resolve(res);
      }
    } catch (error) {
      reject(e);
    }
  });
};
module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
  createNewUserr: createNewUserr,
  deleteUser: deleteUser,
  updateUserData: updateUserData,
  GetAllCodeService: GetAllCodeService,
};
