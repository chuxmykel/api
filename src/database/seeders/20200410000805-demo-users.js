import bcrypt from 'bcrypt';
import faker from 'faker';

const saltRounds = 10;

export const up = (queryInterface, Sequelize) =>
  queryInterface.bulkInsert(
    'Users',
    [
      {
        firstname: 'Chukwudi',
        lastname: 'Ngwobia',
        email: 'coolchuks007@gmail.com',
        password: bcrypt.hashSync('P@ssword123', saltRounds),
        isAdmin: true,
        isActive: true,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
      {
        firstname: 'trial',
        lastname: 'account',
        email: '002@test.com',
        password: bcrypt.hashSync('P@ssword123', saltRounds),
        isAdmin: false,
        isActive: true,
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW'),
      },
      ...(() => {
        const arr = [];
        for (let i = 0; i < 2; i += 1) {
          arr.push({
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            password: bcrypt.hashSync('P@ssword123', saltRounds),
            isAdmin: false,
            isActive: Math.floor(Math.random() * 5) >= 3,
            createdAt: Sequelize.fn('NOW'),
            updatedAt: Sequelize.fn('NOW'),
          });
        }
        return arr;
      })(),
    ],
    {},
  );

export const down = (queryInterface) => queryInterface.bulkDelete('Users', null, {});
