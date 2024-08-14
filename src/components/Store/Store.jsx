import "./Store.css";
import ShoppingCart from "../ShoppingCart/ShoppingCart.jsx";
import PropTypes from "prop-types";
import StoreItem from "../utilities/StoreItem/StoreItem.jsx";
import { act } from "react";
import { Link } from "react-router-dom";


function Store({ cart, setCart }) {
    const addToCartHandler = (item, itemQuantity) => {
        const itemIndex = cart.findIndex((cartItem) => item.id === cartItem.id);

        if (itemIndex >= 0) {
            const newCart = [ ...cart ];
            newCart[itemIndex].quantity += itemQuantity;
            setCart(newCart);
            return;
        }
        
        setCart([
            ...cart,
            {
                id: item.id,
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
                <li className="StoreItem">
                    <StoreItem key={i} id={i} addToCartHandler={addToCartHandler} />
                </li>
            )
        }

        return componentsArray;
    }



    return (
        <>
            <h1>Store</h1>
            <nav>
                <Link to="/homepage" className="home">Home</Link>
            </nav>
            <aside>
                <ShoppingCart cart={cart} removeFromCartHandler={removeFromCartHandler}/>
            </aside>
            <main>
                <h2 className="catalog-heading">Catalog</h2>
                <ul className="store-items">
                    {getStoreItems()}
                </ul>
            </main>
        </>
    );
}

Store.propTypes = {
    cart: PropTypes.array.isRequired,
    setCart: PropTypes.func.isRequired,
}

export default Store;