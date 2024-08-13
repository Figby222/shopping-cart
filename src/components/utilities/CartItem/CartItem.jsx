import './CartItem.css';
import PropTypes from 'prop-types';
function CartItem({ item, removeFromCartHandler }) {
    return (
        <> 
            <button 
                type="button" 
                className="remove-from-cart" 
                aria-label="remove item from cart"
                onClick={() => removeFromCartHandler(item.id)}
            >
            X
            </button>
            <h3 className="cart-item-title cart-item-attribute">{item.title}</h3>
            <p className="cart-item-quantity cart-item-attribute">
                <span className="cart-item-attribute-label">Quantity:</span>
                {item.quantity}
            </p>
            <p className="cart-item-price cart-item-attribute">
                <span className="cart-item-attribute-label">Price:</span>
                {item.price * item.quantity}
            </p>
        </>
    );
}

CartItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
    }),
    removeFromCartHandler: PropTypes.func.isRequired
}

export default CartItem;