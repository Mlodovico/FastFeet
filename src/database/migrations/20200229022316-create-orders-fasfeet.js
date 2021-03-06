'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('orders', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      recipient_id: {
        type: Sequelize.INTEGER,
        references: { model: 'recipients', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      deliveryman_id: {
        type: Sequelize.INTEGER,
        references: { model: 'deliverys', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      signature_id: {
        type: Sequelize.INTEGER,
      },
      product: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      canceled_at: {
        type: Sequelize.DATE
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('orders');
  }
};
