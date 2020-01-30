const nanoid = require('nanoid')
module.exports = {
  Query: {
    employees(parent,args, {db}) {
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
        console.log("called",employee )
      return employee.employer === 'Google'
        ? 'https://www.readyartwork.com/wp-content/uploads/2015/09/Google-iconic-logo-min.png':
        employee.employer === 'Twitter' ?'https://www.readyartwork.com/wp-content/uploads/2015/09/Twitter-Iconic-Logo-min.png':
        employee.employer === 'Apple' ? 'https://www.readyartwork.com/wp-content/uploads/2015/09/download-1.png':
        employee.employer === 'Amazon' ? 'https://www.readyartwork.com/wp-content/uploads/2015/09/amazon-iconic-logo.jpg' :
        'https://cdn1.iconfinder.com/data/icons/rounded-flat-country-flag-collection-1/2000/_Unknown.png'
    }
  },
}
