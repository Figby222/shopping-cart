import "./ShoppingCart.css";
import PropTypes from 'prop-types';
import CartItem from "../utilities/CartItem/CartItem";

function ShoppingCart({ cart, removeFromCartHandler }) {
    return (
        <>
            <h3 className="shopping-cart-heading">Shopping Cart</h3>
            <p className="shopping-cart-item-count">
                Item count: {cart.length}
            </p>
            <ul className="cart-items">
                {cart.map((item) => {
                    return (
                        <li className="cart-item" aria-label="cart item" key={item.id}>
                            <CartItem
                                item={item}
                                removeFromCartHandler={removeFromCartHandler}
                            />
                        </li>
                    )
                })}

            </ul>
            <p className="total-price">
                Total: {
                  cart.length === 0 ?
                  0 :
                  cart.reduce((acc, item) => {
                    return acc + item.price * item.quantity;
                  }, 0)
                }
            </p>
        </>
    );
}

ShoppingCart.propTypes = {
    cart: PropTypes.array.isRequired,
    removeFromCartHandler: PropTypes.func.isRequired
}

export default ShoppingCart;