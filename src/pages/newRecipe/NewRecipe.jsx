import { useState, useEffect } from "react";
import "./NewRecipe.css";
import axiosInstance from "../../requestMethods";

export default function NewRecipe() {
  const initialFormData = {
    imageFile: null,
    backgroundstory: '',
    ingredients: '',
    steps: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const { imageFile, backgroundstory, ingredients, steps } = formData;
    setIsFormValid(!!imageFile && !!backgroundstory && !!ingredients && !!steps);
  }, [formData]);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { imageFile, backgroundstory, ingredients, steps } = formData;

    if (!isFormValid) {
      alert('All fields are necessary');
      return;
    }

    const data = new FormData();
    data.append('imageFile', imageFile);
    data.append('backgroundstory', backgroundstory);
    data.append('ingredients', ingredients);
    data.append('steps', steps);

    setIsLoading(true);

    try {
      await axiosInstance.post('/recipe/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Recipe uploaded successfully');
      setFormData(initialFormData); // Reset form
    } catch (error) {
      console.error('There was an error uploading the recipe:', error);
      alert('Error uploading recipe');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New Recipe</h1>
      <form onSubmit={handleSubmit} className="newUserForm">
        <div className="newUserItem">
          <label>Image Representation</label>
          <input 
            type="file" 
            name="imageFile" 
            onChange={handleChange} 
          />
        </div>
        <div className="newUserItem">
          <label>Background Story</label>
          <input 
            type="text" 
            name="backgroundstory" 
            value={formData.backgroundstory} 
            onChange={handleChange} 
            placeholder="Background story of the recipe" 
          />
        </div>
        <div className="newUserItem">
          <label>Ingredients</label>
          <input 
            type="text" 
            name="ingredients" 
            value={formData.ingredients} 
            onChange={handleChange} 
            placeholder="List of ingredients" 
          />
        </div>
        <div className="newUserItem">
          <label>Steps</label>
          <input 
            type="text" 
            name="steps" 
            value={formData.steps} 
            onChange={handleChange} 
            placeholder="Steps to prepare the recipe" 
          />
        </div>
        <input 
          type="submit" 
          className="newUserButton" 
          value={isLoading ? "Loading..." : "Create"} 
          disabled={isLoading || !isFormValid}
        />
      </form>
    </div>
  );
}
