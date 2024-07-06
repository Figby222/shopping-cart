import "./StoreItem.css";
import PropTypes from "prop-types";

function StoreItem({ addToCartHandler }) {
    return (
        <>
        <label htmlFor="item-quantity">Item quantity</label>
        <input type="number" id="item-quantity" step="1" name="item-quantity" /> 
        <button onClick={() => addToCartHandler()}>Add to cart</button>
        </>
    );
};

StoreItem.propTypes = {
    addToCartHandler: PropTypes.func.isRequired, 
}

export default StoreItem;