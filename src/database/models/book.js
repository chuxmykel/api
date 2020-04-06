export default (sequelize, DataTypes) => {
  const Book = sequelize.define(
    'Book',
    {
      title: DataTypes.STRING,
      author: DataTypes.STRING,
    },
    {},
  );
  Book.associate = () => {
    // associations can be defined here
  };
  return Book;
};
