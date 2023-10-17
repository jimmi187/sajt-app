import { useState } from "react";



function ArticlePrev( {article, params}) {
   const [isExpanded, setIsExpanded] = useState(false);
   const toggleExpand = () => {setIsExpanded(!isExpanded);};

    return(
      <div className="article-prev" style={{ marginBottom: isExpanded ? '20px' : '0' }}>
         <h2>{article.header}</h2>
         <div className="text-area">{isExpanded ? article.description : article.description.slice(0, 125)}</div>
         {isExpanded && <img src="https://images.pexels.com/photos/14918477/pexels-photo-14918477.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"/>}
         {article.description.length > 125 && (
           <button onClick={toggleExpand}>
             {isExpanded ? 'Show Less' : 'Show More'}
           </button>
         )}
       {/* <p>{article.description}</p> */}

       

       {/* <Link to="/blog/blog1">ovo je link za citanje</Link> */}
      </div>
    )
   }
export default  ArticlePrev