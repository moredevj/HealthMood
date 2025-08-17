import { useContext } from 'react';
import CartContext from '../components/CartProvider';

export function useCart() {
  return useContext(CartContext);
}
