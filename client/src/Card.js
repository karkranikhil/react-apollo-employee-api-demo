import React from 'react';
function Card({data, editHandler, deleteHandler}) {
    console.log(data)
  return (
    <main className="cards primary-color">
        {data && data.employees.map((item,index)=>
        <article className="card" key={item.id}>
            <img src={item.img} alt={item.name} />
            <div className="text">
            <h2>{item.name}</h2>
            <h3>{item.employer}</h3>
            <p>{item.role.split('_').join(' ')}</p>
            <p>{new Date(Number(item.createdAt)).toDateString().substr(4)}</p>
            </div>
            <p className="card-action"><span onClick={()=>deleteHandler(item)}>Delete</span> <span onClick={()=>editHandler(item)}>Edit</span></p>
        </article>)}
  </main>
  );
}

export default Card;
