module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('plans', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false, // valor não pode ser nulo
        autoIncrement: true, // Será preenchido automaticamente
        primaryKey: true
      },
      title: {
        // Nome do Plano
        type: Sequelize.STRING,
        allowNull: false
      },
      duration: {
        // Duração do Plano
        type: Sequelize.INTEGER,
        allowNull: false
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      // Regista data de criação e atualização
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('plans');
  }
};
