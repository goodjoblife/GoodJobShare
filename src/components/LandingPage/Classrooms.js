import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router';

import SeeMoreButton from './SeeMoreButton';
import homeBanner from '../images/home-banner.png';
import styles from './Classrooms.module.css';


const renderImages = images => (
  images.map(image => (
    <Link className={styles.classroom_image_item}>
      <img src={image} alt={image} />
    </Link>
  ))
);

const Classrooms = () => {
  const images = [homeBanner, homeBanner, homeBanner]; // FIXME

  return (
    <section className={cn(styles.classrooms_section, 'wrapper_l')}>
      <h2 className="subtitle">勞動小教室</h2>
      <div className={styles.classroom_images_wrapper}>
        {renderImages(images)}
      </div>
      <SeeMoreButton />
    </section>
  );
};


export default Classrooms;
