"use client"
import  { useState } from 'react'

const SaveButton = ({ jobId }: { jobId: number }) => {

 const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <div>
      <button onClick={handleSave} className={`px-4 py-2 rounded ${isSaved ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}>
        {isSaved ? "Unsave" : "Save"}
      </button>
    </div>
  )
}

export default SaveButton