import { favoriteService } from "@/services/favorite.service"
import { eventBus } from "@/services/event.bus.service"

import { LocationWithCurrWeather } from "@/models/location/location-with-curr-weather"

import { LocationCurrWeatherPreview } from "@/cmps/common/location-curr-weather-preview/location-curr-weather-preview"
import { Icon } from "@/cmps/common/icon/icon"
import './style.scss'


export function FavoritesList({ locations }: Props) {
    const onRemoveFromFavorites = (location: LocationWithCurrWeather) => {
        favoriteService.toggleFavorite(location)
        eventBus.emit('reloadFavoritesList')
    }


    return (
        <section className="favorites--favorites-list__container">
            {locations?.map(location => <div key={location.id} className="preview-wrapper">
                <span className="icon-wrapper" onClick={() => onRemoveFromFavorites(location)}>
                    <Icon name="remove-full" size="25px" />
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