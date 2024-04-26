import React from 'react';
import Footer from './Footer';

const marketplaceName = "Shoaib's Marketplace";
const marketplaceTagline = "Welcome to endless possibilities.";

function About() {
  return (
    <>
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
          About Us
        </h2>
        <div className="text-left text-gray-800 bg-gradient-to-b from-gray-100 to-gray-200 py-12 px-6 lg:px-24">
  <p className="text-lg mb-6">
    Welcome to <span className="font-bold">{marketplaceName}</span>, your premier destination for discovering unique and exceptional products that spark joy and inspire creativity.
  </p>
  <p className="text-lg mb-6">
    With a commitment to fostering connections between creators and consumers, our platform offers a diverse array of goods crafted with passion and innovation.
  </p>
  <p className="text-lg mb-6">
    Our mission is clear: to empower creators and entrepreneurs to share their talents with the world while offering customers unparalleled access to a curated selection of exceptional products.
  </p>
  <p className="text-lg mb-6">
    We prioritize authenticity, sustainability, and inclusivity, striving to cultivate a vibrant community where everyone feels valued and inspired to explore.
  </p>
  <p className="text-lg mb-6">
    Committed to excellence in every aspect, our team endeavors to provide a seamless and enjoyable shopping experience.
  </p>
  <p className="text-lg mb-6">
    Join us in celebrating the boundless possibilities of creativity, supporting small businesses, and discovering the extraordinary.
  </p>
  <p className="text-lg">
    Welcome to <span className="font-bold">{marketplaceName}</span>, where innovation meets inspiration, and where the extraordinary awaits. {marketplaceTagline}
  </p>
</div>

      </div>
    </section>
    <Footer></Footer>
    </>
  );
}

export default About;