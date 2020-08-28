import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

export const Home = () => {
  return (
    <div>
      <Header />
      <div>
        <Link to='/accounts'>
          <button>Click here to Access your acount</button>
        </Link>
      </div>
      <Footer />
    </div>
  );
};