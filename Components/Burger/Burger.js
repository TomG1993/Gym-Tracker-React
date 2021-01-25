// Burger.js
import React from 'react';
import { StyledBurger } from './Burger.styled';
import { bool, func } from 'prop-types';

const Burger = (props) => {
  return (
    <StyledBurger open={props.open} onClick={() => props.setOpen(!props.open)}>
      <div />
      <div />
      <div />
    </StyledBurger>
  )
}

Burger.propTypes = {
    open: bool.isRequired,
    setOpen: func.isRequired,
  };

export default Burger;