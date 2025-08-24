import { useDropzone } from "react-dropzone";
// Assets
import React from "react";

const DropZonefile = (props) => {
  const { content } = props;
  const { getRootProps, getInputProps } = useDropzone();
  return (
    <div
      className="flex h-full !w-[700px] cursor-pointer items-center justify-center rounded-xl border-dashed border-navy-700"
      {...getRootProps({ className: "dropzone" })}
    >
      <input {...getInputProps()} />
      <button className="h-full !w-full"> {content} </button>
    </div>
  );
};

export default DropZonefile;
