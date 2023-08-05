import { LocationSearchOption } from "@/models/location/location-search-option"
import './styles.scss'


export function LocationSearchPreview({ option }: Props) {
    return (
        <div className="homepage--location-search-preview__container">
            <span className="suggest-city">{option.label}</span>

            <div className="country">
                <img src={`https://flagcdn.com/h20/${option.country.code}.jpg`} />
                <span>{option.country.name}</span>
            </div>
        </div>
    )
}



type Props = {
    option: LocationSearchOption
}