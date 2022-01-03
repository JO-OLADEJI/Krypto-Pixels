import React from 'react';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import styles from './Home.module.css';
import Roadmap from './Roadmap.jsx';

const Home = (props) => {
  return (
    <main className={styles['home']}>
      <ParallaxProvider>
        <Parallax 
          y={[-50, 50]} 
          className={styles['hero']}>
          <div className={styles['background']}>
            <h1>Hero</h1>
          </div>
        </Parallax>

        {/* <Parallax y={[-20, 20]} className={styles['big-logo']}>
          <img 
            src="" 
            alt="" 
          />
        </Parallax> */}

        <Parallax 
          y={[10, -10]} 
          className={`${styles['typ']} ${styles['hunter']}`}>
          <div className={styles['type']}>
            <h2>Hunter</h2>
          </div>
        </Parallax>

        <Parallax 
          y={[5, -5]} 
          className={`${styles['typ']} ${styles['warrior']}`}>
          <div className={styles['type']}>
            <h2>Warrior</h2>
          </div>
        </Parallax>

        <Parallax 
          y={[50, -50]} 
          className={`${styles['typ']} ${styles['mage']}`}>
          <div className={styles['type']}>
            <h2>Mage</h2>
          </div>
        </Parallax>

        <Parallax 
          y={[-10, 10]} 
          className={`${styles['typ']} ${styles['ninja']}`}>
          <div className={styles['type']}>
            <h2>Ninja</h2>
          </div>
        </Parallax>

        <Roadmap />
      </ParallaxProvider>
    </main>
  );
}
 
export default Home;