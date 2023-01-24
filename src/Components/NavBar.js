import { useContext } from "react"
import { FavoriteContext} from "../Contexts/favoritesContext"
export const NavBar = () => {
    const {favoritePokemons} = useContext(FavoriteContext)
        return (

        <nav>
            <div>
                <img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="PokéAPI"
                     className=" navImg" />
            </div>
        </nav>

    )
}

