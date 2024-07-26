import "./Store.css";
import ShoppingCart from "../ShoppingCart/ShoppingCart.jsx";
import PropTypes from "prop-types";


function Store({ cart, addToCartHandler }) {
    const removeFromCartHandler = () => {}

    return (
        <>
            <h2>Store</h2>
            <aside>
                <ShoppingCart cart={cart} removeFromCartHandler={removeFromCartHandler}/>
            </aside>
        </>
    );
}

Store.propTypes = {
    cart: PropTypes.object.isRequired,
    addToCartHandler: PropTypes.func.isRequired,
}

export default Store;