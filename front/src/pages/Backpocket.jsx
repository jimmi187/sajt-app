import { useEffect, useState } from "react";
import axios from "axios";
import { CustomLink } from "../utils/CustomLInk";
import "../css/backpocket.css"
import { Outlet } from "react-router-dom";
import LoadingContent from "../utils/LoadingContent";

export default function Backpocket() {
    const [imena, setImena] = useState([]);
    const [filteredText, setFilteredText] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        //files
        axios.get("https://api.github.com/repos/jimmi187/notes_pub/contents")
            .then((response) => {
                console.log(response.data);
                setImena(response.data);
                setLoading(false);
            });

    }, [])

    function DisplayFilteredList({ imena, filteredText }) {
        const rows = [];
        imena.forEach((product) => {
            if (product.name.toLowerCase().indexOf(filteredText.toLowerCase()) === -1) return;
            rows.push(<CustomLink key={product.name} to={"/backpocket/" + product.name}>{product.name}</CustomLink>);
        });
        return (
            <ul className="list-of-files">
                {rows}
            </ul>
        );
    }

    return (
        <div className="backpocket-container">
            <div className="backpocket-grid">
                <div className="sidebar">
                    <input
                        type="text"
                        value={filteredText}
                        placeholder="Search..."
                        onChange={(e) => setFilteredText(e.target.value)}
                    />
                    {loading ? <LoadingContent innerCircleColor={"#afc6c9"} /> : <DisplayFilteredList imena={imena} filteredText={filteredText} />}
                </div>
                <Outlet />
            </div>
        </div>
    );
};