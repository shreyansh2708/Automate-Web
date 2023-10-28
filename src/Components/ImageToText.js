import React, { useEffect, useState } from 'react'
import "./ImageToText.css"
import axios from 'axios'

function ImageToText() {

  const [extractedText, setExtractedText] = useState('');
  const [imageURL, setImageURL] = useState('');

 //fetching the data from the localhost using axios or server
  const getExtractedText = () => {
    axios.get("http://127.0.0.1:5000/image-to-text")
      .then((response) => {
        setExtractedText(response.data.extracted_text);
      });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setImageURL(URL.createObjectURL(e.target.image.files[0]));

    const formData = new FormData();
    formData.append('image', e.target.image.files[0]);

    try {
      const response = await fetch('http://localhost:5000/image-to-text', {
        method: "POST",
        body: formData,
      });

      if (response.ok) {

      //it will extract the text from jsonify()
      //const data=await response.json()
      //setExtractedText(data.extracted_text);

      console.log("file uploaded"); // Set the URL of the uploaded image
      } else {
        console.error('Image upload failed.Status:', response.status);
      }
    } catch (error) {
      console.error('Image upload error:', error);
    }

  };
  return (
    <div>
     
      <div className='upload-image'>
        <form onSubmit={onSubmit} method='POST' action='http://localhost:8000/image-to-text' encType="multipart/form-data">
          <div className='input-type'>
            <label for="file-upload" class="custom-file-input">Choose an Image</label>
            <input type="file" id="file-upload" name="image" />
            <input type="submit" value="Upload" class="upload-button" />
            <img className='imgup' src={imageURL} />
          </div>
        </form>
      </div>
      <div className='text-container'>
        <button onClick={getExtractedText}>Get Extracted Text</button>     
        <p className='extracted-text'>{extractedText}</p>
      </div>
    </div>
  )
}

export default ImageToText
