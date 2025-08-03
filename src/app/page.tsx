'use client';

import { useScroll, useMotionValueEvent, LayoutGroup, useTransform, useMotionValue } from 'motion/react';
import * as motion from 'motion/react-client';
import { useEffect, useState } from 'react';
import Image from "next/image";
import Project from './components/Project';

function useScreenWidthMotionValue() {
  const screenWidth = useMotionValue(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    const updateWidth = () => {
      screenWidth.set(window.innerWidth);
    };

    window.addEventListener('resize', updateWidth);
    updateWidth(); // initial value

    return () => window.removeEventListener('resize', updateWidth);
  }, [screenWidth]);

  return screenWidth;
}

const projects = [
  {
    title: 'Alkhana Real Estate',
    description: 'A sleek and modern portfolio website built with React and TypeScript.',
    imageUrl: '/images/portfolio.png',
    demoUrl: 'https://www.alkhanarealestate.com/',
    codeUrl: '',
  },
  {
    title: 'Todo App',
    description: 'A simple todo app with local storage and filtering options.',
    imageUrl: '/images/todo.png',
    demoUrl: 'https://todoapp.com',
    codeUrl: 'https://github.com/yourusername/todo-app',
  },
];

export default function Home() {
  const { scrollY, scrollYProgress } = useScroll();
  const [_, setScrolled] = useState(false);
  const [snapActive, setSnapActive] = useState(false);
  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    if (progress >= 0.3 && !snapActive) {
      setSnapActive(true);
    } else if (progress < 0.3 && snapActive) {
      setSnapActive(false);
    }
  });
  const scale = useTransform(scrollYProgress, [0, 0.05], [1, 0.2]);
  const hopacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]); // From center to right

  const mopacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);
  const mtop = useTransform(scrollYProgress, [0, 0.05], ['0', '50%']);


  const screenWidth = useScreenWidthMotionValue();
  const responsiveHeight = useTransform(screenWidth, [320, 768, 1440], [500, 300, 280]);
  const height = useTransform(
    [scrollYProgress, responsiveHeight],
    ([scroll, rh]) => {
      const max = parseFloat(rh as string);
      return `${max - (max - 70) * Math.min(scroll as number / 0.05, 1)}px`;
    }
  );
  const [startLeft, setStartLeft] = useState(screenWidth.get() > 851 ? '20%' : '50%');
  const [startY, setStartY] = useState(screenWidth.get() > 851 ? '0px' : '100px');
  const [startX, setStartX] = useState(screenWidth.get() > 851 ? '82px' : '10px');
  const [startPadding, setStartPadding] = useState(height.get());
  const [endPadding, setEndPadding] = useState(`${parseFloat(height.get().split('p')[0]) + 30}px`);

  useMotionValueEvent(screenWidth, 'change', (val) => {
    setStartLeft(val > 851 ? '20%' : '50%');
    setStartY(val > 851 ? '0px' : '100px');
    setStartX(val > 851 ? '82px' : '10x');
    setStartPadding(height.get());
    setEndPadding(`${parseFloat(height.get().split('p')[0]) + 280}px`);
  });

  const left = useTransform(scrollYProgress, [0, 0.05], [startLeft, '10%']); // From center to right
  const menuRight = useTransform(scrollYProgress, [0, 0.05], [startX, startX]);
  const headerY = useTransform(scrollYProgress, [0, 0.05], [startY, '50%']);

  const profileTop = useTransform(
    [scrollYProgress, responsiveHeight],
    ([scroll, _]) => {
      const progress = Math.min(scroll as number / 0.05, 1);
      const offset = (-(200 / 2) + 5) * progress;

      return `${offset}px`;
    }
  );
  const paddingTop = useTransform(scrollYProgress, [0, 0.05], [startPadding, endPadding]);

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 50);
  });

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-blue-50 to-purple-100 p-8 font-sans">
      <LayoutGroup>
        <div className="">
          {/* Header with the big profile image */}

          <motion.nav
            layout
            layoutScroll
            style={{ height }}
            className="fixed left-1/2 -translate-x-1/2 top-5 xl:w-[50%] w-[85%] max-w-3xl rounded-xl bg-white/50 backdrop-blur-md shadow-lg border border-white/30 z-50"
          >
            <motion.div
              layout
              layoutScroll
              style={{ height }}
              className="px-6 py-3 relative">
              <motion.header style={{ opacity: hopacity, y: headerY, right: menuRight }} className="mt-4 absolute top-1/2 -translate-y-1/2 text-center">
                <h1 className="text-4xl font-bold text-gray-800">Hi, I&apos;m Michael Yirdaw</h1>
                <p className="text-lg text-gray-600 mt-2">Software Engineer</p>
              </motion.header>
              <motion.div style={{ opacity: mopacity, top: mtop, right: menuRight }} className="absolute top-1/2 -translate-y-1/2 text-gray-600 space-x-4">
                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">Contact</a>
              </motion.div>
              <motion.div
                layoutId="profile-photo"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                style={{ scale, left, top: profileTop, transformOrigin: 'center center' }}
                className="absolute -translate-x-1/2 mx-auto w-64 h-64 rounded-full overflow-hidden border-4 border-blue-300 shadow-lg">
                <Image src="/profile.webp" alt="Profile" width={512} height={512} className="object-cover" />
              </motion.div>
            </motion.div>
          </motion.nav>

          <motion.div style={{ paddingTop }} className='h-full'>
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">About Me</h2>
              <p className="text-gray-600 text-md">
                I&apos;m a recent Computer Science graduate from the University of Gondar with a strong interest in software engineering and modern web technologies.
                I enjoy solving real-world problems using clean, efficient code and have experience building responsive web applications using tools like
                React, Next.js, and Tailwind CSS. I&apos;m passionate about continuous learning, open-source collaboration, and writing maintainable, scalable software.
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="max-w-3xl mx-auto mt-10 bg-white rounded-xl shadow-md p-6"
            >
              <h2 className="text-2xl font-semibold text-gray-700 mb-6">Projects</h2>
              <div className="flex flex-col gap-6">
                {projects.map((proj, idx) => (
                  <Project key={idx} {...proj} />
                ))}
              </div>
            </motion.section>

            <footer className="text-center mt-12 text-sm text-gray-500 mb-20">
              <p>Crafted with love <span className="hidden">& GPT </span> | &copy; 2025 Michael Yirdaw</p>
            </footer>
          </motion.div>


        </div>
      </LayoutGroup>
    </div >
  );
}
