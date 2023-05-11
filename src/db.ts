import { Sequelize, DataTypes } from 'sequelize';
import { DB_User } from "./models/DB_User";
require("dotenv").config();

let database: Sequelize | undefined = undefined;

const createNewDbConnection = () => {
  const sequelize = new Sequelize(process.env.SEQUELIZE_CONNECTION!);

  return sequelize;
};

export const initDbSchema = async () => {
  if(database === undefined) {
    console.log('Establishing a new DB connection...');
    database = createNewDbConnection();
    console.log('new DB connection established');
  } else {
    console.log('DB Connection is already established... Checking if the connection is still valid...')
  }

  try {
    console.log('authenticating to DB...');
    await database.authenticate();
    console.log('connected to DB');
  } catch(err) {
    console.log(`DB connection is not valid: ${err}`);
    console.log('Attempting to establish new DB connection');
    database = createNewDbConnection();

    try {
      await database.authenticate();
      console.log('connected to DB after re-establishing connection');
    } catch(errInternal) {
      const errorMessage = `Unable to connect to DB: ${errInternal}`;
      console.log(errorMessage);
      throw new Error(errorMessage);
    }
  }

  DB_User.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
      email: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      address1: DataTypes.STRING,
      address2: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      zip: DataTypes.STRING,
      companyName: DataTypes.STRING,
      roles: DataTypes.JSONB,
      settings: DataTypes.JSONB,
      isActive: DataTypes.BOOLEAN,
      paymentStatus: DataTypes.STRING
  }, {
    tableName: 'User',
    sequelize: database,
  });

  return database;
};