import "./Homepage.css";
import { Link } from "react-router-dom";

function Homepage() {
    return (
        <>
            <header>
                <h1>Ryan's Totally Real Clothes</h1>
            </header>
            <nav>
                <ul>
                    <li>
                        <Link to="/store">Store</Link>
                    </li>
                </ul>
            </nav>
            <main>
            </main>
        </>
    )
}

export default Homepage;