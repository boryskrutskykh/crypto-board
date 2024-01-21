import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p>Copyright &copy; {new Date().getFullYear()} <a href="https://sovarious.com"
                                                              target="_blank">SoVarious.com</a></p>
        </footer>
    );
};

export default Footer;
