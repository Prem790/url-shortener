import React from 'react';
import { motion } from 'framer-motion';
import { LinkIcon, PencilSquareIcon, ChartBarIcon, UserPlusIcon } from '@heroicons/react/24/outline';

const dashboardFeatures = [
    {
      name: "Link Management",
      icon: LinkIcon,
      description: "Display both original and shortened links for easy access and management.",
    },
    {
      name: "Edit & Delete Controls",
      icon: PencilSquareIcon,
      description: "Convenient action buttons for editing or removing your shortened links.",
    },
    {
      name: "Detailed Analytics",
      icon: ChartBarIcon,
      description: "Track performance with comprehensive click analytics for each shortened link.",
    },
    {
      name: "One-Click Authentication",
      icon: UserPlusIcon,
      description: "Seamlessly login or register using Google authentication with just one click.",
    },
];

const DashboardFeatures = () => {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-500 font-semibold tracking-wide uppercase">Dashboard Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Power at Your Fingertips
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-400 lg:mx-auto">
            Our powerful dashboard puts you in control with these amazing features
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {dashboardFeatures.map((feature, index) => {
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
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-white">{feature.name}</p>
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

export default DashboardFeatures;