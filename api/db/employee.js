const nanoid = require('nanoid')

const createEmployeeModel = db => {
  return {
    findMany(filter) {
      return db.get('employeesList')
        .filter(filter)
        .orderBy(['createdAt'], ['desc'])
        .value()
    },

    findOne(filter) {
      return db.get('employeesList')
        .find(filter)
        .value()
    },

    create(employee) {
      const newEmployee = {id: nanoid(), createdAt: Date.now(), ...employee}
      
      db.get('employees')
        .push(newEmployee)
        .write()

      return newEmployee
    }
  }
}

module.exports = createEmployeeModel
