import './CartItem.css';
import PropTypes from 'prop-types';
function CartItem({ id, itemTitle, itemQuantity, itemPrice, removeFromCartHandler }) {
    return (
        <> 
            <p className="item-quantity">Quantity: {itemQuantity}</p>
            <p className="item-title">Title: {itemTitle}</p>
            <p className="item-price">Price: {itemPrice * itemQuantity}</p>
            <button 
                type="button" 
                className="remove-from-cart" 
                aria-label="remove item from cart"
                onClick={() => removeFromCartHandler(id)}
            >
            X
            </button>
        </>
    );
}

CartItem.propTypes = {
    id: PropTypes.number.isRequired,
    itemTitle: PropTypes.string.isRequired,
    itemQuantity: PropTypes.number.isRequired,
    itemPrice: PropTypes.number.isRequired,
    removeFromCartHandler: PropTypes.func.isRequired
}

export default CartItem;