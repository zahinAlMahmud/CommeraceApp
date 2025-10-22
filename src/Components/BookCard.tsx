import { Link } from 'react-router-dom';

interface BookCardProps {
  id: string;
  title: string;
  image: string;
  price: number;
}

const BookCard = ({ id, title, image, price }: BookCardProps) => {
  return (
    <Link to={`/books/${id}`} className="block border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
      <div className="w-full h-64 overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-700 font-medium">${price.toFixed(2)}</p>
      </div>
    </Link>
  );
};

export default BookCard;