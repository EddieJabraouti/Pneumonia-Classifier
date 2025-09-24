import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';

// what to do:
// Make the UI look nice, create upload button such that user can upload files,
// send the user image to the backend -> to the model, which then classifies it and returns the classification back,
// Integrate any LLM API that describes what makes a x-ray image with pneumonia differ from normal depending on the..
// DL models classification(including a sort of confidence score). refere to PrimePrep/lib/actions/general.actions.ts  
// and PrimePrep/constants/index.ts

//We are already getting a prediction in server.py, we just need to make function that gets this prediction and uses it here. 
//

const Model = () => {

  const [showImage, setShowImage] = useState(false); //For when the image is shown or not
  const [desc, setShowDesc] = useState(""); //For the analysis



  return (
    <div>
      <div>
        <h1 className='text-center'>Get a classification and elaborate analysis on your own image</h1>
        <p className='text-center'>AI Powered Analysis</p>
      </div>
      <div className='rounded-2xl border border-gray-200 bg-white shadow-sm'>

      </div>
    </div>
  )
}

export default Model