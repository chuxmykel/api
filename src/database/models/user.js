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
  return User;
};