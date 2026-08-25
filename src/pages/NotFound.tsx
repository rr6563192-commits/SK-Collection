import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="bg-bg-deep min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <p className="eyebrow mb-4">404</p>
      <h1 className="heading-serif text-4xl text-text-primary mb-4">Page Not Found</h1>
      <p className="text-text-secondary mb-8">The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn-gold-solid">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
