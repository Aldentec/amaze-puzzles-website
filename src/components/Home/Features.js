import React from 'react';
import { Eye, Heart, Users, Zap, Award, Shield } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Eye,
      title: 'Accessibility',
      description: 'Ensuring that all users, regardless of ability, can easily engage with our puzzles.',
      whyItApplies: 'Our products are designed with features like tactile feedback, making them accessible and usable for individuals with visual impairments, including those learning Braille.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Heart,
      title: 'Engaging',
      description: 'Our puzzles are designed to capture and retain interest, making learning an enjoyable and captivating experience.',
      whyItApplies: 'With interactive elements and challenging tasks, our puzzles keep learners engaged, boosting retention and making learning fun.',
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: Users,
      title: 'Entertaining',
      description: 'Ensuring learning is not just educational but also fun, enhancing the overall experience.',
      whyItApplies: 'We blend educational goals with playful design, ensuring that while learners gain skills, they are also entertained, making education enjoyable.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Zap,
      title: 'Empowerment',
      description: 'Equipping learners with tools to succeed and gain independence through enhanced educational outcomes.',
      whyItApplies: 'Our puzzles do more than entertain; they build confidence and critical life skills, empowering users to navigate the world more effectively. This includes learning essential skills like Braille.',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: Award,
      title: 'Gamification',
      description: 'Transforming learning into an engaging challenge through puzzle-solving elements and tactile exploration.',
      whyItApplies: 'Our puzzles incorporate game-like features such as shape matching and spatial problem-solving. These elements make learning an interactive adventure, motivating users to improve their skills.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Shield,
      title: 'Inclusivity',
      description: 'Creating products that cater to a diverse range of learners, promoting equal learning opportunities.',
      whyItApplies: 'Amaze Puzzles embraces differences, designing tools that adapt to various learning needs and abilities, helping every user feel included.',
      color: 'from-teal-500 to-teal-600'
    }
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Key Features of Our
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Braille Puzzle
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Discover what makes our educational puzzles uniquely effective for enhancing Braille literacy and supporting diverse learners.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100"
            >
              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-slate-600 mb-6 leading-relaxed">
                {feature.description}
              </p>

              {/* Why it applies */}
              <div className="pt-6 border-t border-slate-100">
                <p className="text-sm font-semibold text-slate-700 mb-2">
                  Why it applies:
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {feature.whyItApplies}{' '}
                  <a 
                    href={feature.title === 'Inclusivity' ? '/about' : '/products'} 
                    className="text-blue-600 hover:text-blue-700 font-medium underline decoration-blue-200 hover:decoration-blue-300 transition-colors inline-flex items-center"
                  >
                    Learn more
                  </a>
                </p>
              </div>

              {/* Decorative gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;