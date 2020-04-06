import 'dotenv/config';

export const development = {
  use_env_variable: 'DATABASE_URL',
  logging: false,
  dialect: 'postgres',
};

export const test = {
  use_env_variable: 'TEST_DATABASE_URL',
  logging: false,
  dialect: 'postgres',
};

export const production = {
  use_env_variable: 'DATABASE_URL',
  logging: false,
  dialect: 'postgres',
};
