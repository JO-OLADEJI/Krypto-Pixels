import React from 'react';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import styles from './Home.module.css';
import Roadmap from './Roadmap.jsx';

// images
import hunter from '../assets/hunter.png';
import mage from '../assets/mage.png';
import ninja from '../assets/ninja.png';
import warrior from '../assets/warrior.png';

const Home = (props) => {
  return (
    <main className={styles['home']}>
      <ParallaxProvider>
        <Parallax 
          y={[-30, 50]} 
          className={styles['hero']}>
          <div className={styles['background']}>
            <h2>Hero</h2>
          </div>
        </Parallax>

        <Parallax 
          y={[10, -10]} 
          className={`${styles['typ']} ${styles['hunter']}`}>
          <div className={styles['type']}>
            <div className={styles['nft-art']}>
              <img 
                src={hunter}
                alt="Hunter's image" 
              />
            </div>
            <div className={styles['nft-description']}>
              <h2>Hunter</h2>
              <p>
                The scouts of our domain, fast, at ease in nature, comfortable moving alone, good with beasts. They go ahead of our armies and find a way.
              </p>
            </div>
          </div>
        </Parallax>

        <Parallax 
          y={[5, -5]} 
          className={`${styles['typ']} ${styles['warrior']}`}>
          <div className={styles['type']}>
            <div className={styles['nft-art']}>
              <img 
                src={warrior}
                alt="Warrior's image" 
              />
            </div>
            <div className={styles['nft-description']}>
              <h2>Warrior</h2>
              <p>
                Drawn from space and time, strong, slight disorderly, at ease in chaos. They smash through opposition with zero fear or concern for personal safety.
              </p>
            </div>
          </div>
        </Parallax>

        <Parallax 
          y={[50, -50]} 
          className={`${styles['typ']} ${styles['mage']}`}>
          <div className={styles['type']}>
            <div className={styles['nft-art']}>
              <img 
                src={mage}
                alt="Mage's image" 
              />
            </div>
            <div className={styles['nft-description']}>
              <h2>Mage</h2>
              <p>
                Powerful and wise, they control the elements and know the future. Yet not they, but the Mysterious Higher Power they follow.
              </p>
            </div>
          </div>
        </Parallax>

        <Parallax 
          y={[-10, 10]} 
          className={`${styles['typ']} ${styles['ninja']}`}>
          <div className={styles['type']}>
            <div className={styles['nft-art']}>
              <img 
                src={ninja}
                alt="Ninja's image" 
              />
            </div>
            <div className={styles['nft-description']}>
              <h2>Ninja</h2>
              <p>
                Oh yes, we have ninjas.. invisible, quiet... neither seen or hears, assassins, spies, spies in disguise...
              </p>
            </div>
          </div>
        </Parallax>

        <Roadmap />
      </ParallaxProvider>
    </main>
  );
}
 
export default Home;