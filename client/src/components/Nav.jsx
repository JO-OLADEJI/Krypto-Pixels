import React from 'react';
import styles from './Nav.module.css';
import { Link } from 'react-router-dom';
import openseaLogo from '../assets/opensea-logo.png';

const Nav = (props) => {
  return (
    <nav className={styles['nav']}>
      <div className={styles['socials']}>
        <a href="">
          <i className="fab fa-discord" />
        </a>
        <a href="">
          <i className="fab fa-twitter" />
        </a>
        <a href="https://opensea.io/" title="Buy on OpenSea" target="_blank">
          <img 
            className={styles['opensea-badge']}
            src="https://storage.googleapis.com/opensea-static/Logomark/Badge%20-%20Available%20On%20-%20BW.png" 
            alt="Available on OpenSea" 
          />
        </a>
      </div>
      <div className={styles['nav-links']}>
        <div className={styles['logo']}>
          <Link className={styles['logo-link']} to="/">
            <h2>Pixel Matrix</h2>
          </Link>
        </div>
        <div>
          <Link className={styles['link']} to="/mint">
            mint
          </Link>
          <Link className={styles['link']}>
            about
          </Link>
          <Link className={styles['link']}>
            team
          </Link>
          <Link className={styles['link']}>
            pitrix
          </Link>
        </div>
      </div>
      <div className={styles['btns']}>
        <button
          onClick={async (e) => {
            e.preventDefault();
            await props.connectWallet();
            console.log('connect wallet button pressed!');
          }}>
          {props.address === '' ? 'connect'
          :
          (props.address).substring(0, 5) + '....' + (props.address).substring(38)}
        </button>
      </div>
    </nav>
  );
}
 
export default Nav;