import { useSelector } from "react-redux"
import { RootState } from "@/store/store"

import { LocationSearch } from "@/cmps/homepage/location-search/location-search"
import './style.scss'
import { Loader } from "@/cmps/common/loader/loader"


export default function Homepage() {
    const { selectedCity } = useSelector((state: RootState) => state.weatherModule)
    console.log(selectedCity)

    return (
        <main className="views--homepage__container">
            <LocationSearch />

            {!selectedCity && <Loader text="Plase allow access to your location in order to get accurate result for you." />}
        </main>
    )
}