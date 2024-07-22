import "./ShoppingCart.css";
import PropTypes from 'prop-types';

function ShoppingCart({ cart, removeFromCartHandler }) {
    return (
        <>
            <h3 className="shopping-cart-heading">Shopping Cart</h3>
            <p className="shopping-cart-item-count" aria-label="shopping cart item count">
                Item count: {cart.length}
            </p>
        </>
    );
}

ShoppingCart.propTypes = {
    cart: PropTypes.array.isRequired,
    removeFromCartHandler: PropTypes.func.isRequired
}

export default ShoppingCart;