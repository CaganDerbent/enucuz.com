import { Link } from "react-router-dom"
import { useState } from "react";

const Navbar = ()=>{

    return(
        <>

        <div className="navbar">
            <h1><Link to={'/'} className="link" style={{fontWeight:"500",color:"#ffa516",}}>enucuz.com</Link></h1>
            <ul>
                <li>
                    
                </li>
            </ul>


        </div>
        </>
    )
}

export default Navbar;