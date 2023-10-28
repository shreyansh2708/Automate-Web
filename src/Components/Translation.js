import React, { useState } from 'react'
import "./Translation.css"

function Translation() {

  const[extracted_text,setExtractedText]=useState('');

  const onSubmit = async (e) => {

    e.preventDefault()

    try {
    const formData = new FormData();
      formData.append('txt', e.target.txt.value);

      const response = await fetch('http://127.0.0.1:5000/translation',{
        method: "POST",
        body: formData,
    });

      if (response.ok) {
        const data=await response.json()
        setExtractedText(data.extracted_text)
        console.log("file uploaded"); // Set the URL of the uploaded image
      } else {
        console.error('upload failed.Status:', response.status);
      }
    } 
    catch (error) {
      console.error('upload error:', error);
    }

  };
return (
  <div className='top'>
    <div className='conatiner'>
        <form onSubmit={onSubmit} method='POST' action='/translation'>
            <h2>Enter Text:</h2>
            <textarea type='text' name='txt' rows="4" cols="75" /> 
            <br />
            <input type="submit" value="Translate" />
        </form>
    </div>    
    <div className='translated-text'>
      <p>{extracted_text[0]}</p>
      <p>{extracted_text[1]}</p>
      <p>{extracted_text[2]}</p>
      <p>{extracted_text[3]}</p>
      <p>{extracted_text[4]}</p>
    </div>
  </div>
    
  )
}

export default Translation