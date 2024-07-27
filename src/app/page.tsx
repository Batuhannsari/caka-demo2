"use client";
import { products } from "./data";
import { HeroParallax } from "./ui/hero-parallax";

const Home = () => {
  return (
    <>
      <HeroParallax products={products} />
    </>
  );
};

export default Home;
