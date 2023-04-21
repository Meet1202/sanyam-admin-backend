const User = require("../models/user");
const { Op } = require("sequelize");

const createUser = (req, res, next) => {
  const {
    first_name,
    surname,
    last_name,
    email,
    password,
    member_id,
    user_type,
    address,
    mobile_number,
    whatsapp_number,
    dob,
    joining_date,
    monthly_amount,
    added_by,
    role_id,
    occupation,
    status,
    reference
  } = req.body;
  if (!(email && password)) {
    res.status(400).send({ message: "All fields are required" });
  }
  {
    User.findOne({
      where: {
        email,
      },
    }).then((user) => {
      if (user) {
        res.status(400).send({ message: "Email already exists" });
      } else {
        // create new user
        User.create({
          first_name,
          surname,
          last_name,
          email,
          password,
          member_id,
          user_type,
          address,
          mobile_number,
          whatsapp_number,
          dob,
          joining_date,
          monthly_amount,
          added_by,
          role_id,
          occupation,
          status,
          reference
        })
          .then((user) => {
            let id = 0;
            if (user.dataValues.id < 10) {
              id = "SG-0" + user.dataValues.id;
            } else {
              id = "SG-" + user.dataValues.id;
            }
            return user.update({ member_id: id });
          })
          .then((user) => {
            res
              .status(200)
              .send({ message: "Registered successfully!", data: user });
          })
          .catch((err) => {
            res.status(500).send({ message: err });
          });
      }
    });
  }
};

const loginUser = async (req, res, next) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      return res.status(400).send({ message: "All fields are required" });
    }
    // Validate if user exist in our database
    const user = await User.findOne({ where: { email } });
    if (user && email === user.email && password === user.password) {
      return res.status(200).send({
        message: "success",
        data: {
          id: user.id,
          first_name: user.first_name,
          surname: user.surname,
          last_name: user.last_name,
          email: user.email,
          member_id: user.member_id,
          user_type: user.user_type,
          address: user.address,
          mobile_number: user.mobile_number,
          whatsapp_number: user.whatsapp_number,
          dob:user.dob,
          joining_date: user.joining_date,
          monthly_amount: user.monthly_amount,
          added_by: user.added_by,
          role_id: user.role_id,
          occupation: user.occupation,
          status: user.status,
          reference: user.reference
        },
      });
    } else {
      return res.status(400).send({ message: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
};

const updateUser = (req, res, next) => {
  console.log(req.body);
  const {
    first_name,
    surname,
    last_name,
    email,
    password,
    member_id,
    user_type,
    address,
    mobile_number,
    whatsapp_number,
    dob,
    joining_date,
    monthly_amount,
    added_by,
    role_id,
    occupation,
    modified_by,
    status,
    reference
  } = req.body;

  User.findOne({
    where: { id: req.params.userId },
  }).then((user) => {
    if (user) {
      return user
        .update({
          first_name,
          surname,
          last_name,
          email,
          password,
          member_id,
          user_type,
          address,
          mobile_number,
          whatsapp_number,
          dob,
          joining_date,
          monthly_amount,
          added_by,
          role_id,
          occupation,
          modified_by,
          modifiedAt: new Date().toISOString(),
          status,
          reference
        })
        .then((user) => {
          res
            .status(200)
            .send({ message: "User updated successfully!", data: user });
        })
        .catch((err) => {
          console.log("in error block");
          res.status(500).send({ message: err });
        });
    } else {
      console.log("user not found.....");
      res.status(404).send({ message: "User not found" });
    }
  });
};

const updateUserStatus = (req, res, next) => {
  const { modified_by, status } = req.body;
  User.findOne({
    where: { id: req.params.userId },
  }).then((user) => {
    if (user) {
      return user
        .update({
          modified_by,
          modifiedAt: new Date().toISOString(),
          status,
        })
        .then((user) => {
          res
            .status(200)
            .send({ message: "Status updated successfully!", data: user });
        })
        .catch((err) => {
          res.status(500).send({ message: err });
        });
    } else {
      console.log("user not found.....");
      res.status(404).send({ message: "User not found" });
    }
  });
};

const deleteUser = (req, res, next) => {
  const userId = req.params.userId;
  User.destroy({
    where: { id: userId },
  })
    .then((user) => {
      res.status(200).send({ message: "User deleted successfully." });
    })
    .catch((error) => {
      res.status(200).send({ message: "User can't deleted.", error });
    });
};

const getAllUsers = (req, res, next) => {
  User.findAll()
    .then((users) => {
      res.status(200).send({ message: "success.", data: users });
    })
    .catch((error) => {
      res.status(404).send({ message: "No users found in data base." });
    });
};

const getAllUserById = (req, res, next) => {
  console.log(req.params.volunteerId);
  if (req.params.volunteerId) {
    let userId = req.params.volunteerId;
    User.findAll({
      where: {
        added_by: userId,
      },
    })
      .then((users) => {
        res.status(200).send({ message: "success.", data: users });
      })
      .catch((error) => {
        res.status(404).send({ message: "No users found in data base." });
      });
  } else {
    commonService.sendError("Please provide user id.", next);
  }
};

const getUserById = (req, res, next) => {
  if (req.params.userId) {
    let userId = req.params.userId;
    User.findOne({
      where: {
        id: userId,
      },
    })
      .then((users) => {
        res.status(200).send({ message: "success.", data: users });
      })
      .catch((error) => {
        res.status(404).send({ message: "No users found in data base." });
      });
  } else {
    commonService.sendError("Please provide user id.", next);
  }
};

const searchUser = async (req, res, next) => {
  try {
    let allUsers;
    const searchTerm = req.body.searchTerm;
    if (req.body.searchBy === "NAME") {
      allUsers = await User.findAll({
        where: {
          [Op.or]: [
            {
              first_name: {
                [Op.like]: `%${searchTerm}%`,
              },
            },
            {
              last_name: {
                [Op.like]: `%${searchTerm}%`,
              },
            },
            {
              surname: {
                [Op.like]: `%${searchTerm}%`,
              },
            },
          ],
        },
      });
    } else if (req.body.searchBy === "EMAIL") {
      allUsers = await User.findAll({
        where: {
          [Op.or]: [
            {
              email: {
                [Op.like]: `%${searchTerm}%`,
              },
            },
          ],
        },
      });
    } else if (req.body.searchBy === "NUMBER") {
      allUsers = await User.findAll({
        where: {
          [Op.or]: [
            {
              mobile_number: {
                [Op.like]: `%${searchTerm}%`,
              },
            },
            {
              whatsapp_number: {
                [Op.like]: `%${searchTerm}%`,
              },
            },
          ],
        },
      });
    }
    if (allUsers) {
      return res.status(200).send({ message: "success.", data: allUsers });
    } else {
      return res
        .status(404)
        .send({ message: "Searched users not found in data base." });
    }
  } catch (e) {
    return res
      .status(404)
      .send({ message: "Searched users not found in data base." });
  }
};

module.exports = {
  getAllUserById: getAllUserById,
  getUserById: getUserById,
  getAllUsers: getAllUsers,
  createUser: createUser,
  loginUser: loginUser,
  updateUser: updateUser,
  updateUserStatus: updateUserStatus,
  deleteUser: deleteUser,
  searchUser: searchUser,
  // logOutUser: logOutUser,
};
