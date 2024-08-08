import { useState, useEffect } from "react";
import "./NewBook.css";
import axiosInstance from "../../requestMethods";

export default function NewBook() {
  const initialFormData = {
    imageFile: null,
    title: '',
    description: '',
    price: '',
    pages: '',
    preview: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const { imageFile, title, description, price, pages, preview } = formData;
    setIsFormValid(!!imageFile && !!title && !!description && !!price && !!pages && !!preview);
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
    const { imageFile, title, description, price, pages, preview } = formData;

    if (!isFormValid) {
      alert('All fields are necessary');
      return;
    }

    const data = new FormData();
    data.append('imageFile', imageFile);
    data.append('title', title);
    data.append('description', description);
    data.append('price', price);
    data.append('pages', pages);
    data.append('preview', preview);

    setIsLoading(true);

    try {
      await axiosInstance.post('/books/post', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Book uploaded successfully');
      setFormData(initialFormData); // Reset form
    } catch (error) {
      console.error('There was an error uploading the book:', error);
      alert('Error uploading book');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="newUser">
      <h1 className="newUserTitle">New Book</h1>
      <form onSubmit={handleSubmit} className="newUserForm">
        <div className="newUserItem">
          <label>Book Cover</label>
          <input 
            type="file" 
            name="imageFile" 
            onChange={handleChange} 
          />
        </div>
        <div className="newUserItem">
          <label>Title of Book</label>
          <input 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            placeholder="Title" 
          />
        </div>
        <div className="newUserItem">
          <label>About the book</label>
          <input 
            type="text" 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            placeholder="Short Description" 
          />
        </div>
        <div className="newUserItem">
          <label>Prices</label>
          <input 
            type="text" 
            name="price" 
            value={formData.price} 
            onChange={handleChange} 
            placeholder="price in figure without any symbol" 
          />
        </div>
        <div className="newUserItem">
          <label>Pages</label>
          <input 
            type="text" 
            name="pages" 
            value={formData.pages} 
            onChange={handleChange} 
            placeholder="No of pages" 
          />
        </div>
        <div className="newUserItem">
          <label>Preview</label>
          <input 
            type="text" 
            name="preview" 
            value={formData.preview} 
            onChange={handleChange} 
            placeholder="check preview" 
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
