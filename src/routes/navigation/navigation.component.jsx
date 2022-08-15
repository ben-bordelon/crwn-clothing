import { Fragment, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { ReactComponent as CrwnLogo} from '../../assets/crown.svg'
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { useSelector } from 'react-redux'
import { CartContext } from '../../context/cart.context';
import {signOutUser} from '../../utils/firebase/firebase.utils'
import { NavigationContainer, LogoContainer, NavLink, NavLinksContainer } from './navigation.styles';
import { selectCurrentUser } from '../../store/user/user.selector';

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const { isCartOpen } = useContext(CartContext);
  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo className='logo'></CrwnLogo>
        </LogoContainer>
        <NavLinksContainer>
          <NavLink to='/shop'>
            SHOP
          </NavLink>
          {currentUser ? (
            <NavLink as='span' onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to='/auth'>
              SIGN IN
            </NavLink>
          )}
          <CartIcon></CartIcon>
        </NavLinksContainer>
        {isCartOpen && <CartDropdown></CartDropdown>}
      </NavigationContainer>
      <Outlet />
    </Fragment>
    )
};

export default Navigation;