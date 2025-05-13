import React, { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';

interface MenuProps {
  navbarOpen: boolean;
  setNavbarOpen: Dispatch<SetStateAction<boolean>>;
}

const Menu: React.FC<MenuProps> = ({ navbarOpen, setNavbarOpen }) => {
  return (
    <>
    
    </>
  );
};

export default Menu;