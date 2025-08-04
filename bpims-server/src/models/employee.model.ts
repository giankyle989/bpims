import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";

const Employee = sequelize.define("Employee", {
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accountType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  contactNumber: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  photo: {
    allowNull: true,
    type: DataTypes.STRING,
  },
});

export default Employee;
