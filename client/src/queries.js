
import gql from "graphql-tag";

const EMPLOYEE_FIELDS = gql`
  fragment EmployeeFields on Employee {
    name
    id
    role
    createdAt
    img
    employer
  }
`;
export const ALL_EMPLOYEES_LISTS = gql`
  query AllEmployeeLists {
    employees {
        ...EmployeeFields
    }
  } ${EMPLOYEE_FIELDS}
`;
export const CREATE_EMPLOYEE = gql`
  mutation createEmployee($newEmployee: NewEmployeeInput!) {
    addEmployee(input: $newEmployee) {
        ...EmployeeFields
    }
  } ${EMPLOYEE_FIELDS}
`;
export const UPDATE_EMPLOYEE = gql`
  mutation updateEmployeeData($updateEmployee: updatedEmployee!) {
    updateEmployee(input: $updateEmployee) {
        ...EmployeeFields
    }
  } ${EMPLOYEE_FIELDS}
`;
export const DELETE_EMPLOYEE = gql`
  mutation deleteEmployeeData($deleteEmployee: EmployeesId!) {
    deleteEmployee(input: $deleteEmployee) {
        id
    }
  }
`;

//*************************Below code without fragments ****************/

// export const ALL_EMPLOYEES_LISTS = gql`
//   query AllEmployeeLists {
//     employees {
//         name
//         id
//         role
//         createdAt
//         img
//         employer
//     }
//   }
// `;
// export const CREATE_EMPLOYEE = gql`
//   mutation createEmployee($newEmployee: NewEmployeeInput!) {
//     addEmployee(input: $newEmployee) {
//         name
//         id
//         role
//         createdAt
//         img
//         employer
//     }
//   }
// `;
// export const UPDATE_EMPLOYEE = gql`
//   mutation updateEmployeeData($updateEmployee: updatedEmployee!) {
//     updateEmployee(input: $updateEmployee) {
//         name
//         id
//         role
//         createdAt
//         img
//         employer
//     }
//   }
// `;
// export const DELETE_EMPLOYEE = gql`
//   mutation deleteEmployeeData($deleteEmployee: EmployeesId!) {
//     deleteEmployee(input: $deleteEmployee) {
//         id
//     }
//   }
// `;
