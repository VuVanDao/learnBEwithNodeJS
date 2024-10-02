const Crudservice = require("../services/Crudservice.js");
const db = require("../models/index.js");

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    console.log(data);
    return res.render("HomePage", { data: JSON.stringify(data) });
  } catch (e) {
    console.log(e);
  }
};
let getAboutPage = (req, res) => {
  return res.render("Aboutpage");
};
let getCRUD = (req, res) => {
  return res.render("CrudPage");
};
let postCRUD = async (req, res) => {
  let mess = await Crudservice.createNewUser(req.body);
  return res.send("DONEEEE");
};
let displayCRUD = async (req, res) => {
  let data = await Crudservice.getAllUser();
  return res.render("displayCRUD", { data: data });
};
let getEditCrud = async (req, res) => {
  let id = req.query.id;
  if (id) {
    let userData = await Crudservice.getInfoUserById(id);
    console.log(userData);
    return res.render(`editCrud`, { userData: userData });
  } else {
    return res.send(`User not found`);
  }
};
let putCrud = async (req, res) => {
  let data = req.body;
  let alluser = await Crudservice.updateUserData(data);
  return res.render(`displayCrud`, { data: alluser });
};
let deleteCrud = async (req, res) => {
  let id = req.query.id;
  if (id) {
    let alluser = await Crudservice.deleteUserById(id);
    return res.render(`displayCrud`, { data: alluser });
  } else {
    return res.send("Not found this user");
  }
};
module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displayCRUD: displayCRUD,
  getEditCrud: getEditCrud,
  putCrud: putCrud,
  deleteCrud: deleteCrud,
};
