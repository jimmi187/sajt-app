import { useEffect, useState } from "react";
import axios from "axios";
import { CustomLink } from "../utils/CustomLInk";
import {  Outlet } from "react-router-dom";

export default function Backpocket() {
    const [imena, setImena] = useState([]);

    useEffect(() => {
        //files
        axios.get("https://api.github.com/repos/jimmi187/test-note/contents")
            .then((response) => {
                console.log(response.data);
                setImena(response.data);
            });
    }, [])

    return (
        <div>
            <h1>My List</h1>
            <ul style={{listStyle:"none"}}>
                {imena.map((item) => <CustomLink to={"/backpocket/"+item.name}>{item.name}</CustomLink>)}
            </ul>
            <Outlet/>
        </div>
    );
};