import React from 'react';
import { useParams } from 'react-router-dom';


function Nesto(...params) {
    let { postId } = useParams();
    return(<h1>OVO JE BLOG POST {postId}</h1>);
}

export default Nesto;