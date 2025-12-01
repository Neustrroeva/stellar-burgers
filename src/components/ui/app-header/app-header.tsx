import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({
  userName,
  location,
  handleMenuClick,
  handleLogout
}) => {
  const isConstructorActive =
    location.pathname === '/' || location.pathname.startsWith('/ingredients');
  const isFeedActive = location.pathname.startsWith('/feed');
  const isProfileActive =
    location.pathname.startsWith('/profile') || location.pathname === '/login';

  const handleLogoClick = () => {
    handleMenuClick('/');
  };

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <Link
            to='/'
            className={`${styles.link} ${isConstructorActive ? styles.link_active : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleMenuClick('/');
            }}
          >
            <BurgerIcon type={isConstructorActive ? 'primary' : 'secondary'} />
            <p className='text text_type_main-default ml-2 mr-10'>
              Конструктор
            </p>
          </Link>
          <Link
            to='/feed'
            className={`${styles.link} ${isFeedActive ? styles.link_active : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleMenuClick('/feed');
            }}
          >
            <ListIcon type={isFeedActive ? 'primary' : 'secondary'} />
            <p className='text text_type_main-default ml-2'>Лента заказов</p>
          </Link>
        </div>
        <div
          className={styles.logo}
          onClick={handleLogoClick}
          style={{ cursor: 'pointer' }}
        >
          <Logo className='' />
        </div>
        <div className={styles.link_position_last}>
          <Link
            to={userName ? '/profile' : '/login'}
            className={`${styles.link} ${isProfileActive ? styles.link_active : ''}`}
            onClick={(e) => {
              e.preventDefault();
              if (userName) {
                handleMenuClick('/profile');
              } else {
                handleMenuClick('/login');
              }
            }}
          >
            <ProfileIcon type={isProfileActive ? 'primary' : 'secondary'} />
            <p className='text text_type_main-default ml-2'>
              {userName || 'Личный кабинет'}
            </p>
          </Link>
        </div>
      </nav>
    </header>
  );
};
