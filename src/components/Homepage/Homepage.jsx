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
                <h2 className="story-heading">My Story</h2>
            </main>
        </>
    )
}

export default Homepage;