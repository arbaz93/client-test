import { useEffect, useState } from 'react'

function App() {
  const [newUser, setNewUser] = useState({
    "name": "",
    "email": "",
    "password": ""
  })
  const [newUserStatus, setNewUserStatus] = useState("Add New User")
  const [users, setUsers] = useState([]);
  const [usersState, setUsersState] = useState()
  async function getUsers() {
    setUsersState("getting users data...")
    const users = await fetch('https://test-vercel-server-nine.vercel.app/getUsers').then(res => res.json()).then(d => { console.table(d); setUsers(d); setUsersState("success")}).catch(err => { console.error(err) })
  }
  async function handleCreateUser() {
    if(newUser.name === "" || newUser.name === "" || newUser.password === ""){
      setNewUserStatus("Some fields are empty!");
      return
    }
    setNewUserStatus("adding...")
    const options = {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      }
    }
    await fetch("https://test-vercel-server-l33n94e83-yousafs-projects-69c412bf.vercel.app/addUser", options)
      .then(res => res.json())
      .then(d => {
        setNewUserStatus(d.status ?? "new user '" + d.name + "' added!");
          setNewUser({
            "name": "",
            "email": "",
            "password": ""
          })
      })
      .catch(err => {
        setNewUserStatus("Encountered some error!")
      })
  }
  return (
    <>
      <form>
        <h2>{newUserStatus}</h2>
        <input required type="text" name="name" placeholder='name' value={newUser.name} onChange={e => { setNewUser((user) => ({ ...user, name: e.target.value })); }} />
        <input required type="email" name="email" placeholder='email' value={newUser.email} onChange={e => { setNewUser((user) => ({ ...user, email: e.target.value })); }} />
        <input required type="password" name="password" placeholder='password' value={newUser.password} onChange={e => { setNewUser((user) => ({ ...user, password: e.target.value })); }} />
        <button type='button' onClick={handleCreateUser}>Create new user</button>
      </form>
      <div className='btn-div'>

      <button className='get-user-btn' onClick={getUsers}>Get Users</button>

      </div>
      <div className="users">
        {usersState === "getting users data..." ? usersState : users && users.map((user, i) => {
          return (
            <div className="user" key={i}>
              <p className="name">Name: {user.name}</p>
              <p className="email">Email: {user.email}</p>
              <p className="password">Password: {user.password}</p>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default App
