import './CartItem.css';
import PropTypes from 'prop-types';
function CartItem({ item, removeFromCartHandler }) {
    return (
        <> 
            <p className="item-quantity">Quantity: {item.quantity}</p>
            <p className="item-title">Title: {item.title}</p>
            <p className="item-price">Price: {item.price * item.quantity}</p>
            <button 
                type="button" 
                className="remove-from-cart" 
                aria-label="remove item from cart"
                onClick={() => removeFromCartHandler(item.id)}
            >
            X
            </button>
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