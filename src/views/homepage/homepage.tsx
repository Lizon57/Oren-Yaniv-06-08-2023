import { LocationSearch } from "@/cmps/homepage/location-search/location-search"
import './style.scss'


export default function Homepage() {
    return (
        <main className="views--homepage__container">
            <h2>Just pick a location</h2>
            <h3>we'll do the trick</h3>
            <LocationSearch initialTerm="Tel-Aviv" />
        </main>
    )
}