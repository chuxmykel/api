export const up = (queryInterface, Sequelize) =>
  queryInterface.bulkInsert(
    'Books',
    [
      {
        title: 'Just JavaScript',
        author: 'Dan Abramov',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
      {
        title: 'Harry Potter',
        author: 'J.K. Rowling',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
      {
        title: 'Da Vinci Code',
        author: 'Dan Brown',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
    ],
    {},
  );

export const down = (queryInterface) => queryInterface.bulkDelete('Books', null, {});
