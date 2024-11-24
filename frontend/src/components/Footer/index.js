import React from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  const whatsappNumber = "5515997071717";
  const whatsappMessage =
    "Olá! Gostei do site desenvolvido. Podemos conversar ?";

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <footer className="bg-gray-100 flex justify-center items-center px-4 py-4">
      <p className="text-gray-700 mr-12">
        Desenvolvido por <b>Bruno Camerin Santarem</b>
      </p>
      <div className="flex space-x-4 mr-25">
        {/* WhatsApp */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-500 hover:text-green-700"
        >
          <WhatsAppIcon />
        </a>

        {/* Facebook */}
        <a
          href="https://web.facebook.com/bruno.santarem.3"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800"
        >
          <FacebookIcon />
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/brunosantarem/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-600 hover:text-pink-800"
        >
          <InstagramIcon />
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/bruno-camerin-santarem-bbb2aa1ab/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 hover:text-blue-900"
        >
          <LinkedInIcon />
        </a>

        {/* Github */}
        <a
          href="https://github.com/Bruzaum"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-800 hover:text-black"
        >
          <GitHubIcon />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
