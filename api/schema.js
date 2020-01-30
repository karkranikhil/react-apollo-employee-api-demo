const { gql } = require('apollo-server')

const typeDefs = gql`
  enum Designation {
    JuniorDeveloper
    SeniorDeveloper
    ScrumMaster
    ProductOwner
  }
  enum Employer {
    Google
    Twitter
    Apple
    Amazon
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
input EmployeesListById {
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
  filterByEmployerId(input:EmployeesListById!):[Employee]!
}

type Mutation {
  addEmployee(input: NewEmployeeInput!): Employee!
  deleteEmployee(input: EmployeesListById!):Employee!
  updateEmployee(input: updatedEmployee!):Employee!
}
`;

module.exports = typeDefs
