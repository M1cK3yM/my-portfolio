'use client';

import { useScroll, useMotionValueEvent, useTransform, useMotionValue, spring } from 'motion/react';
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
    description: 'Full stack property listing site with full-text search and booking features',
    imageUrl: 'https://res.cloudinary.com/dfrpkzq8p/image/upload/f_webp/v1754223230/alkhana-realestate_ogz6qe.png',
    demoUrl: 'https://www.alkhanarealestate.com/',
    codeUrl: '',
    techStack: ['Next.js', 'Tailwind CSS', 'MongoDB', 'Cloudinary', 'Node.js'],
    status: 'Live',
    type: 'Commercial Website',
  },
  {
    title: 'Interactive Lab Classroom Platform',
    description: 'Desktop app for real-time student monitoring, chat, quizzes and classroom control in computer labs.',
    imageUrl: 'https://res.cloudinary.com/dfrpkzq8p/image/upload/f_webp/v1754245511/interactive-lab_yci53x.png',
    demoUrl: '',
    codeUrl: '',
    techStack: ['Electron.js', 'React', 'Spring Boot', 'gRPC', 'Mediasoup', 'PostgreSQL', 'Node.js'],
    status: 'In Progress',
    type: 'Desktop Application',
  },
  {
    title: 'YearBook App',
    description: 'Digital year book app for graduating students to share photos, memories, and farewell messages.',
    imageUrl: 'https://res.cloudinary.com/dfrpkzq8p/image/upload/v1754226125/yearbook_y3mrnb.png',
    demoUrl: '',
    codeUrl: '',
    techStack: ['Flutter'],
    status: 'Completed',
    type: 'Mobile App',
  },
  {
    title: 'UniHub (Educational Resource and Tutorial Platform)',
    description: '',
    imageUrl: 'https://res.cloudinary.com/dfrpkzq8p/image/upload/f_webp/v1754297390/unihub_oawvhm.png',
    demoUrl: 'https://unihub-ethiopia.vercel.app/',
    codeUrl: 'https://github.com/M1cK3yM/Education_Resources_and_Tutorial_Platform',
    techStack: ['React', 'Express.js', 'Node.js', 'MongoDB'],
    status: 'Live',
    type: 'Website',
  },
  {
    title: 'Keno App (inspired by Kiron Interactive)',
    description: 'Virtual betting desktop app simulating the Keno lottery style number draw game',
    imageUrl: 'https://res.cloudinary.com/dfrpkzq8p/image/upload/f_webp/v1754246216/keno_irfbne.png',
    demoUrl: '',
    codeUrl: '',
    techStack: ['Electron.js', 'React', 'Node.js'],
    status: 'Completed',
    type: 'Desktop Game',
  },
  {
    title: 'Bingo App',
    description: 'Classic Bingo game application with multiplier game interface',
    imageUrl: 'https://res.cloudinary.com/dfrpkzq8p/image/upload/f_webp/v1754295043/bingo-cpl_yvd7vu.jpg',
    demoUrl: '',
    codeUrl: '',
    techStack: ['Tauri', 'React', 'Rust'],
    status: 'Completed',
    type: 'Desktop Game',
  },
];

export default function Home() {
  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (index: number) =>
      ({ opacity: 1, x: 0, transition: { duration: 0.3, type: spring, dumping: 20, stiffness: 40, delay: (index + 1) * 0.3 } }),
    exit: { opacity: 0, y: 30, transition: { duration: 0.4 } }
  };

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
              I&apos;m a Full Stack Developer with a strong foundation in building interactive scalable web and desktop applications.
              With hands-on experience in modern technologies like React, Next.js, Node.js, Echo, Tauri, Flutter, Spring Boot.....
              I&apos;ve built projects ranging from educational platforms and networks monitoring tools to real estate and e-commerce systems.
              I Love solving problems through code and continuously strive to learn new technologies to deliver impactful digital solutions.
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
                <motion.div
                  key={idx}
                  custom={idx + 1}
                  variants={itemVariants}
                  whileInView="visible"
                  initial="hidden"
                  viewport={{ once: true, amount: 0.3 }}
                  style={{ willChange: 'transform, opacity' }}
                >
                  <Project key={idx} {...proj} />
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="max-w-3xl mx-auto mt-10 bg-white rounded-xl shadow-md p-6"
          >
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Contact</h2>
            <form
              action="https://formspree.io/f/your-form-id" // Replace with your Formspree ID or backend route
              method="POST"
              className="space-y-5"
            >
              <div>
                <label htmlFor="name" className="block text-gray-600 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-600 mb-1">Message</label>
                <textarea
                  name="message"
                  id="message"
                  rows={5}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-indigo-500 text-white px-6 py-2 rounded-xl hover:bg-indigo-600 transition-colors"
                >
                  Send Message
                </button>
              </div>
            </form>
          </motion.section>
          <footer className="text-center mt-12 text-sm text-gray-500 mb-20">
            <p>Crafted with love <span className="hidden">& GPT </span> | &copy; 2025 Michael Yirdaw</p>
          </footer>
        </motion.div>


      </div>
    </div >
  );
}
