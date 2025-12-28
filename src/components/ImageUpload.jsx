import React from 'react'

const imageUpload = (props) => {

  const showImageHandler = (e)=>{
    const file = e.target.files[0];
    if(file){
      props.uploadImageHandler(file)
    }
  }

  return (
    <div className='bg-white shadow-lg rounded-2xl p-6  max-2xl'>
        
      <label htmlFor="fileInput" className='block w-full cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-all'>

        <input type="file" id='fileInput' className='hidden' onChange={showImageHandler} />
        <span className='text-lg font-medium text-gray-600'>Click and Drag to upload your image</span>

      </label>

    </div>
  )
}

export default imageUpload