import React from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import LoadingContent from '../utils/LoadingContent';



function FileOpened(...params) {

    let { postId } = useParams();
    const [textizfajla, setTextizfajla] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        setTimeout(() => {//no need for this ? ? ?
        //contente of file 
        axios.get("https://raw.githubusercontent.com/jimmi187/test-note/master/" + postId)
            .then(function (response) {
                setTextizfajla(response.data);
                setLoading(false);
            })


        }, 100);
    }, [postId])

    return (
        <div>
            <h1>{postId}</h1>
            {!loading ? <pre className='content'>{textizfajla}</pre> : <LoadingContent/>} 
        </div>
    );
}

export default FileOpened;