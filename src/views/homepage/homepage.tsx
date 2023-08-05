import { useSelector } from "react-redux"
import { RootState } from "@/store/store"

import { Location } from "@/models/location/location"

import { LocationSearch } from "@/cmps/homepage/location-search/location-search"
import { Loader } from "@/cmps/common/loader/loader"
import { LocationPreview } from "@/cmps/homepage/location-preview/location-preview"
import './style.scss'


export default function Homepage() {
    const selectedLocation: Location = useSelector((state: RootState) => state.weatherModule.selectedLocation)


    return (
        <main className="views--homepage__container">
            <LocationSearch />

            {selectedLocation
                ? <LocationPreview />
                : <Loader text="Plase allow access to your location in order to get accurate result for you." />}
        </main>
    )
}