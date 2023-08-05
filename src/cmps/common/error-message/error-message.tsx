import { Icon } from "../icon/icon"
import './style.scss'


export function ErrorMessage({ message = 'An error occured, please try again in a few minutes.' }) {
    return (
        <div className="common--error-message__container">
            <Icon name="sad-smiley" size="100px" />
            <div className="text">{message}</div>
        </div>
    )
}