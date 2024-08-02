import "./Store.css";
import ShoppingCart from "../ShoppingCart/ShoppingCart.jsx";
import PropTypes from "prop-types";
import StoreItem from "../utilities/StoreItem/StoreItem.jsx";
import { act } from "react";


function Store({ cart, setCart }) {
    const addToCartHandler = (item, itemQuantity) => {
        setCart([
            {
                title: item.title,
                price: item.price,
                quantity: itemQuantity,
            }
        ])
    }
    const removeFromCartHandler = (id) => {
        const index = cart.findIndex((item) => item.id === id);

        const newCart = cart.slice(0, index)
            .concat(cart.slice(index + 1));

        setCart(newCart);
    }

    const getStoreItems = () => {
        const componentsArray = [];
        for (let i = 1; i < 5; i++) {
            componentsArray.push(
                <StoreItem key={i} id={i} addToCartHandler={addToCartHandler} />
            )
        }

        return componentsArray;
    }



    return (
        <>
            <h2>Store</h2>
            <aside>
                <ShoppingCart cart={cart} removeFromCartHandler={removeFromCartHandler}/>
            </aside>
            <main>
                <h3 className="catalog-heading">Catalog</h3>
                <div className="store-items">
                    {getStoreItems()}
                </div>
            </main>
        </>
    );
}

Store.propTypes = {
    cart: PropTypes.array.isRequired,
    setCart: PropTypes.func.isRequired,
}

export default Store;