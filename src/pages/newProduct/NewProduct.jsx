import { useState, useEffect } from "react";
import "./NewProduct.css";
import axiosInstance from "../../requestMethods";

export default function NewProduct() {
  const initialFormData = {
    title: '',
    description: '',
    producers: '',
    audioFile: null,
  };
  
  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const { title, description, producers, audioFile } = formData;
    setIsFormValid(!!title && !!description && !!producers && !!audioFile);
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
    const { title, description, producers, audioFile } = formData;

    if (!isFormValid) {
      alert('All fields are necessary');
      return;
    }

    const data = new FormData();
    data.append('title', title);
    data.append('description', description);
    data.append('producers', producers);
    data.append('audioFile', audioFile);

    setIsLoading(true);

    try {
      await axiosInstance.post('/podcast/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('You uploaded a file');
      setFormData(initialFormData); // Reset form
    } catch (error) {
      console.error('There was an error uploading the file:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New Podcast</h1>
      <form onSubmit={handleSubmit} className="newUserForm">
        <div className="newUserItem">
          <label>Title</label>
          <input 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            placeholder="Life" 
          />
        </div>
        <div className="newUserItem">
          <label>Description:</label>
          <input 
            type="text" 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            placeholder="A podcast on Life" 
          />
        </div>
        <div className="newUserItem">
          <label>Producers:</label>
          <input 
            type="text" 
            name="producers" 
            value={formData.producers} 
            onChange={handleChange} 
            placeholder="John Smith" 
          />
        </div>
        <div className="newUserItem">
          <label>Podcast File</label>
          <input 
            type="file" 
            name="audioFile" 
            onChange={handleChange} 
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
