import './CartItem.css';
import PropTypes from 'prop-types';
function CartItem({ itemId, itemTitle, itemQuantity, removeFromCartHandler }) {
    return (<></>);
}

CartItem.propTypes = {
    itemId: PropTypes.number.isRequired,
    itemTitle: PropTypes.string.isRequired,
    itemQuantity: PropTypes.number.isRequired,
    removeFromCartHandler: PropTypes.func.isRequired
}

export default CartItem;