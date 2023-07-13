import { createContext, ReactNode, useReducer } from 'react'
import { Product, State } from './types'
import { products } from './mockData'

type CartAction =
  | { type: 'ADD_TO_CART', product: Product }
  | { type: 'REMOVE_FROM_CART', productId: number }
  | { type: 'INCREASE_QUANTITY', productId: number }
  | { type: 'DECREASE_QUANTITY', productId: number }


interface CartProviderProps {
  children: ReactNode;
};

const initialState: State = {
  products,
  cart: [],
};

function cartReducer(state: State, action: CartAction): State {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { ...state, cart: [...state.cart, { ...action.product, quantity: 1 }] }
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(item => item.id !== action.productId) }
    case 'INCREASE_QUANTITY':
      return {
        ...state, cart: state.cart.map(item => item.id === action.productId ? {
          ...item, quantity: item.quantity + 1
        } : item)
      }
    case 'DECREASE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item => item.id === action.productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 }
          : item)
      }
    default:
      return state
  }
}

export const CartContext = createContext<{ state: State, dispatch: React.Dispatch<CartAction> } | undefined>(undefined)

export function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
}
