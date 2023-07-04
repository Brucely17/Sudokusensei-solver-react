import React, { useState } from 'react';
import axios from 'axios';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import './Upload.css';

function Upload() {
  const [imagefile,setImageFile]=useState('')
  const [image, setImage] = useState(null);
  const [filename, setFilename] = useState("No selected file");
  const [uploadStatus, setUploadStatus] = useState(null);

  const uploadImage = () => {
    document.querySelector(".input-field").click();
  };

  const handleImageChange = (event) => {
    const files = event.target.files;
    const formData = new FormData();
    if (files && files[0]) {
      const selectedImage = files[0];
      setImageFile(event.target.files[0]);
      console.log('selectedimage:',selectedImage)
      setFilename(selectedImage.name);
      setImage(URL.createObjectURL(selectedImage));
      formData.append('image', selectedImage);
      console.log('sel',selectedImage)
      console.log(formData);
      console.log(imagefile);
    }

    
     ;
      // console.log(image);
      
      axios({
        url:'http://127.0.0.1:5000/image', 
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data' },
       
       data:formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
         
        })
        .catch((error) => {
          
          console.error('Error:', error);
        });
   
      
  };

  return (
    <div className='Main'>
      <div className='form'>
        <form action='' onClick={uploadImage}>
          <input
            type="file"
            accept='image/*'
            className="input-field"
            hidden
            onChange={handleImageChange}
          />
          {image ? (
            <div className='display'>
              <img src={image} width={100} height={100} alt={filename} />
            </div>
          ) : (
            <div className='icon'>
              <CloudUploadIcon className='upload-icon' />
              <p> Browse files to upload</p>
            </div>
          )}
        </form>
        <section className='upload-row'>
          <InsertDriveFileIcon className='icon' />
          <span className='upload-content'>
            <h6>{filename}</h6>
            <DeleteForeverIcon
              onClick={() => {
                setFilename('No selected File');
                setImage(null);
              }}
            />
          </span>
        </section>
        {uploadStatus && <p>{uploadStatus}</p>}
      </div>
    </div>
  );
}

export default Upload;
