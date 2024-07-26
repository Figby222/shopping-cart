import "./ShoppingCart.css";
import PropTypes from 'prop-types';

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
                            <p className="item-title">Title: {item.title}</p>
                            <p className="item-quantity">Quantity: {item.quantity}</p>
                            <p className="price">Price: {item.price * item.quantity}</p>
                        </li>
                    )
                })}

            </ul>
        </>
    );
}

ShoppingCart.propTypes = {
    cart: PropTypes.array.isRequired,
    removeFromCartHandler: PropTypes.func.isRequired
}

export default ShoppingCart;