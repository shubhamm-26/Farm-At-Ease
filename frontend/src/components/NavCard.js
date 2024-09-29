import Image from 'next/image';

const NavCard = ({ product }) => {
    console.log(product.image);
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg transition-transform transform hover:scale-105">
      <Image 
        src={product.image} 
        alt={product.name} 
        width={400} 
        height={300} 
        className="w-full h-48 object-cover"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-green-600">{product.name}</div>
        <p className="text-gray-700 text-base">
          {product.description}
        </p>
      </div>
    </div>
  );
};

export default NavCard;
