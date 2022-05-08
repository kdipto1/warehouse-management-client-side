import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
const Footer = () => {
  const today = new Date();
  const year = today.getFullYear();
  return (
    <div className="text-center bg-black text-white mt-3 py-2">
      <h6>Dipto &copy; {year}</h6>
      <h2>
        <FaFacebook /> <FaInstagram /> <FaTwitter />
      </h2>
    </div>
  );
};

export default Footer;