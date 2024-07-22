import './CartItem.css';
import PropTypes from 'prop-types';
function CartItem({ itemId, itemTitle, itemQuantity, removeFromCartHandler }) {
    return (
        <> 
            <p className="item-quantity" aria-label="item quantity">{itemQuantity}</p>
            <p className="item-title" aria-label="item title">{itemTitle}</p>
            <button 
                type="button" 
                className="remove-from-cart" 
                aria-label="remove item from cart"
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