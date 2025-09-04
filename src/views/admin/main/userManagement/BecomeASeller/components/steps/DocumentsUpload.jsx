import { useState, useEffect } from 'react';
import { MdCloudUpload, MdDelete, MdInsertDriveFile } from 'react-icons/md';

const DocumentsUpload = ({ data, onDataChange, validationErrors = {}, onValidationChange }) => {
  const [errors, setErrors] = useState({});
  
  // Function to get merged errors
  const getAllErrors = () => ({ ...errors, ...validationErrors });

  // Function to check if all required documents are uploaded
  const areAllRequiredDocumentsUploaded = () => {
    return requiredDocuments.every(document => 
      data.documents?.[document.key] && !getAllErrors()[document.key]
    );
  };

  const requiredDocuments = [
    {
      key: 'businessRegistrationCertificate',
      label: 'Business Registration Certificate',
      description: 'Official certificate of business registration',
      required: true
    },
    {
      key: 'bankStatement',
      label: 'Bank Statement',
      description: 'Recent bank statement (last 3 months)',
      required: true
    },
    {
      key: 'idProof',
      label: 'ID Proof',
      description: 'National ID or Passport of business owner',
      required: true
    },
    {
      key: 'tradingLicense',
      label: 'Trading License',
      description: 'Valid trading license from local authority',
      required: true
    }
  ];

  const allDocuments = [...requiredDocuments];

  // Notify parent component about validation status whenever documents change
  useEffect(() => {
    if (onValidationChange) {
      const isValid = areAllRequiredDocumentsUploaded();
      onValidationChange(isValid);
    }
  }, [data.documents, errors, validationErrors, onValidationChange]);

  const handleFileUpload = (documentKey, file) => {
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, [documentKey]: 'File size must be less than 5MB' }));
        return;
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, [documentKey]: 'Only JPEG, PNG, and PDF files are allowed' }));
        return;
      }

      onDataChange({
        documents: {
          ...data.documents,
          [documentKey]: file
        }
      });

      // Clear error if file is valid
      if (getAllErrors()[documentKey]) {
        setErrors(prev => ({ ...prev, [documentKey]: null }));
      }
    }
  };

  const handleFileRemove = (documentKey) => {
    onDataChange({
      documents: {
        ...data.documents,
        [documentKey]: null
      }
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const FileUploadBox = ({ document }) => {
    const file = data.documents?.[document.key];
    const error = getAllErrors()[document.key];

    return (
      <div className={`border-2 border-dashed rounded-xl p-6 transition-colors ${
        error ? 'border-red-400 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 hover:border-brand-400'
      }`}>
        <div className="text-center">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-semibold text-navy-700 dark:text-white">
                {document.label}
                {document.required && <span className="text-red-500 ml-1">*</span>}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {document.description}
              </p>
            </div>
          </div>

          {!file ? (
            <div>
              <MdCloudUpload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <div className="mb-4">
                <label
                  htmlFor={`file-${document.key}`}
                  className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
                >
                  Choose File
                </label>
                <input
                  id={`file-${document.key}`}
                  type="file"
                  className="hidden"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={(e) => handleFileUpload(document.key, e.target.files[0])}
                />
              </div>
              <p className="text-xs text-gray-500">
                Supported formats: JPEG, PNG, PDF (Max 5MB)
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-between bg-gray-50 dark:bg-navy-800 rounded-lg p-3">
              <div className="flex items-center">
                <MdInsertDriveFile className="h-8 w-8 text-brand-500 mr-3" />
                <div className="text-left">
                  <p className="text-sm font-medium text-navy-700 dark:text-white truncate max-w-[200px]">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleFileRemove(document.key)}
                className="text-red-500 hover:text-red-700 p-1"
                title="Remove file"
              >
                <MdDelete className="h-5 w-5" />
              </button>
            </div>
          )}

          {error && (
            <p className="text-red-500 text-xs mt-2 font-medium">{error}</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="px-6 py-4">
      <h3 className="text-xl font-bold text-navy-700 dark:text-white mb-6">
        Documents Upload
      </h3>
      
      <div className="mb-6">
        <div className="bg-blue-50 dark:bg-navy-800 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
            Important Instructions:
          </h4>
          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <li>• All 4 documents are required for registration</li>
            <li>• Accepted formats: JPEG, PNG, PDF</li>
            <li>• Maximum file size: 5MB per document</li>
            <li>• Ensure all documents are clear and readable</li>
            <li>• Documents should be recent and valid</li>
          </ul>
        </div>
      </div>

      <div className="mb-8">
        <h4 className="text-lg font-semibold text-navy-700 dark:text-white mb-4 flex items-center">
          Required Documents
          <span className="text-red-500 ml-2">*</span>
        </h4>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {requiredDocuments.map((document) => (
            <FileUploadBox key={document.key} document={document} />
          ))}
        </div>
      </div>

      {/* Upload Progress Summary */}
      <div className="bg-gray-50 dark:bg-navy-800 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-navy-700 dark:text-white">
            Upload Summary
          </h4>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            areAllRequiredDocumentsUploaded()
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
              : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
          }`}>
            {areAllRequiredDocumentsUploaded() ? 'All Required Documents Uploaded' : 'Missing Required Documents'}
          </div>
        </div>
        <div className="space-y-2">
          {allDocuments.map((document) => {
            const file = data.documents?.[document.key];
            const isUploaded = !!file;
            
            return (
              <div key={document.key} className="flex items-center justify-between">
                <span className="text-sm text-navy-700 dark:text-white">
                  {document.label}
                  {document.required && <span className="text-red-500 ml-1">*</span>}
                </span>
                <span className={`text-xs px-2 py-1 rounded font-medium ${
                  isUploaded 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                    : document.required && getAllErrors()[document.key]
                    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 animate-pulse'
                    : document.required
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                }`}>
                  {isUploaded 
                    ? 'Uploaded' 
                    : document.required && getAllErrors()[document.key]
                    ? 'Missing!'
                    : document.required 
                    ? 'Required' 
                    : 'Optional'
                  }</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DocumentsUpload;
