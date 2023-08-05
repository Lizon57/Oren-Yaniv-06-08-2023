import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { setIsCelsiusPreffer } from '@/store/actions/app.action'

import { IconsToggler } from '@/cmps/layout/icons-toggler/icons-toggler'
import './style.scss'


export function CelsiusFahrenheitToggler() {
    const isCelsiusPreffer = useSelector((state: RootState) => state.appModule.isCelsiusPreffer)

    const toggleIsCelsiusPreffer = () => setIsCelsiusPreffer(!isCelsiusPreffer)


    return <IconsToggler
        option1Name="celsius-sign"
        option2Name="fahrenheit-sign"
        indicatorName="temperature"
        isFirstOptionActive={isCelsiusPreffer}
        callback={toggleIsCelsiusPreffer}
    />
}