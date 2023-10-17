import { useEffect, useState } from "react";
import axios from "axios";
import { CustomLink } from "../utils/CustomLInk";
import "../css/backpocket.css"
import { Outlet } from "react-router-dom";

export default function Backpocket() {
    const [imena, setImena] = useState([]);
    const [filteredText, setFilteredText] = useState('');

    useEffect(() => {
        //files
        axios.get("https://api.github.com/repos/jimmi187/test-note/contents")
            .then((response) => {
                console.log(response.data);
                setImena(response.data);
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
                    <DisplayFilteredList imena={imena} filteredText={filteredText} />
                </div>
                <Outlet />
            </div>
        </div>
    );
};