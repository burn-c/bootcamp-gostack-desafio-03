import Sequelize, { Model } from 'sequelize';

class HelpOrders extends Model {
  static init(sequelize) {
    super.init(
      {
        student_id: Sequelize.INTEGER,
        question: Sequelize.STRING
      },
      {
        sequelize
      }
    );
    return this;
  }
}

export default HelpOrders;
