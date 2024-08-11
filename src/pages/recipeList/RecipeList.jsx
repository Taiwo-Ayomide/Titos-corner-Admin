// ProductList.js
import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import './RecipeList.css'
import axiosInstance from '../../requestMethods';



const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axiosInstance.get('/recipe');
        const data = await response.data;

        if (Array.isArray(data)) {
          setRecipes(data);
        } else {
          console.error('Expected an array but got', data)
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchRecipe();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(`/recipe/delete/${id}`, {
        method: 'DELETE',
      });
      const result = await response.data;
      if (response.ok) {
        setRecipes(recipes.filter(recipe => recipe._id !== id));
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
            <th>Background</th>
            <th>Ingredient</th>
            <th>Methods</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe) => (
            <tr key={recipe._id}>
              <td>{recipe._id}</td>
              <td><img id='img' src={recipe.imageUrl} alt="representation" /></td>
              <td>{recipe.backgroundstory}</td>
              <td>{recipe.ingredients}</td>
              <td>{recipe.steps}</td>
              <td>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDelete(recipe._id)}
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

export default RecipeList;
