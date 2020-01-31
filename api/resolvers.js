const nanoid = require('nanoid')
module.exports = {
  Query: {
    employees(parent,args, {db}) {
        console.log("called")
      return db.employeesList
    },
    filterByEmployer(_, {input}, {db}){
        console.log(input)
        return db.employeesList.filter(item=>item.role === input.role)
    },
    filterByEmployerId(_, {input}, {db}){
        console.log(input)
        return db.employeesList.filter(item=>item.id === input.id)
    }
  },
  Mutation: {
    addEmployee(_, {input}, {db}) {
      const newEmployee = {id: nanoid(), createdAt: Date.now().toString(), ...input}
      const employee = db.employeesList.push(newEmployee)
      return newEmployee
    },
    deleteEmployee(_, {input}, {db}){
      const deletedEmployee = db.employeesList.filter(item=>item.id ===input.id)
      const remainingEmployees = db.employeesList.filter(item=>item.id !==input.id)
      db.employeesList = [...remainingEmployees]
      return deletedEmployee[0]
    },
    updateEmployee(_, {input}, {db}){
        const updatedList = db.employeesList.map(item=>{
            return item.id == input.id ? {...input}:{...item}
        })
        db.employeesList = [...updatedList]
        return  {...input}
    }
  },
  Employee: {
    img(employee) {
      return employee.employer === 'Google'
        ? 'https://www.stickpng.com/assets/images/5a951939c4ffc33e8c148af2.png':
        employee.employer === 'Twitter' ?'https://www.stickpng.com/assets/images/580b57fcd9996e24bc43c53e.png':
        employee.employer === 'Apple' ? 'https://www.pinclipart.com/picdir/big/210-2100125_apple-logo-png-transparent-svg-vector-apple-logo.png':
        employee.employer === 'Instagram' ? 'https://www.stickpng.com/assets/images/580b57fcd9996e24bc43c521.png' :
        'https://cdn1.iconfinder.com/data/icons/rounded-flat-country-flag-collection-1/2000/_Unknown.png'
    }
  },
}
