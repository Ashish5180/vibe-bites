'use client';

import Image from 'next/image';
import Link from 'next/link';

const categories = [
  {
    id: 1,
    name: 'Dry Fruit Mixes',
    image: '/images/categories/dry-fruits.jpg',
    link: '/category/dry-fruits',
  },
  {
    id: 2,
    name: 'Roasted Snacks',
    image: '/images/categories/roasted.jpg',
    link: '/category/roasted-snacks',
  },
  {
    id: 3,
    name: 'Healthy Chips',
    image: '/images/categories/chips.jpg',
    link: '/category/healthy-chips',
  },
  {
    id: 4,
    name: 'Trail Mixes',
    image: '/images/categories/trail-mix.jpg',
    link: '/category/trail-mix',
  },
];

const DiscoverCategories = () => {
  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#D9A066] mb-10">
        Discover Categories
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={cat.link}
            className="group block overflow-hidden rounded-lg shadow-md hover:shadow-xl transition"
          >
            <div className="relative w-full h-44 sm:h-52">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="text-center py-4 bg-[#FFF8ED]">
              <h3 className="text-lg font-semibold text-[#333] group-hover:text-[#D9A066] transition">
                {cat.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default DiscoverCategories;
