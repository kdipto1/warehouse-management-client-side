import React from 'react';
import "./NotFound.css"
import found from "../Images/found.png"

const NotFound = () => {
  return (
    <div className="not-found">
      <div>
        <h2 className="text-center mt-2">Page Not Found</h2>
        <img className="img-fluid found-img" src={found} alt="page not found" />
      </div>
    </div>
  );
};

export default NotFound;