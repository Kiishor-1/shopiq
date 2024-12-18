import React from "react";
import { footerData } from "@/helpers/data";
import { FaFacebookMessenger, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 py-8 px-4">
      <section className="md:max-w-[80%] w-full mx-auto">
        <div className="mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {footerData.map((section, index) => (
            <div
              key={index}
              className={`${
                section.text ? "md:col-span-4" : ""
              }`}
            >
              <h4 className="font-bold text-lg mb-4">{section.title}</h4>

              {section.links?.length > 0 && (
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>{link}</li>
                  ))}
                </ul>
              )}

              {section.images?.length > 0 && (
                <div className="flex space-x-4 mb-6">
                  {section.images.map((image, imageIndex) => (
                    <img
                      key={imageIndex}
                      src={image.src}
                      alt={image.alt}
                      className="w-50 cursor-pointer"
                    />
                  ))}
                </div>
              )}

              {section.social?.length > 0 && (
                <div className="flex space-x-4">
                  <FaFacebookMessenger fontSize="1.4rem" className="hover:scale-110 cursor-pointer transition duration-300" />
                  <FaTwitter fontSize="1.4rem" className="hover:scale-110 cursor-pointer transition duration-300" />
                  <FaInstagram fontSize="1.4rem" className="hover:scale-110 cursor-pointer transition duration-300" />

                  <FaYoutube fontSize="1.4rem" className="hover:scale-110 cursor-pointer transition duration-300" />
                </div>
              )}

              {section.text && (
                <section className="text-sm text-gray-600 w-full mx-auto flex flex-wrap gap-2">
                  {section?.text.map((item, id) => (
                    <span key={id} className="block">
                      {item} {id !== section?.text.length-1 ? '| ':''}
                    </span>
                  ))}
                </section>
              )}
            </div>
          ))}
        </div>

        <hr className="my-8" />

        <div className="container mx-auto text-center text-sm mt-8 text-gray-600">
          <p>
            In case of any concern,{" "}
            <span className="text-blue-600 cursor-pointer">Contact Us</span>
          </p>
          <p>© 2024 www.shopiQ.com. All rights reserved.</p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
