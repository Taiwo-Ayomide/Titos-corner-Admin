// ProductList.js
import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import axiosInstance from '../../requestMethods';



const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axiosInstance.get('/blogs');
        const data = await response.data;

        if (Array.isArray(data)) {
          setBlogs(data);
        } else {
          console.error('Expected an array but got', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(`/blogs/delete/${id}`, {
        method: 'DELETE',
      });
      const result = await response.data;
      if (response.ok) {
        setBlogs(blogs.filter(blog => blog._id !== id));
      } else {
        console.error('Failed to delete:', result);
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };


  return (
    <div>
      <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog._id}>
              <td>{blog._id}</td>
              <td>{blog.headline}</td>
              <td>{blog.description}</td>
              <td>{blog.author}</td>
              <td>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDelete(blog._id)}
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

export default BlogList;
