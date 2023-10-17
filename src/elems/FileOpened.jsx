import React from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";



function FileOpened(...params) {

    let { postId } = useParams();
    const [textizfajla, setTextizfajla] = useState();

    useEffect(() => {

        //contente of file 
        axios.get("https://raw.githubusercontent.com/jimmi187/test-note/master/" + postId)
            .then(function (response) {
                setTextizfajla(response.data);
            })

    }, [postId])

    return (
        <div>
            <h1>{postId}</h1>
            <pre style={{ textAlign: "left" }}>{textizfajla}</pre>
        </div>
    );
}

export default FileOpened;