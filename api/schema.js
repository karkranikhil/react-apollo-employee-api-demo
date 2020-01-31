const { gql } = require('apollo-server')

const typeDefs = gql`
  enum Designation {
    Junior_Developer
    Senior_Developer
    Scrum_Master
    Product_Owner
  }
  enum Employer {
    Google
    Twitter
    Apple
    Instagram
  }

type Employee {
  id: ID!
  role: Designation!
  name: String!
  employer: Employer!
  img: String!
  createdAt: String!
}

input NewEmployeeInput {
  name: String!
  role: Designation!
  employer: Employer!
}

input EmployeesListByRole {
  role: Designation!
}
input EmployeesId {
  id: ID!
}
input updatedEmployee{
  id: ID!
  role: Designation!
  name: String!
  employer: Employer!
  img: String!
  createdAt: String!
}

type Query {
  employees: [Employee]!
  employee(id: ID!): Employee!
  filterByEmployer(input:EmployeesListByRole!):[Employee]!
  filterByEmployerId(input:EmployeesId!):[Employee]!
}

type Mutation {
  addEmployee(input: NewEmployeeInput!): Employee!
  deleteEmployee(input: EmployeesId!):Employee!
  updateEmployee(input: updatedEmployee!):Employee!
}
`;

module.exports = typeDefs
