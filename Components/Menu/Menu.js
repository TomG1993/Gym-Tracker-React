// Menu.js
import React from 'react';
import { StyledMenu } from './Menu.styled';
import { bool } from 'prop-types';

const Menu = (props) => {

    const clickHandler = (newPage) => {
        props.onChangePage(newPage);
    }

  return (
    <StyledMenu open={props.open}>
      <div onClick={() => clickHandler("overview")}>
        <span  role="img" aria-label="overview">&#x1f3cb;</span>
        Overview
      </div>
      <div onClick={() => clickHandler("profile")}>
        <span  role="img" aria-label="price">&#x1f4aa;</span>
        Profile
        </div>
      <div>
        <span role="img" aria-label="stats">&#x1f4b9;</span>
        Stats
        </div>
    </StyledMenu>
  )
}

Menu.propTypes = {
    open: bool.isRequired,
  }
export default Menu;