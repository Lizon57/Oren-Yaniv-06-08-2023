import { lazy } from "react"
import { makeId } from "../services/util/make-id"


const Homepage = lazy(() => import('../views/homepage/homepage'))
const Favorites = lazy(() => import('../views/favorites/favorites'))


export const routes = [
    {
        id: makeId(),
        path: '/favorites',
        element: Favorites
    },

    {
        id: makeId(),
        path: '/',
        element: Homepage
    }
]