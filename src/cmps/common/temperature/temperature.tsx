import { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

import { convertTempUnit } from '@/services/util/convert-temperatur-unit'

import { Icon } from '../icon/icon'
import './style.scss'


export function Temperature({ value, shouldRenderIndicatorIcon = false, isCelsiusValue = true }: Props) {
    const isCelsiusPreffer = useSelector((state: RootState) => state.appModule.isCelsiusPreffer)
    const [temp, setTemp] = useState<number>()


    useEffect(() => {
        let newTemp: number

        if (isCelsiusPreffer) newTemp = isCelsiusValue ? value : convertTempUnit(value)
        else newTemp = isCelsiusValue ? convertTempUnit(value) : value

        setTemp(newTemp)
    }, [value, isCelsiusPreffer])


    return (
        <span className="common--temperature__container">
            {temp}
            {shouldRenderIndicatorIcon && <>
                {isCelsiusPreffer
                    ? <Icon name="celsius-sign" size="20px" />
                    : <Icon name="fahrenheit-sign" size="20px" />}
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