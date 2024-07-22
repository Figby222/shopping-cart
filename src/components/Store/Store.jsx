import "./Store.css";
import ShoppingCart from "../ShoppingCart/ShoppingCart.jsx";
import PropTypes from "prop-types";

function Store({ cart, addToCartHandler }) {
    return (
        <>
            <h2>Store</h2>
            <aside>
                <ShoppingCart />
            </aside>
        </>
    );
}

Store.propTypes = {
    cart: PropTypes.object.isRequired,
    addToCartHandler: PropTypes.func.isRequired,
}

export default Store;