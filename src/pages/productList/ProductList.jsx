// ProductList.js
import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ReactAudioPlayer from 'react-audio-player';
import axiosInstance from '../../requestMethods';



const ProductList = () => {
  const [audios, setAudios] = useState([]);

  useEffect(() => {
    const fetchAudio = async () => {
      try {
        const response = await axiosInstance.get('/podcast');
        const data = await response.data;
  
        if (Array.isArray(data)) {
          setAudios(data);
        } else {
          console.error('Expected an array but got:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchAudio();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://titos-corner.onrender.com/api/podcast/delete/${id}`, {
        method: 'DELETE',
      });
      const result = await response.data;
      if (response.ok) {
        setAudios(audios.filter(audio => audio._id !== id));
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
            <th>Producers</th>
            <th>Audio</th>
          </tr>
        </thead>
        <tbody>
          {audios.map((audio) => (
            <tr key={audio._id}>
              <td>{audio._id}</td>
              <td>{audio.title}</td>
              <td>{audio.description}</td>
              <td>{audio.producers}</td>
              <td>
                <ReactAudioPlayer 
                  src={audio.audioUrl}
                  type="audio/mpeg"
                  controls
                  // className='w-full'
                />
              </td>
              <td>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDelete(audio._id)}
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

export default ProductList;
