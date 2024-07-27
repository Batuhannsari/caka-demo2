"use client";
import {
    MotionValue,
    motion,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../../../public/logo.png";
import TextGenerateEffect from "./text-generate-effect";

export const HeroParallax = ({
    products,
}: {
    products: {
        title: string;
        link: string;
        thumbnail: any;
    }[];
}) => {
    const firstRow = products.slice(0, 2);
    const secondRow = products.slice(2, 4);
    const ref = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

    const translateX = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, 1000]),
        springConfig
    );
    const translateXReverse = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, -1000]),
        springConfig
    );
    const rotateX = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [15, 0]),
        springConfig
    );
    const opacity = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
        springConfig
    );
    const rotateZ = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [20, 0]),
        springConfig
    );
    const translateY = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [-700, 0]),
        springConfig
    );
    return (
        <div
            ref={ref}
            className="min-h-screen py-40 overflow-hidden  antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
        >
            <Header />
            <motion.div
                style={{
                    rotateX,
                    rotateZ,
                    translateY,
                    opacity,
                }}
                className=""
            >
                <motion.div className="flex flex-row-reverse w-[50%] space-x-reverse space-x-16 mb-16">
                    {firstRow.map((product) => (
                        <ProductCard
                            product={product}
                            translate={translateX}
                            key={product.title}
                        />
                    ))}
                </motion.div>
                <motion.div className="flex float-end flex-row w-[50%] mb-16 space-x-16">
                    {secondRow.map((product) => (
                        <ProductCard
                            product={product}
                            translate={translateXReverse}
                            key={product.title}
                        />
                    ))}
                </motion.div>
                <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
                </motion.div>
            </motion.div>
        </div>
    );
};

export const Header = () => {
    const words = `Denizcilik sektöründeki uzmanlığımızla, Ocean&Co olarak siz değerli müşterilerimize güvenilir ve profesyonel hizmetler sunmaktan gurur duyuyoruz. Denizin engin dünyasında, ihtiyaçlarınıza uygun çözümler geliştirmek için buradayız.`;
    return (
        <>
            <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full  left-0 top-0" >
                <Image width={500} height={200} src={logo} alt="ocean&co" />
                <div className="max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200">
                    <TextGenerateEffect duration={2} filter={false} words={words} />
                </div>
            </div>
        </>
    );
};

export const ProductCard = ({
    product,
    translate,
}: {
    product: {
        title: string;
        link: string;
        thumbnail: string;
    };
    translate: MotionValue<number>;
}) => {
    return (
        <motion.div
            style={{
                x: translate,
            }}
            whileHover={{
                y: -20,
            }}
            key={product.title}
            className="group/product h-[30vw] w-[50vw] max-h-[315px] max-w-[560px] relative flex-shrink-0"
        >
            <Link
                href={product.link}
                className="block group-hover/product:shadow-2xl "
            >
                <Image
                    src={product.thumbnail}
                    layout="fill" // Makes the image fill the container
                    objectFit="cover" // Ensures the image covers the container while maintaining aspect ratio
                    objectPosition="center" // Positions the image as desired
                    alt={product.title}
                />
            </Link>
            <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
            <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
                {product.title}
            </h2>
        </motion.div>
    );
};
