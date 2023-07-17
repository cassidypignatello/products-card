import { useContext } from 'react';
import { CartContext } from './CartContext';
import { CartItem, Product } from './types';

export function App() {
  const { state } = useContext(CartContext)!;
  return (
    <div className="container py-3">
      <h2>Products</h2>
      <div className="row">
        {state.products.map(product => (
          <div className="col-md-4" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <hr />

      <h2>Cart</h2>
      {state.cart.map(item => (
        <div className="container py-3">
          <CartItemCard key={item.id} item={item} />
        </div>
      ))}
    </div>
  );
}

type ProductCardProps = {
  product: Product;
};

function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useContext(CartContext)!;
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{product.price}</h6>
        <button className="btn btn-primary" onClick={() => dispatch({ type: 'ADD_TO_CART', product })}>
          Add to cart
        </button>
      </div>
    </div>
  );
}

type CartItemCardProps = {
  item: CartItem;
};

function CartItemCard({ item }: CartItemCardProps) {
  const { dispatch } = useContext(CartContext)!;
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{item.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">${(item.price * item.quantity).toFixed(2)}</h6>
        <p className="card-text">Quantity: {item.quantity}</p>
        <div className="d-flex justify-content-between align-items-center">
          <div className="btn-group">
            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => dispatch({ type: "DECREASE_QUANTITY", productId: item.id })}>-</button>
            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => dispatch({ type: "INCREASE_QUANTITY", productId: item.id })}>+</button>
          </div>
          <button type="button" className="btn btn-sm btn-danger" onClick={() => dispatch({ type: "REMOVE_FROM_CART", productId: item.id })}>Remove</button>
        </div>
      </div>
    </div>
  );
}
