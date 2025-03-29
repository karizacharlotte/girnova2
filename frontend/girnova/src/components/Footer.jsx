import React from "react";

export default function Footer() {
  return (
    <footer
      className="relative text-white py-12 px-6"
      style={{
        backgroundImage: "url('images/girls.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
 
 <div className="absolute inset-0 bg-[#155DFC] opacity-80"></div>

<div className="relative z-10 max-w-6xl mx-auto">
  <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

    <div className="space-y-4">
      <h3 className="text-lg font-bold text-black">About Girnova</h3>
      <p>
      Join us in empowering young girls across Africa with the skills, mentorship, and opportunities to succeed in tech.
      </p>
    </div>

    <div>
      <h3 className="text-lg font-bold mb-4 text-black">Quick Links</h3>
      <ul className="space-y-2">
        {["Home", "About Us", "Events", "Blog", "Contact"].map((item, index) => (
          <li key={index}>
            <a href="#" className="hover:text-black">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>

    <div>
      <h3 className="text-lg font-bold mb-4 text-black">Get In Touch</h3>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <span>Kigali, Rwanda</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>+250 798895020</span>
        </div>
        <div className="flex items-center space-x-2">
          <a href="mailto:info@girnova.com" className="hover:text-black">
            info@girnova.com
          </a>
        </div>
      </div>
    </div>

    <div>
      <h3 className="text-lg font-bold mb-4 text-black">Stay Updated</h3>
      <p>
        Subscribe to our newsletter for the latest tech opportunities and events.
      </p>
      <input
        type="email"
        placeholder="Enter Your Email"
        className="w-full bg-transparent border border-gray-700 px-4 py-2 rounded focus:outline-none focus:border-[#155DFC] mt-2"
      />
      <button className="bg-[#155DFC] hover:bg-[#155DFC] text-white w-full px-4 py-2 mt-4 rounded-lg">
        Subscribe Now
      </button>
    </div>
  </div>

  <div className="border-t border-gray-800 pt-6 mt-8 flex flex-col md:flex-row justify-between items-center">
    <p>© 2025 Girnova. All Rights Reserved.</p>
    <div className="flex space-x-4 mt-4 md:mt-0">
      {["Twitter", "Facebook", "LinkedIn", "Email"].map((platform, index) => (
        <a key={index} href="#" className="hover:text-black">
          {platform}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
