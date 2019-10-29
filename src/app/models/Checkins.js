import Sequelize, { Model } from 'sequelize';

class Checkins extends Model {
  static init(sequelize) {
    super.init(
      {
        student_id: Sequelize.STRING
      },
      {
        sequelize
      }
    );
    return this;
  }
}

export default Checkins;
