import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Plans extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        duration: Sequelize.INTEGER,
        price: Sequelize.FLOAT,
        canceled_at: Sequelize.DATE
      },
      {
        sequelize
      }
    );
    this.addHook('beforeSave', async plans => {
      if (plans.password) {
        // eslint-disable-next-line no-param-reassign
        plans.password_hash = await bcrypt.hash(plans.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default Plans;
