import React from 'react';
import {Link} from 'react-router-dom';

import Button from "../common/Button";

import Logo from './logo.gif';

import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className="wrapper">
        <div className={styles.header__content}>
          <div className={`${styles.header__section} ${styles.header__section_links}`}>
            <Button className={`button ${styles.header__account_button}`}>
              <svg width="20" height="20" role="presentation" focusable="false" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M4 5a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 6a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2zm7-7a1 1 0 00-1 1v2a1 1 0 001 1h2a1 1 0 001-1V5a1 1 0 00-1-1h-2zm-1 7a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2zm7-7a1 1 0 00-1 1v2a1 1 0 001 1h2a1 1 0 001-1V5a1 1 0 00-1-1h-2zm-1 7a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2zM5 16a1 1 0 00-1 1v2a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 00-1-1H5zm5 1a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2zm7-1a1 1 0 00-1 1v2a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 00-1-1h-2z" fill="currentColor" />
              </svg>
            </Button>

            <Button className={`button ${styles.header__account_button}`}>
              <svg width="20" height="20" role="presentation" focusable="false" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M3.586 10.414A2 2 0 003 11.828V19a2 2 0 002 2h5a1 1 0 001-1v-6h2v6a1 1 0 001 1h5a2 2 0 002-2v-7.172a2 2 0 00-.586-1.414l-7.707-7.707a1 1 0 00-1.414 0l-7.707 7.707zM13 12a2 2 0 012 2v5h4v-7.172l-7-7-7 7V19h4v-5a2 2 0 012-2h2z" fill="currentColor" />
              </svg>
            </Button>

            <Button className={`button ${styles.header__account_button}`}>
              <svg width="20" height="20" role="presentation" focusable="false" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm2 1a1 1 0 011-1h4a1 1 0 011 1v10a1 1 0 01-1 1H6a1 1 0 01-1-1V6zm9-1a1 1 0 00-1 1v6a1 1 0 001 1h4a1 1 0 001-1V6a1 1 0 00-1-1h-4z" fill="currentColor" />
              </svg>

              <span className={styles.header__links_boards}>Доски</span>
            </Button>
          </div>

          <div className={`${styles.header__section} ${styles.header__section_logo}`}>
            <Link className={styles.header__logo} to='/'>
              <img
                src={Logo}
                alt="Logo"
              />
            </Link>
          </div>

          <div className={`${styles.header__section} ${styles.header__section_account}`}>
            <Button className={`button ${styles.header__account_button}`}>
              <svg width="20" height="20" role="presentation" focusable="false" viewBox="0 0 24 24">
                <path d="M12 3a1 1 0 00-1 1v7H4a1 1 0 100 2h7v7a1 1 0 102 0v-7h7a1 1 0 100-2h-7V4a1 1 0 00-1-1z" fill="currentColor" />
              </svg>
            </Button>

            <Button className={`button ${styles.header__account_button} ${styles.header__account_info_button}`}>
              <svg width="20" height="20" role="presentation" focusable="false" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 20a8 8 0 100-16 8 8 0 000 16zm0 2c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" fill="currentColor" />
                <path d="M11 11a1 1 0 112 0v5a1 1 0 11-2 0v-5zm2-3a1 1 0 11-2 0 1 1 0 012 0z" fill="currentColor" />
              </svg>
            </Button>

            <Button className={`button ${styles.header__account_button}`}>
              <svg width="20" height="20" role="presentation" focusable="false" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2a1 1 0 00-1 1v.078a4.687 4.687 0 00-1.867.715 4.51 4.51 0 00-1.527 1.76 5.914 5.914 0 00-.53 1.658A5.908 5.908 0 007 7.972V8h1-1v3.723l-2.857 4.762A1 1 0 005 18h14a1 1 0 00.858-1.515L17 11.723V8h-1l1-.001v-.027a2.613 2.613 0 00-.01-.215 5.901 5.901 0 00-.066-.546 5.913 5.913 0 00-.53-1.658 4.51 4.51 0 00-1.527-1.76A4.687 4.687 0 0013 3.078V3a1 1 0 00-1-1zM9 7.988V12a1 1 0 01-.143.514L6.767 16h10.467l-2.092-3.486A1 1 0 0115 12V7.988l-.005-.089a3.903 3.903 0 00-.044-.36 3.92 3.92 0 00-.345-1.092 2.512 2.512 0 00-.848-.99C13.378 5.203 12.825 5 12 5s-1.377.203-1.758.457a2.512 2.512 0 00-.848.99A3.918 3.918 0 009.05 7.54a3.911 3.911 0 00-.05.45zM14 19a2 2 0 11-4 0h4z" fill="currentColor" />
              </svg>
            </Button>

            <img
              className={styles.header__avatar}
              src="https://trello-members.s3.amazonaws.com/60058042b46eb66edeca586b/a96d6a3db08e0252d26932585362b287/50.png"
              alt="Avatar"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
