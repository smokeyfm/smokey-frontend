import React, { Component } from 'react'
import { slide as Menu } from 'react-burger-menu'
import styled from '@emotion/styled';
import Link from 'next/link';
const StyledAnchor = styled.a`
    padding: 1rem 3rem;
    display: flex;
    align-items: center;
    position: relative;
    text-transform: uppercase;
    font-weight: 900;
    font-size: 1em;
    background: none;
    border: 0;
    cursor: pointer;
    color: #FFFAFA;
`;

interface Props {

}
interface S {
    menuOpen: boolean;
}
class BurgerSideMenu extends Component<Props, S> {
    constructor(props: Props) {
        super(props)
        this.state = {
            menuOpen: false
        }
    }

    handleStateChange(state) {
        this.setState({ menuOpen: state.isOpen })
    }
    openMenu() {
        this.setState({ menuOpen: true })
    }
    closeMenu() {
        this.setState({ menuOpen: false })
    }

    render() {
        const styles = {
            bmBurgerButton: {
                position: 'fixed',
                width: '10px',
                height: '10px',
                left: '11px',
                top: '11px',
                zIndex:9999
            },
            bmBurgerBars: {
                background: this.state.menuOpen? '#000' : '#ff4154'
            },
            bmBurgerBarsHover: {
                background: '#a90000'
            },
            bmCrossButton: {
                height: '24px',
                width: '24px'
            },
            bmCross: {
                background: '#ff4154'
            },
            bmMenuWrap: {
                position: 'fixed',
                minHeight: '100%',
                overflowY:'hidden'
                
                
            },
            bmMenu: {
                background: '#000',
                padding: '2.5em 1.5em 0',
                fontSize: '1.15em',
                overflowY:'hidden'
            },
            bmMorphShape: {
                fill: '#373a47'
            },
            bmItemList: {
                color: '#b8b7ad',
                padding: '0.8em'
            },
            bmItem: {
                display: 'inline-block'
            },
            bmOverlay: {
                background: 'rgba(0, 0, 0, 0.3)'
            }
        }
        return (
        <>
            <div style={{
                backgroundColor: '#000',
                border: '1px solid #ff4154',
                height: 20, borderRadius: 50,
                width: 20,
                position:'absolute',
                zIndex:999,
                left:5,
                top:6
                }}>

            </div>
                <Menu styles={styles} noOverlay width={280}
                    isOpen={this.state.menuOpen}
                    onStateChange={(state) => this.handleStateChange(state)}>
                    <Link href="/items" >
                        <StyledAnchor onClick={() => this.closeMenu()}>Home</StyledAnchor>
                    </Link>
                    <Link href="/items">
                        <StyledAnchor onClick={() => this.closeMenu()}>About</StyledAnchor>
                    </Link>
                    <Link href="/items">
                        <StyledAnchor onClick={() => this.closeMenu()}>Contact</StyledAnchor>
                    </Link>
                </Menu>
               
                
        </>

        );
    }
}
export default BurgerSideMenu;