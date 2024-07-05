import "./StoreItem.css";
import PropTypes from "prop-types";

function StoreItem({ addToCartHandler }) {
    return (
        <>
        <button onClick={() => addToCartHandler()}>Add to cart</button>
        </>
    );
};

StoreItem.propTypes = {
    addToCartHandler: PropTypes.func.isRequired, 
}

export default StoreItem;