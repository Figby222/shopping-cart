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

Store.PropTypes = {
    cart: PropTypes.object.isRequired,
    addToCartHandler: PropTypes.func.isRequired,
}

export default Store;