import React from 'react';
import { Link } from 'react-router';

const Banner1 = () => (
  <Link to="/share/interview">
    <img
      src="https://image.goodjob.life/banners/banner2_2x.jpg"
      alt="好工作評論網募資中"
      style={{ marginTop: '32px' }}
    />
  </Link>
);

export default Banner1;
