import React, { useState, useEffect } from 'react';
import bannerimage from '../assets/bannerimage.jpg'
import { Link } from 'react-router-dom'

const AnimatedText = ({ words }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    const animationInterval = setInterval(() => {
      if (currentCharacterIndex <= words[currentWordIndex].length) {
        setDisplayedText(words[currentWordIndex].slice(0, currentCharacterIndex));
        setCurrentCharacterIndex(prevIndex => prevIndex + 1);
      } else {
        setCurrentCharacterIndex(0);
        setTimeout(() => {
          setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, 100); // Delay before starting the next word animation
      }
    }, 150); // Speed of animation (milliseconds per character)

    return () => clearInterval(animationInterval);
  }, [currentCharacterIndex, currentWordIndex, words]);

  return (
    <span className="relative">
      <span className="lg:text-4xl sm:text-sm md:text-sm text-black font-bold">
        {displayedText}
      </span>
      <span className="absolute bottom-0 left-0 h-1 w-full bg-blue-500"></span>
    </span>
  );
};
const HeroBanner = () => {
  const animatedWords = ["Explore New Products", "Engage with Customers", "Optimize Order Management"];

  return (
    <div className="relative bg-gray-900">
      <img
        className="object-cover w-full h-64 sm:h-96 md:h-screen"
        src={bannerimage}
        alt="Hero Banner"
      />
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="text-center">

          <h1 className="text-4xl sm:text-5xl md:text-6xl text-white font-bold mb-4">Your Awesome Product</h1>
          <Link to={'/products'} className='mb-5'>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Buy Now</button>
          </Link>
          <div className='h-5 lg:mt-32'>
            <AnimatedText words={animatedWords} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;