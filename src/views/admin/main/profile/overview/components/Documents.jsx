import React from "react";
import Card from "components/card";
import { useAuthStore } from "stores/useAuthStore";
import { MdDownload, MdVisibility, MdImage } from "react-icons/md";

const Documents = () => {
  const { user } = useAuthStore();

  const handleDownload = (url, filename) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleView = (url) => {
    window.open(url, '_blank');
  };

  const renderDocument = (title, document, icon = MdImage) => {
    if (!document) return null;
    
    const IconComponent = icon;
    
    return (
      <div className="bg-white dark:bg-navy-600 rounded-xl p-4 border border-gray-200 dark:border-gray-500">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-100 dark:bg-brand-900 rounded-lg">
              <IconComponent className="w-5 h-5 text-brand-600 dark:text-brand-400" />
            </div>
            <div>
              <h4 className="font-semibold text-navy-700 dark:text-white">{title}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">{document.filename}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleView(document.path)}
              className="p-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
              title="View Document"
            >
              <MdVisibility className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDownload(document.path, document.filename)}
              className="p-2 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
              title="Download Document"
            >
              <MdDownload className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Uploaded: {new Date(document.uploadedAt?.$date || document.uploadedAt).toLocaleDateString()}
        </div>
      </div>
    );
  };

  if (user?.role !== 'seller' || !user?.documents) {
    return null;
  }

  const { documents } = user;

  return (
    <Card extra={"w-full h-full p-6"}>
      <div className="mb-6">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white mb-2">
          Business Documents
        </h4>
        <p className="text-gray-600 dark:text-gray-300">
          View and download your business verification documents
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderDocument(
          "Business Registration Certificate",
          documents.businessRegistrationCertificate,
          MdImage
        )}
        
        {renderDocument(
          "Bank Statement",
          documents.bankStatement,
          MdImage
        )}
        
        {renderDocument(
          "ID Proof",
          documents.idProof,
          MdImage
        )}
        
        {renderDocument(
          "Trading License",
          documents.tradingLicense,
          MdImage
        )}
      </div>

      {Object.keys(documents).length === 0 && (
        <div className="text-center py-8">
          <MdImage className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">No documents uploaded yet</p>
        </div>
      )}
    </Card>
  );
};

export default Documents;
