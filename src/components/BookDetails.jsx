
import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function BookDetails({
  userName,
  title,
  category,
  authorName,
  coverImageUrl,
  pdfUrl,
}) {
  const [numPages, setNumPages] = useState(null);
  const [isPdfModalOpen, setPdfModalOpen] = useState(false);

  const onDocumentLoadSuccess = ({ numPages: nextNumPages }) => {
    setNumPages(nextNumPages);
  };

  const handlePdfModal = () => {
    setPdfModalOpen(!isPdfModalOpen);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg mt-8 mb-5 mx-auto max-w-2xl">
      <div className="flex flex-col md:flex-row">
        <div className="mb-4 md:mb-0 md:mr-6 flex-none">
          {coverImageUrl && (
            <img src={coverImageUrl} alt="Cover" className="rounded-lg shadow-md" style={{ height: '300px', width: '300px' }} />
          )}
         
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-3">{title}</h3>
            <p className="text-lg text-gray-700 mb-4"><span className="text-gray-900 font-medium">By:</span> {authorName}</p>
            <p className="text-gray-600"><span className="font-medium text-gray-900">Category:</span> {category}</p>
          </div>
          {pdfUrl && (
            <button onClick={handlePdfModal} className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg">
              View PDF
            </button>
          )}
        </div>
      </div>
      
      {isPdfModalOpen && (
        <div className=" fixed inset-0 z-50 overflow-auto bg-smoke-light  backdrop-blur-sm flex ">
          <div className="d-flex justify-content-center w-100">
                     
            <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
            <div className="text-center space-x-5 mt-5 ">
              <button onClick={() => setPdfModalOpen(false)} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 transition duration-300">
                Close
              </button>
              <a href={pdfUrl} download className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300">
                Download
              </a>
            </div> 
              {Array.from(new Array(numPages), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
              ))}
            </Document>

          </div>
        </div>
      )}

    </div>
  );
}

export default BookDetails;
