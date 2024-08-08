import { useState, useEffect } from "react";
import "./NewBlog.css";
import axiosInstance from '../../requestMethods';

export default function NewBlog() {
  const initialFormData = {
    headline: '',
    description: '',
    author: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const { headline, description, author } = formData;
    setIsFormValid(!!headline && !!description && !!author);
  }, [formData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      alert('All fields are necessary');
      return;
    }

    const { headline, description, author } = formData;

    setIsLoading(true);

    try {
      await axiosInstance.post('/blogs/post', {
        headline,
        description,
        author
      });
      alert('Blog uploaded successfully');
      setFormData(initialFormData); // Reset form
    } catch (error) {
      console.error('There was an error uploading the blog:', error);
      alert('Error uploading blog');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New Blog</h1>
      <form onSubmit={handleSubmit} className="newUserForm">
        <div className="newUserItem">
          <label>Headline</label>
          <input
            type="text"
            name="headline"
            value={formData.headline}
            onChange={handleChange}
            placeholder="Life"
          />
        </div>
        <div className="newUserItem">
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="A blog on Life"
          />
        </div>
        <div className="newUserItem">
          <label>Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="John Smith"
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
