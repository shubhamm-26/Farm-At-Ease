import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto flex justify-around items-start">
        <div className="flex flex-col space-y-2">
          <h5 className="font-bold underline">Links</h5>
          <Link href="/fruits" > Fruits </Link>
            <Link href="/vegetables" > Vegetables </Link>
        </div>

        <div className="flex flex-col space-y-2">
          <h5 className="font-bold underline">Contact Us</h5>
          <a href="mailto:support@farmerscare.com" className="hover:underline">Email: support@farmatease.com</a>
          <a href="tel:+1234567890" className="hover:underline">Phone: +123 456 7890</a>
        </div>

        <div className="flex flex-col space-y-2">
          <h5 className="font-bold underline">Follow Us</h5>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-xl hover:text-gray-400" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-xl hover:text-gray-400" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-xl hover:text-gray-400" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
