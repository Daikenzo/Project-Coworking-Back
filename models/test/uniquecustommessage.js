const { Sequelize, DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    const Promotion_Redemptions = sequelize.define(
      'Promotion_Redemptions',
      {
        userId: {
          type: DataTypes.INTEGER,
          references: {
            model: 'User',
            key: 'id',
            as: 'userId'
          },
          validate: {
            // Unique Constraint alt function
            async isRedemptionUniqueToUser(userId) {
              const redemptions = await sequelize.models.Promotion_Redemptions.findAll(
                {
                  where: {
                    userId
                  }
                }
              );
              if (redemptions.length > 0)
                throw new Error(
                  'User may only redeem a promotion once'
                );
            }
          }
        },
        promotionId: {
          type: DataTypes.INTEGER,
          references: {
            model: 'Promotion',
            key: 'id',
            as: 'promotionId'
          }
        }
      },
      {}
    );
    Promotion_Redemptions.associate = function(models) {
      // associations can be defined here
      Promotion_Redemptions.belongsTo(models.User, {
        foreignKey: 'userId'
      });
      Promotion_Redemptions.belongsTo(models.Promotion, {
        foreignKey: 'promotionId'
      });
    };
    return Promotion_Redemptions;
  };