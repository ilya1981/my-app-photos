import React, { useState } from "react";

const PhotoManager = () => {
  const [previewUrls, setPreviewUrls] = useState([]);

  const fileToDataUrl = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.addEventListener("load", (evt) => {
        resolve(evt.currentTarget.result);
      });

      fileReader.addEventListener("error", (evt) => {
        reject(new Error(evt.currentTarget.error));
      });

      fileReader.readAsDataURL(file);
    });
  };

  const handleSelect = async (evt) => {
    const files = [...evt.target.files];
    const urls = await Promise.all(files.map((o) => fileToDataUrl(o)));
    setPreviewUrls((prevUrls) => [...prevUrls, ...urls]);
  };

  const handleRemove = (index) => {
    setPreviewUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
  };

  return (
    <div className="photo-manager">
      <label htmlFor="file-input" className="click-to-select">
        Click to select
        <input
          id="file-input"
          type="file"
          multiple
          accept="image/*"
          onChange={handleSelect}
        />
      </label>
      <div className="preview-container">
        {previewUrls.map((url, index) => (
          <div key={index} className="preview-item">
            <img src={url} alt={`preview-${index}`} className="preview-image" />
            <button
              onClick={() => handleRemove(index)}
              className="remove-button"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoManager;
