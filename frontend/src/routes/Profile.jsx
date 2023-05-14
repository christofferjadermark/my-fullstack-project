import { useEffect, useState } from "react";


const UserProfile = () => {
  const email = localStorage.getItem("email");

  const [user, setUser] = useState([]);



useEffect(() => {


  fetch(`http://localhost:8080/users/${email}`)
  .then(response => response.json())
  .then(data => {
    setUser(data);
  })
  .catch(error => {
    console.log(error);
  });

}, [email]);




  return (
    <div>
      {user.map((item, index)=>
      (
        <>
      <h1 key={index}>{item.name}</h1>
      <h2 key={index}>{item.email}</h2>
      <div key={index}>{item._id}</div>
      </>
      ))}
    </div>
  )
}

export default UserProfile;
