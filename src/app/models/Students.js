import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Students extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        idade: Sequelize.INTEGER,
        peso: Sequelize.FLOAT,
        altura: Sequelize.FLOAT,
        provider: Sequelize.BOOLEAN
      },
      {
        sequelize
      }
    );

    this.addHook('beforeSave', async students => {
      if (students.password) {
        // eslint-disable-next-line no-param-reassign
        students.password_hash = await bcrypt.hash(students.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default Students;
