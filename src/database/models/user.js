/* eslint-disable no-param-reassign */
import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      isAdmin: DataTypes.STRING,
      isActive: DataTypes.STRING,
    },
    {},
  );
  // User.associate = function (models) {
  //   // associations can be defined here
  // };

  User.beforeCreate(async (user) => {
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    user.password = hashedPassword;
  });
  return User;
};
