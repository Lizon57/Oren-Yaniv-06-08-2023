import { NavLink } from 'react-router-dom'
import logo from '@/assets/images/logo.png'
import './style.scss'
import { CelsiusFahrenheitToggler } from '../../common/celsius-fahrenheit-toggler/celsius-fahrenheit-toggler'


export function AppHeader() {
    return (
        <header className="layout--app-header__container">
            <div className="content">
                <span className="brand">
                    <img src={logo} />
                    <span className="name">weather</span>
                </span>

                <CelsiusFahrenheitToggler />

                <nav>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/favorites">Favorites</NavLink>
                </nav>
            </div>
        </header>
    )
}