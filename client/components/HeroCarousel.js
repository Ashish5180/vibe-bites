'use client';

import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Link from 'next/link';
import Image from 'next/image';

const HeroCarousel = () => {
  const slides = [
    {
      id: 1,
      image: '/images/hero-snack-1.jpg',
      title: 'Bite into Happiness',
      subtitle: 'Crunchy, healthy, and 100% natural snacks',
      button: 'Shop Now',
      link: '/products',
    },
    {
      id: 2,
      image: '/images/hero-snack-2.jpg',
      title: 'Taste the Vibe',
      subtitle: 'Handcrafted snacks that love you back',
      button: 'Explore Flavors',
      link: '/products',
    },
    {
      id: 3,
      image: '/images/hero-snack-3.jpg',
      title: 'Free Shipping on Orders ₹500+',
      subtitle: 'Pan-India delivery in 3–5 days',
      button: 'Start Shopping',
      link: '/products',
    },
  ];

  return (
    <div className="w-full bg-[#FFF8ED]">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={4000}
        swipeable
        emulateTouch
      >
        {slides.map((slide) => (
          <div key={slide.id} className="relative h-[500px] w-full">
            <Image
              src={slide.image}  // <-- Use slide.image here
              alt={slide.title}
              fill
              style={{ objectFit: 'cover', filter: 'brightness(0.5)' }}
              priority={slide.id === 1}
            />
          <div className="absolute inset-0  bg-opacity-30 flex flex-col items-center justify-center text-center text-white px-4">

              <h2 className="text-3xl md:text-5xl font-bold mb-4">{slide.title}</h2>
              <p className="text-lg md:text-xl mb-6">{slide.subtitle}</p>
              <Link href={slide.link}>
                <button className="bg-[#D9A066] hover:bg-[#c48841] transition px-6 py-3 rounded-full text-white font-semibold">
                  {slide.button}
                </button>
              </Link>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
