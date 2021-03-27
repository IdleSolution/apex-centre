import React, { Component } from 'react';
import Search from './../TopOfPage/TopOfPage';
import { Link } from 'gatsby';
import './Nav.scss'

class Nav extends Component {

    state = {
        stickyNav: false,
        navPosition: false,
        hiddenNav: false,
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.setState({navPosition: this.nav.current.getBoundingClientRect().top})
      }
    
      componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    windowGlobal = typeof window !== 'undefined' && window
    nav = React.createRef();
    prevScrollPos = 0

    handleScroll = () => {
        if(Math.abs(this.state.navPosition) <= this.windowGlobal.scrollY) {
            this.setState({stickyNav: true})
        } else {
            if(this.state.stickyNav) {
                this.setState({stickyNav: false})
            }
        }
        if(this.windowGlobal.scrollY > this.state.navPosition + 250) {
            if(this.state.stickyNav) {
                const currentScrollPos = this.windowGlobal.pageYOffset;
                if(this.prevScrollPos > currentScrollPos) {
                    if(this.state.hiddenNav) {
                        this.setState({hiddenNav: false})
                    }
                } else {
                    this.setState({hiddenNav: true})
                }
                this.prevScrollPos = currentScrollPos;
    
            }
        }

    }

    render() {
        let hiddenNavClass = this.state.hiddenNav ? 'nav__hidden' : null;
        let stickyNavClass = this.state.stickyNav ? 'nav__sticky' : null 
        return (
            <div>
                <Search />
                <div className={this.state.stickyNav ? 'nav__placeholder' : null}></div>
                <nav className={`${hiddenNavClass} ${stickyNavClass} nav`} ref={this.nav}>
                    <div className='nav__links-container'>
                        <Link to='/'><p className='nav__link'>HOME</p></Link>
                        <Link to='/all/news/'><p className='nav__link'>NEWS</p></Link>
                        <Link to='/tracker/'><p className='nav__link'>TRACKER</p></Link>

                    </div>

                    <div className='nav__positioner'>
                    </div>
                </nav>
            </div>
        )
    }


}

export default Nav;