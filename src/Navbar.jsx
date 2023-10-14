import { Link, useMatch, useResolvedPath } from "react-router-dom"


function Navbar(params) {
   
    return (
        <>
            <nav className="nav">
                <a href="/" className="site-title"> Sajt </a>
                <ul>
                    <CustomLink to="/igrice">Igrice</CustomLink>
                    <CustomLink to="/blog">Blog</CustomLink>
                    <CustomLink to="/portfolio">Portfolio</CustomLink>
                    <CustomLink to="/hakovi">Hacks</CustomLink>
                    <CustomLink to="/diy">DIY</CustomLink>
                    <CustomLink to="/klopa">Recepies</CustomLink>
                    <button >dark/light</button>
                </ul>
            </nav></>
    )
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname})
    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}

export default Navbar