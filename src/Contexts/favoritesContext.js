import {createContext} from 'react'
export const FavoriteContext = createContext ({
    favoritePokemons:[],
    upDateFavoritePokemons:(id) => null
})
    export const FavoriteProvider = FavoriteContext.Provider