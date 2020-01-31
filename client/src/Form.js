import React, {useState} from 'react';

const selectList =(data)=>{
    return data.map(item=><option value={item.value} key={item.value}>{item.label}</option>)
}

const ROLE_LIST=[
    {label:'Select Role', value:''},
    {label:'Junior Developer', value:'Junior_Developer'},
    {label:'Senior Developer', value:'Senior_Developer'},
    {label:'Scrum Master', value:'Scrum_Master'},
    {label:'Product Owner', value:'Product_Owner'}
]
const EMPLOYER_LIST=[
    {label:'Select Employer', value:''},
    {label:'Google', value:'Google'},
    {label:'Twitter', value:'Twitter'},
    {label:'Apple', value:'Apple'},
    {label:'Instagram', value:'Instagram'}
]
const INITIAL_FIELDS_VALUE= {
  name:'',
  employer:'',
  role:''
}
function Form({onSubmit, isEdit, cancelHandler, updateHandler, data =INITIAL_FIELDS_VALUE}) {
  const [formValue, setFormValue] = useState(data);
  const changeHandler= (event)=>{
     const { name, value } = event.target
     setFormValue({ ...formValue, [name]: value })
  }  
   const submit = e => {
    e.preventDefault()
    onSubmit(formValue)
    setFormValue(INITIAL_FIELDS_VALUE)
  }
  return (
    <div className="form-container">
    {isEdit ? <h2>Edit your employee details</h2> : <h2>Add your employee details</h2>}
    <form onSubmit={submit}>
     
        <div>
        <label htmlFor="name" className="display-block">Name</label>
        <input type="text" id="name" name="name" className="form-field" onChange={changeHandler} value={formValue.name} required/>
</div>
<div>
        <label htmlFor="employer" className="display-block">Employer</label>
        <select id="employer" name="employer" className="form-field" onChange={changeHandler}  value={formValue.employer} required>
            {selectList(EMPLOYER_LIST)}
        </select>
        </div>
        <div>
        <label htmlFor="role" className="display-block">Role</label>
        <select id="role" name="role" className="form-field" onChange={changeHandler}  value={formValue.role} required>
            {selectList(ROLE_LIST)}
        </select>
        </div>
        {isEdit ? <div>
            <button type="button"  className="form-edit-btn update-btn"  onClick={()=>updateHandler(formValue)}>Update</button>
            <button type="button"  className="form-edit-btn cancel-btn" onClick={cancelHandler}>Cancel</button>
        </div>:
        <div>
            <button type="submit"  className="form-btn ">Create</button>
        </div>}
    </form>
    </div>
  );
}

export default Form;
