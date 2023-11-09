import ArticlePrev from "../elems/ArticlePrev"
import Article from "../elems/ArticlePrev"
import { CustomLink } from "../utils/CustomLInk";


const article = {
   header: "Naslov",
   description: "ovo je pocetak recenice ove prve i nadam se da je to tako kako jeste kratak opiskratak opiskratak opiskratak opiskratak opiskratak opiskratak opiskratak opiskratak opiskratak opiskratak opiskratak opiskratak opiskratak opiskratak opiskratak opiskratak opiskratak opiskratak opiskratak opiskratak opiskratak opiskratak opiskratak opiskratak opiskratak opiskratak opiskratak opiskratak opiskratak opiskratak opiskratak opiskratak opiskratak opisratak opis",
   id : 1,
   
 };

function Blog(  ...params ) {
 return(<>
   <div className="blog">
      <h1>Welcome to my personal blog</h1>
      <div className="article-container">
        <ArticlePrev article={article}/>
        <ArticlePrev article={article}/>
        <ArticlePrev article={article}/>
      </div>

      <div className="spinning">
        <div className="circle-back"></div>
      </div>
      
   </div>
   </>
 )
}
export default Blog