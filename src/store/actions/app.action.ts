import { store } from "@/store/store"


export const setIsCelsiusPreffer = (isCelsiusPreffer: boolean) => {
    store.dispatch({ type: 'setIsCelsiusPreffer', isCelsiusPreffer })
}
