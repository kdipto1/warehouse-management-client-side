import React from 'react';
import { Bars } from 'react-loader-spinner';
import "react-loading-skeleton/dist/skeleton.css";

const Loading = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <Bars
        heigth="100"
        width="100"
        color="grey"
        ariaLabel="loading-indicator"
      />
    </div>
  );
};

export default Loading;