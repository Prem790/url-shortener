import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownTrayIcon, PlayIcon, SparklesIcon } from '@heroicons/react/24/outline';

const featuresYT = [
    {
      name: "Download Videos in Various Resolutions",
      icon: ArrowDownTrayIcon,
      description: "Choose from different video quality options for your downloads.",
    },
    {
      name: "Audio-Only Downloads",
      icon: PlayIcon,
      description: "Extract audio from videos and download in MP3 format.",
    },
    {
      name: "Fast Download Speeds",
      icon: SparklesIcon,
      description: "Enjoy quick download speeds with our optimized service.",
    },
  ];

const FeaturesYT = () => {
  return (
    <div className="py-12 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-text sm:text-4xl">
          Everything you need for downloading YouTube videos
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            {featuresYT.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.name}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="relative"
                >
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-text">{feature.name}</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-400">{feature.description}</dd>
                </motion.div>
              );
            })}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FeaturesYT;