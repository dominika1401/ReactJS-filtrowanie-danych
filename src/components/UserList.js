import { useEffect, useState } from 'react'
import './UserList.css'

const UserList = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    usertype: '',
  });

  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([...users])


  const handleInputChange = (e) => {
    const target = e.target
    const name = target.name
    setFormData(prevDataForm => {
      return { ...prevDataForm, [name]: target.value };
    });
  };

  const setUser = (e) => {
    e.preventDefault();
    setUsers(users.concat({ ...formData, id: Date.now() }))
  }

  const removeUser = (id) => {
    const filteredUsers = users.filter(user => user.id !== id)
    setUsers(filteredUsers)
  }

  const filerList = (e) => {


    let filteredUsers

    if (e.target.name === 'btnAdmins') {
      filteredUsers = users.filter(user => {
        return user.usertype === "Admin"
      })
    } else if (e.target.name === 'btnUser') {
      filteredUsers = users.filter(user => {
        return user.usertype === "User"
      })
    } else if (e.target.name === 'btnAll') {
      filteredUsers = users
    }
    setFilteredUsers(filteredUsers)
  }

  useEffect(() => { setFilteredUsers(users) }, [users])




  return (

    <div className="userList">

      <form onSubmit={setUser}>
        <label htmlFor='username'> Imię</label><br></br>
        <input type='text' id='username' name='username' placeholder='Imię' onChange={handleInputChange} value={formData.unsername} /><br></br>
        <label htmlFor='email'>Email</label><br></br>
        <input type='email' id='email' name='email' placeholder='email' onChange={handleInputChange} value={formData.email} /><br></br>
        <label htmlFor='usertype'> Uzytkownik </label> <br></br>
        <select id='usertype' name='usertype' onChange={handleInputChange}>
          <option value='Admin'>Admin</option>
          <option value='User'>User</option>
        </select><br></br>
        <button>Save</button><br></br>
      </form>
      <div className="przyciski">
        <button className='btnAdmin btn' name='btnAdmins' onClick={(e) => filerList(e)}>Wyświetl tylko adminów</button>
        <button className='btnUser btn' name='btnUsers' onClick={(e) => filerList(e)} >Wyświetl tylko userów</button>
        <button className='btnAll btn' name='btnAll' onClick={(e) => filerList(e)}>Wyświetl wszystkich</button>
      </div>
      <div className='list'>
        {filteredUsers.map((user) => {
          return (
            <div className='userItem' key={user.id} onClick={() => removeUser(user.id)
            }>
              <p>  {user.username}</p>
              <p>  {user.email}</p>
              <p>  {user.usertype}</p>
            </div>
          );
        })};
      </div>
    </div>
  );

};
export default UserList