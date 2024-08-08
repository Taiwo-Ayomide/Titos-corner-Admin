// ProductList.js
import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import './Books.css'
import axiosInstance from '../../requestMethods';



const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axiosInstance.get('/books')
        const data = await response.data;

        if (Array.isArray(data)) {
          setBooks(data);
        } else {
          console.error('Expected an array but got', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(`/books/delete/${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (response.ok) {
        setBooks(books.filter(book => book._id !== id));
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
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Pages</th>
            <th>Preview</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book._id}</td>
              <td><img id='img' src={book.imageUrl} alt="representation" /></td>
              <td>{book.title}</td>
              <td>{book.description}</td>
              <td>{book.price}</td>
              <td>{book.pages}</td>
              <td>{book.preview}</td>
              <td>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDelete(book._id)}
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

export default BookList;
