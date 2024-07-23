import './CartItem.css';
import PropTypes from 'prop-types';
function CartItem({ itemId, itemTitle, itemQuantity, removeFromCartHandler }) {
    return (
        <> 
            <p className="item-quantity">Quantity: {itemQuantity}</p>
            <p className="item-title">Title: {itemTitle}</p>
            <button 
                type="button" 
                className="remove-from-cart" 
                aria-label="remove item from cart"
                onClick={() => removeFromCartHandler(itemId)}
            >
            X
            </button>
        </>
    );
}

CartItem.propTypes = {
    itemId: PropTypes.number.isRequired,
    itemTitle: PropTypes.string.isRequired,
    itemQuantity: PropTypes.number.isRequired,
    removeFromCartHandler: PropTypes.func.isRequired
}

export default CartItem;