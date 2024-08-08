import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import axiosInstance from '../../requestMethods';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/users');
        const data = response.data; // Directly access data

        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error('Expected an array but got:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error.response?.data || error.message);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(`/users/delete/${id}`);
      if (response.status === 200) {
        setUsers(users.filter(user => user._id !== id));
      } else {
        console.error('Failed to delete:', response.data);
      }
    } catch (error) {
      console.error('Error deleting data:', error.response?.data || error.message);
    }
  };

  return (
    <div>
      <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Nationality</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.fullname}</td>
              <td>{user.email}</td>
              <td>{user.nationality}</td>
              <td>{user.password}</td>
              <td>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDelete(user._id)}
                  className='cursor-pointer absolute'
                >
                  <DeleteIcon />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;

