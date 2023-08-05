import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { CelsiusFahrenheitToggler } from '../../common/celsius-fahrenheit-toggler/celsius-fahrenheit-toggler'
import { Icon } from '@/cmps/common/icon/icon'
import logo from '@/assets/images/logo.png'
import './style.scss'
import { useOnWindowResize } from '@/hooks/use-on-window-resize'
import classNames from 'classnames'
import { useOnClickOutside } from '@/hooks/use-on-click-outside'


export function AppHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [shouldRenderHamburger, setShouldRenderHamburger] = useState(false)
    const headerRef = useRef<HTMLElement>(null)


    useEffect(() => {
        demandShouldRenderHamburger()
    }, [])

    const onToggleIsMenuOpen = () => setIsMenuOpen(!isMenuOpen)

    const demandShouldRenderHamburger = () => {
        const res = (window.innerWidth < 700) ? true : false
        setShouldRenderHamburger(res)
    }
    useOnWindowResize(demandShouldRenderHamburger)

    useOnClickOutside(headerRef, () => setIsMenuOpen(false))


    return (
        <header className="layout--app-header__container" ref={headerRef}>
            <div className="content">
                <span className="brand">
                    <img src={logo} />
                    <span className="name">weather</span>
                </span>

                {shouldRenderHamburger && <span className="hamburger-toggler" onClick={onToggleIsMenuOpen}>
                    <Icon
                        name={isMenuOpen ? 'times' : 'bars'}
                        size={isMenuOpen ? '25px' : '40px'}
                    />
                </span>
                }

                <div className={classNames('navigation-and-temp-toggler', { 'open-menu': isMenuOpen })}>
                    <nav>
                        <NavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
                        <NavLink to="/favorites" onClick={() => setIsMenuOpen(false)}>Favorites</NavLink>
                    </nav>

                    <CelsiusFahrenheitToggler />
                </div>
            </div>
        </header>
    )
}