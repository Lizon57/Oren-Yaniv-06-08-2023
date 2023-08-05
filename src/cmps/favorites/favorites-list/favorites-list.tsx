import { useNavigate } from "react-router"
import { favoriteService } from "@/services/favorite.service"
import { setSelectedLocation } from "@/store/actions/weather.action"
import { eventBus } from "@/services/event.bus.service"
import { LocationWithCurrWeather } from "@/models/location/location-with-curr-weather"
import { LocationCurrWeatherPreview } from "@/cmps/common/location-curr-weather-preview/location-curr-weather-preview"
import { Icon } from "@/cmps/common/icon/icon"
import './style.scss'


export function FavoritesList({ locations }: Props) {
    const navigate = useNavigate()

    const onRemoveFromFavorites = (ev: React.MouseEvent<HTMLElement>, location: LocationWithCurrWeather) => {
        ev.stopPropagation()
        favoriteService.toggleFavorite(location)
        eventBus.emit('reloadFavoritesList')
    }

    const onSelectFavorite = (location: LocationWithCurrWeather) => {
        setSelectedLocation(location)
        navigate('/')
    }


    return (
        <section className="favorites--favorites-list__container">
            {locations?.map(location => <div
                key={location.id}
                className="preview-wrapper"
                onClick={(ev) => onSelectFavorite(location)}
            >
                <span className="icon-wrapper" onClick={(ev) => onRemoveFromFavorites(ev, location)}>
                    <Icon name="remove-full" size="25px" title="Remove from favorites" />
                </span>

                <LocationCurrWeatherPreview location={location} />
            </div>
            )}
        </section>
    )
}


type Props = {
    locations: LocationWithCurrWeather[]
}