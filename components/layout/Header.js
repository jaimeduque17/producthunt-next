import React from 'react'
import Search from '../ui/Search'
import Navigation from './Navigation'
import Link from 'next/link'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

const ContainerHeader = styled.div`
    max-width: 1200px;
    width: 95%;
    margin: 0 auto;
    @media (min-width: 768px) {
        display: flex;
        justify-content: space-between;
    }
`

const Logo = styled.p`
    color: var(--orange);
    font-size: 4rem;
    line-height: 0;
    font-weight: 700;
    font-family: 'Roboto Slab', serif;
    margin-right: 2rem;
`

const Header = () => {
    return (
        <header
            css={css`
                border-bottom: 2px solid var(--gray3);
                padding: 1rem 0;
            `}
        >
            <ContainerHeader>
                <div>
                    <Link href="/">
                        <Logo>P</Logo>
                    </Link>
                    <Search />
                    <Navigation />
                </div>
                <div>
                    <p>Hello: Jaime</p>
                    <button type="button">Log Out</button>
                    <Link href="/">Log In</Link>
                    <Link href="/">Sign Up</Link>
                </div>
            </ContainerHeader>
        </header>
    );
}

export default Header;