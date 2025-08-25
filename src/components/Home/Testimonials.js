import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote:
      'By making learning fun and rewarding, the BSP can help break down barriers and empower individuals to embrace Braille as a valuable tool for lifelong learning and independence.',
    author: 'Jon C. Harding, Ed.S.',
    role: 'Superintendent, Kansas State School for the Blind',
  },
  {
    quote:
      'Combines research, creation, innovation and forward-thinking solutions to address a need in the Braille instructional field.',
    author: 'Chris Cooke, ND',
    role: 'Vocational Rehabilitation Specialist, Oregon Commission for the Blind',
  },
  {
    quote:
      'I and a number of teachers that I spoke with see great expansive potential in this novel idea of Braille introduction.',
    author: 'Mark Anthony Ramirez',
    role: 'Career Education Instructor, Texas School for the Blind and Visually Impaired',
  },
  {
    quote:
      'The BSP’s innovative design and gamified approach align nicely with our mission to foster a love of learning through hands-on exploration and play.',
    author: 'Jon C. Harding, Ed.S.',
    role: 'Superintendent, Kansas State School for the Blind',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: 'easeOut' },
  }),
};

const Testimonials = () => {
  return (
    <section className="relative py-16 md:py-20">
      {/* soft gradient backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-blue-600/5 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
            What People Are Saying
          </h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            Educators and specialists on the Braille Skill Puzzle (BSP) and our play-first approach.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={i}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              className="relative group bg-white/90 backdrop-blur-md border border-slate-100 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all"
            >

              <p className="text-lg md:text-xl text-slate-700 leading-relaxed">
                {t.quote}
              </p>

              <footer className="mt-6 pt-6 border-t border-slate-100">
                <div className="text-slate-900 font-semibold">{t.author}</div>
                <div className="text-slate-500 text-sm">{t.role}</div>
              </footer>

              {/* subtle hover ring */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-blue-300/40 transition-all pointer-events-none"></div>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
