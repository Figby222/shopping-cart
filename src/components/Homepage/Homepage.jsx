import "./Homepage.css";
import { Link } from "react-router-dom";

function Homepage() {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="homepage">Store</Link>
                    </li>
                </ul>
            </nav>
            <main>
                <h1>Ryan's Totally Real Clothes</h1>
            </main>
        </>
    )
}

export default Homepage;