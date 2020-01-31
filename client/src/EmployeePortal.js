import React, { useState } from "react";
import Card from './Card.js'
import { useQuery, useMutation } from "@apollo/react-hooks";
import Loader from "./Loader";
import {ALL_EMPLOYEES_LISTS, CREATE_EMPLOYEE, UPDATE_EMPLOYEE, DELETE_EMPLOYEE} from './queries'
import Form from './Form'
function EmployeePortal() {
  const [editResult, setEditResult] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  /***Employees Fetch Queries ****/
  const { data, loading, error} = useQuery(ALL_EMPLOYEES_LISTS);

  /***Employees Create Queries/Mutation ****/
  const [createEmployee] = useMutation(CREATE_EMPLOYEE, {
    /***Updating the local cache****/
    update(cache, { data: { addEmployee } }) {
      const data = cache.readQuery({ query: ALL_EMPLOYEES_LISTS }); 
      cache.writeQuery({
        query: ALL_EMPLOYEES_LISTS, // query to update
        data: { employees: [addEmployee, ...data.employees] }
      });
    }
  });

  /***Employees Update Queries/Mutation ****/
  const [updateEmployeeData, updatedReponse] = useMutation(UPDATE_EMPLOYEE, {
    /***Updating the local cache****/
    update(cache, { data: { updateEmployee } }) {
      const data = cache.readQuery({ query: ALL_EMPLOYEES_LISTS }); 
      cache.writeQuery({
        query: ALL_EMPLOYEES_LISTS,
        data: { employees: [data.employees, ...updateEmployee] }
      });
    }
  });

  /***Employees Delete Queries/Mutation ****/
  const [deleteEmployeeData, deleteReponse] = useMutation(DELETE_EMPLOYEE, {
    // We can use refetch as well to update the code
    //  refetchQueries: [{query: ALL_EMPLOYEES_LISTS}],
    //  awaitRefetchQueries: true,

     /***Updating the local cache****/
    update(cache, { data: { deleteEmployee } }) {
      const data = cache.readQuery({ query: ALL_EMPLOYEES_LISTS }); 
      const remainingData = data.employees.filter(item=>item.id !== deleteEmployee.id)
      cache.writeQuery({
        query: ALL_EMPLOYEES_LISTS,
        data: { employees: [...remainingData] }
      });
    }
  });

  if (loading || updatedReponse.loading || deleteReponse.loading) {
    return <Loader />;
  }
  if (error || updatedReponse.error || deleteReponse.error) {
    return <p>Error occured</p>;
  }

  /***Employee Create Methods ****/
  const onSubmit=(input)=>{
    console.log(input)
    createEmployee({
      variables: { newEmployee: input },
      optimisticResponse: {
        __typename: "Mutation",
        createEmployee: {
          __typename: "Employee", // return type of mutation
          id: Math.floor(Math.random() * 1000) + "",
          name: input.name,
          role:input.role,
          createdAt:Date.now(),
          employer: input.employer,
          img: "https://via.placeholder.com/300"
        }
      }
    });
  }

  /***Employee Delete Methods ****/
  const deleteHandler =(input)=>{
    deleteEmployeeData({
      variables: { deleteEmployee: {
        "id": input.id
      } }})
  }
  

  /***Employee Edit Methods ****/
  const editHandler =(data)=>{
    setEditResult(data)
    setIsEdit(true)
  }
  const updateHandler =(input)=>{
    const obj = {
        name:input.name,
        id:input.id,
        role:input.role,
        createdAt:input.createdAt,
        img:input.img,
        employer:input.employer
    }
    updateEmployeeData({
      variables: { updateEmployee: obj }}
    )
    setEditResult({})
    setIsEdit(false)
  }

  const cancelHandler=()=>{
    setIsEdit(false)
    setEditResult({})
  }
  return (
    <>
    {isEdit ?  <div className="floating-form">
      <Form onSubmit={onSubmit} data={editResult} isEdit={isEdit} cancelHandler={cancelHandler} updateHandler={updateHandler}/>
    </div>: <Form onSubmit={onSubmit} isEdit={isEdit}/>}
      <Card data={data}  editHandler={editHandler} deleteHandler={deleteHandler}/>
    </>
  );
}

export default EmployeePortal;
