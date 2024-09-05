import React from 'react';
import { motion } from 'framer-motion';
import { LinkIcon, QrCodeIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const features = [
  { name: 'Custom Short Links', icon: LinkIcon, description: 'Create memorable, branded short links' },
  { name: 'QR Code Generation', icon: QrCodeIcon, description: 'Generate QR codes for your shortened URLs' },
  { name: 'Click Analytics', icon: ChartBarIcon, description: 'Track and analyze your link performance' },
];

const Features = () => {
  return (
    <div className="py-12 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-text sm:text-4xl">
            Everything you need in a URL shortener
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-text">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-400">{feature.description}</dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Features;
