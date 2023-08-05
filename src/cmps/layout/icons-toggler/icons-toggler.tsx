import { Icon } from "@/cmps/common/icon/icon"
import './style.scss'


export function IconsToggler({ option1Name, option2Name, indicatorName, isFirstOptionActive, callback }: Props) {
    const size = "20px"

    return (
        <div className="layout--icons-toggler__container">
            <input type="checkbox" checked={isFirstOptionActive} onChange={callback} />
            <span className="option">
                <Icon name={option2Name} size={size} />
            </span>
            <span className="option">
                <Icon name={option1Name} size={size} />
            </span>
            <span className="indicator">
                <Icon name={indicatorName} size={size} />
            </span>
        </div>
    )
}


type Props = {
    option1Name: string
    option2Name: string
    indicatorName: string
    isFirstOptionActive: boolean
    callback: () => void
}