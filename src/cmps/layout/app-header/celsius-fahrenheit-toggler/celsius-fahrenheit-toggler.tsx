import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { setIsCelsiusPreffer } from '@/store/actions/app.action'

import { Icon } from '@/cmps/common/icon/icon'
import './style.scss'


export function CelsiusFahrenheitToggler() {
    const isCelsiusPreffer = useSelector((state: RootState) => state.appModule.isCelsiusPreffer)

    const toggleIsCelsiusPreffer = () => setIsCelsiusPreffer(!isCelsiusPreffer)


    return (
        <div className="layout--celsius-fahrenheit-toggler__container">
            <input type="checkbox" checked={isCelsiusPreffer} onChange={toggleIsCelsiusPreffer} />
            <span className="option">
                <Icon name="celsius-sign" size="20" />
            </span>
            <span className="option">
                <Icon name="fahrenheit-sign" size="20" />
            </span>
            <span className="indicator">
                <Icon name="temperature" size="20" />
            </span>
        </div>
    )
}