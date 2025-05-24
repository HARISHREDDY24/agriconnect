import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";

const ImageUploader = ({ onImageCapture, onPermissionError, onUploadError }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      handleImageSelected(file);
    } else {
      onUploadError();
    }
  };

  const handleImageSelected = (file) => {
    try {
      onImageCapture(file);
    } catch (error) {
      console.error("Error processing image:", error);
      onUploadError();
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleImageSelected(file);
    } else {
      onUploadError();
    }
  };

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } 
      });
      
      setStream(mediaStream);
      setShowCamera(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      onPermissionError();
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    
    canvas.toBlob((blob) => {
      const file = new File([blob], "camera-capture.jpg", { type: "image/jpeg" });
      handleImageSelected(file);
      stopCamera();
    }, "image/jpeg");
  };

  return (
    <div className="w-full">
      {showCamera ? (
        <div className="relative rounded-lg overflow-hidden bg-black">
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            className="w-full h-64 object-cover"
          />
          
          <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center space-x-4">
            <button
              onClick={stopCamera}
              className="p-3 bg-white rounded-full shadow-elevation-2 text-error"
              aria-label="Cancel"
            >
              <Icon name="X" size={24} />
            </button>
            
            <button
              onClick={capturePhoto}
              className="p-4 bg-white rounded-full shadow-elevation-2 text-leaf"
              aria-label="Take photo"
            >
              <Icon name="Camera" size={32} />
            </button>
          </div>
        </div>
      ) : (
        <>
          <div 
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              isDragging ? "border-leaf bg-leaf bg-opacity-5" : "border-medium-gray"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Icon name="Upload" size={32} className="mx-auto mb-3 text-dark-gray" />
            <p className="text-dark-gray mb-2">Drag and drop an image here</p>
            <p className="text-sm text-dark-gray mb-4">or</p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={openFileDialog}
                className="btn-secondary flex items-center justify-center"
              >
                <Icon name="Image" size={18} className="mr-2" />
                Choose from Gallery
              </motion.button>
              
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={startCamera}
                className="btn-primary flex items-center justify-center"
              >
                <Icon name="Camera" size={18} className="mr-2" />
                Take a Photo
              </motion.button>
            </div>
            
            <input 
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </div>
          
          <p className="text-xs text-dark-gray mt-3 text-center">
            Supported formats: JPG, PNG, HEIC (max 10MB)
          </p>
        </>
      )}
    </div>
  );
};

export default ImageUploader;