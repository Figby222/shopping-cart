import "./Homepage.css";
import { Link } from "react-router-dom";

function Homepage() {
    return (
        <div className="Homepage">
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
                <p className="story">
                    I love cookies a lot. I love cookies so much that I'll
                    cook them right now. Literally, I'm preheating the oven
                    at this current moment.
                </p>
            </main>
        </div>
    )
}

export default Homepage;