import { products } from "@/data/products";
import { HeroParallax } from "./ui/hero-parallax";

const Home = () => {
  return (
    <>
      <HeroParallax products={products} />
    </>
  );
};

export const Page = Home; // Adlandırılmış export
export default Home; // Varsayılan export
