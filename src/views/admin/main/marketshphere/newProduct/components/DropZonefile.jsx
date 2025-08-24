import { useDropzone } from "react-dropzone";
import React from "react";

const DropZonefile = (props) => {
  const { content, onDrop } = props;
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    multiple: true
  });

  return (
    <div
      className="flex h-full !w-[700px] cursor-pointer items-center justify-center rounded-xl border-dashed border-navy-700"
      {...getRootProps({ className: "dropzone" })}
    >
      <input {...getInputProps()} />
      <button type="button" className="h-full !w-full"> 
        {content} 
      </button>
    </div>
  );
};

export default DropZonefile; 