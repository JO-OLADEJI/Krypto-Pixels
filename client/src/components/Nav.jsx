import React from 'react';
import styles from './Nav.module.css';
import { Link } from 'react-router-dom';
import openseaLogo from '../assets/openseaLogo.png';

const Nav = (props) => {
  return (
    <nav className={styles['nav']}>
      <div className={styles['logo']}>
        <Link className={styles['logo-lk']} to="/">
          <h2>Pixel Matrix</h2>
        </Link>
      </div>
      <div className={styles['nav-links']}>
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
      <div className={styles['btns']}>
        <div className={styles['ext-links']}>
          <a href="">
            <i className="fab fa-discord" />
          </a>
          <a href="">
            <i className="fab fa-twitter" />
          </a>
          <a href="">
            <img src={openseaLogo} alt="opensea" />
          </a>
        </div>
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