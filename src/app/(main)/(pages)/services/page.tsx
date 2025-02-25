import React from 'react';
import FAQ from '@/components/question';

const ServicesPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Our Services</h1>
      <div className="w-full max-w-5xl">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Service 1</h2>
          <p className="text-gray-700 leading-tight">
            Description of Service 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Service 2</h2>
          <p className="text-gray-700 leading-tight">
            Description of Service 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Service 3</h2>
          <p className="text-gray-700 leading-tight">
            Description of Service 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      </div>
      <FAQ />
    </main>
  );
};

export default ServicesPage;
