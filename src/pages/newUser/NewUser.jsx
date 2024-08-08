import { useState } from "react";
import "./newUser.css";
import axios from 'axios';

export default function NewUser() {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [nationality, setNationality] = useState('')
  const [password, setPassword] = useState('');

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!fullname && !email && !nationality && !password) {
      alert('All fields are necessary');
      return;
    }

    const user = { fullname, email, nationality, password };
    
    if ( fullname && email && nationality && password ) {
      await axios.post('https://titos-corner.onrender.com/api/users/register', user)
      .then(alert('You have register a candidate'))
    } else {
      alert('It seems you have internet failure');
    }
  }

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form onSubmit={handleSubmit} className="newUserForm">
        <div className="newUserItem">
          <label>Fullname</label>
          <input type="text" name="fullname" onChange={(e) => setFullname(e.target.value)} placeholder="john" />
        </div>
        <div className="newUserItem">
          <label>Email:</label>
          <input type="email" name="email" onChange={(e) => setEmail(e.target.value)}  placeholder="smith@example.com" />
        </div>
        <div className="newUserItem">
          <label>Nationality</label>
          <input type="text" name="country" onChange={(e) => setNationality(e.target.value)} placeholder="e.g Nigeria" />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} placeholder="password" />
        </div>
        <button className="newUserButton">Create</button>
      </form>
    </div>
  );
}
