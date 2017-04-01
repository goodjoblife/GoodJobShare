import React from 'react';
import { Link } from 'react-router';
import SeeMoreButton from './SeeMoreButton';
import homeBanner from '../images/home-banner.png';
import styles from './Classrooms.module.css';

const renderImages = images => (
  images.map((image, index) => (
    <Link key={index} className={styles.classroom_image_item}>
      <img src={image} alt={image} />
    </Link>
  ))
);

const Classrooms = () => {
  const images = [homeBanner, homeBanner, homeBanner]; // FIXME

  return (
    <section className={styles.classrooms_section}>
      <div className="wrapperL">
        <h2 className="headingStyle">勞動小教室</h2>
        <div className={styles.classroom_images_wrapper}>
          {renderImages(images)}
        </div>
        <SeeMoreButton />
      </div>
    </section>
  );
};

export default Classrooms;
