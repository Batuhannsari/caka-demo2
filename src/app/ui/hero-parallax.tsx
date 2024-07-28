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
        useTransform(scrollYProgress, [0, 1], [0, window.innerWidth < 640 ? 0 : 160]),
        springConfig
    );
    const translateXReverse = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, window.innerWidth < 640 ? 0 : -160]),
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
        useTransform(scrollYProgress, [0, 0.2], [-500, -50]),
        springConfig
    );
    return (
        <div
            ref={ref}
            className="min-h-[140vh] overflow-hidden antialiased relative flex flex-col items-center [perspective:1000px] [transform-style:preserve-3d]"
        >
            <Header />
            <motion.div
                style={{
                    rotateX,
                    rotateZ,
                    translateY,
                    opacity,
                }}
                className="h-full w-full flex-grow flex flex-col justify-center"
            >
                <motion.div className="flex flex-wrap justify-center space-x-0 sm:space-x-[3%] sm:mb-[3%] mb-0 w-full flex-col sm:flex-row items-center">
                    {firstRow.map((product) => (
                        <ProductCard
                            product={product}
                            translate={translateX}
                            key={product.title}
                        />
                    ))}
                </motion.div>
                <motion.div className="flex flex-wrap justify-center space-x-0 sm:space-x-[3%] sm:mb-[3%] mb-0 w-full flex-col sm:flex-row items-center">
                    {secondRow.map((product) => (
                        <ProductCard
                            product={product}
                            translate={translateXReverse}
                            key={product.title}
                        />
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
};

export const Header = () => {
    const words = `Denizcilik sektöründeki uzmanlığımızla, Ocean&Co olarak siz değerli müşterilerimize güvenilir ve profesyonel hizmetler sunmaktan gurur duyuyoruz. Denizin engin dünyasında, ihtiyaçlarınıza uygun çözümler geliştirmek için buradayız.`;
    return (
        <>
            <div className="max-w-7xl relative mx-auto py-[3%] md:py-[10%] px-[3%] w-full left-0 top-0">
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
            className="group/product relative flex-shrink-0 sm:w-[30%] w-[45%] max-w-xs md:max-w-[30%] pb-[3%] sm:pb-0"
        >
            <Link
                href={product.link}
                className="block group-hover/product:shadow-2xl"
            >
                <div className="relative w-full pb-[56.23%]"> {/* 16:9 aspect ratio */}
                    <Image
                        src={product.thumbnail}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                        alt={product.title}
                    />
                </div>
            </Link>
            <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
            <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
                {product.title}
            </h2>
        </motion.div>
    );
};
