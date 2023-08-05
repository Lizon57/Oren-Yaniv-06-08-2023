import { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

import { convertTemperatureUnit } from '@/services/util/convert-temperatur-unit'

import { Icon } from '../icon/icon'
import './style.scss'


export function Temperature({ value, shouldRenderIndicatorIcon = false, isCelsiusValue = true }: Props) {
    const isCelsiusPreffer = useSelector((state: RootState) => state.appModule.isCelsiusPreffer)
    const [temperature, setTemperature] = useState<number>()


    useEffect(() => {
        let newTemperature: number

        if (isCelsiusPreffer) newTemperature = isCelsiusValue ? value : convertTemperatureUnit(value)
        else newTemperature = isCelsiusValue ? convertTemperatureUnit(value) : value

        setTemperature(newTemperature)
    }, [value, isCelsiusPreffer])


    return (
        <span className="common--temperature__container">
            {temperature}
            {shouldRenderIndicatorIcon && <>
                {isCelsiusPreffer
                    ? <Icon name="celsius-sign" size="20" />
                    : <Icon name="fahrenheit-sign" size="20" />}
            </>
            }
        </span>
    )
}


type Props = {
    value: number
    shouldRenderIndicatorIcon?: boolean
    isCelsiusValue?: boolean
}