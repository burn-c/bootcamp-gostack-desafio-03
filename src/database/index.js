import Sequelize from 'sequelize';

import User from '../app/models/User';
import Students from '../app/models/Students';
import Plans from '../app/models/Plans';
import Registrations from '../app/models/Registrations';
import Checkins from '../app/models/Checkins';
import HelpOrders from '../app/models/HelpOrders';
import databaseConfig from '../config/database';

const models = [User, Students, Plans, Registrations, Checkins, HelpOrders];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
