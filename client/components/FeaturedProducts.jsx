import Link from 'next/link';
import Image from 'next/image';

const featuredProducts = [
  {
    id: 1,
    name: 'Crunchy Almond Snack',
    price: '₹299',
    image: '/images/product-almond.jpg',
    link: '/products/crunchy-almond-snack',
  },
  {
    id: 2,
    name: 'Spicy Trail Mix',
    price: '₹349',
    image: '/images/product-trailmix.jpg',
    link: '/products/spicy-trail-mix',
  },
  {
    id: 3,
    name: 'Organic Fruit Bites',
    price: '₹399',
    image: '/images/product-fruitbites.jpg',
    link: '/products/organic-fruit-bites',
  },
  {
    id: 4,
    name: 'Salted Cashew Nuts',
    price: '₹299',
    image: '/images/product-cashew.jpg',
    link: '/products/salted-cashew-nuts',
  },
];

const FeaturedProducts = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-[#D9A066]">
        Featured Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {featuredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
          >
            <div className="relative w-full h-48 sm:h-56 md:h-64">
              <Image
                src={product.image}
                alt={product.name}
                fill
                style={{ objectFit: 'cover' }}
                priority={product.id === 1}
              />
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-[#D9A066] font-bold text-xl mb-4">{product.price}</p>
              <Link href={product.link}>
                <button className="mt-auto w-full bg-[#D9A066] hover:bg-[#c48841] text-white py-2 rounded-md font-semibold transition">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
