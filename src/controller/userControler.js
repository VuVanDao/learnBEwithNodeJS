const userService = require("../services/userService.js");

const handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      errmassage: "Missing input",
    });
  }
  let userData = await userService.handleUserLogin(email, password);
  return res.status(200).json({
    errCode: userData.errorCode,
    message: userData.errmassage,
    user: userData.user ? userData.user : {},
  });
};
let handleGetAllUsers = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing id",
      users: [],
    });
  }
  let users = await userService.getAllUsers(id);
  return res.status(200).json({
    errCode: 0,
    message: "OK",
    users: users,
  });
};
let handleCreateNewUsers = async (req, res) => {
  console.log("check api: ", req.body);
  let message = await userService.createNewUserr(req.body);
  return res.status(200).json(message);
};
let handleEditUsers = async (req, res) => {
  let data = req.body;
  let message = await userService.updateUserData(data);
  return res.status(200).json(message);
};
let handleDeleteUsers = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing id ",
    });
  }
  let message = await userService.deleteUser(req.body.id);
  return res.status(200).json(message);
};

let GetAllCode = async (req, res) => {
  try {
    let data = await userService.GetAllCodeService(req.query.type);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      message: "error from server",
    });
  }
};
module.exports = {
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
  handleCreateNewUsers: handleCreateNewUsers,
  handleEditUsers: handleEditUsers,
  handleDeleteUsers: handleDeleteUsers,
  GetAllCode: GetAllCode,
};
