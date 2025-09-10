import { useDropzone } from "react-dropzone";
// Assets
import React from "react";

const DropZonefile = (props) => {
  const { content, onDrop, accept } = props;
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
    multiple: false
  });
  return (
    <div
      className="flex h-full w-full cursor-pointer items-center justify-center rounded-xl border-dashed border-navy-700"
      {...getRootProps({ className: "dropzone" })}
    >
      <input {...getInputProps()} />
      <button className="h-full w-full"> {content} </button>
    </div>
  );
};

export default DropZonefile;
