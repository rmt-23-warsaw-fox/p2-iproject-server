'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DoctorPatient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DoctorPatient.belongsTo(models.Patient, { foreignKey:'PatientId'} )
      DoctorPatient.belongsTo(models.Doctor, { foreignKey:'DoctorId'} )
    }
  }
  DoctorPatient.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    DoctorId: {type: DataTypes.INTEGER, allowNull: false},
    PatientId: {type: DataTypes.INTEGER, allowNull: false},
    status: {type: DataTypes.STRING, allowNull: false}
  }, {
    sequelize,
    modelName: 'DoctorPatient',
  });
  return DoctorPatient;
};