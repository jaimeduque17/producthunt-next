import React from 'react'
import Search from '../ui/Search'
import Navigation from './Navigation'
import Link from 'next/link'

const Header = () => {
    return ( 
        <header>
            <div>
                <div>
                    <p>P</p>
                    <Search />
                    <Navigation />
                </div>
                <div>
                    <p>Hello: Jaime</p>
                    <button type="button">Log Out</button>
                    <Link href="/">Log In</Link>
                    <Link href="/">Sign Up</Link>
                </div>
            </div>
        </header>
     );
}
 
export default Header;