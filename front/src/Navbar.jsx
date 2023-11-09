import { CustomLink } from "./utils/CustomLInk";

function Navbar(params) {
   
    return (
        <>
            <nav className="nav">
                <a href="/" className="site-title"> Sajt </a>
                <ul>
                    <CustomLink to="/portfolio">Portfolio</CustomLink>
                    <CustomLink to="/backpocket">Back pocket</CustomLink>
                    <CustomLink to="/blog">Blog</CustomLink>
                    <CustomLink to="/recipes">Recepies</CustomLink>
                    <CustomLink to="/games">Games</CustomLink>
                    <button >dark/light</button>
                </ul>
            </nav></>
    )
}



export default Navbar