import { Pagination } from "./Pagination"
import { Pokemon } from "./Pokemon"

export const Pokedex = (props) => {
    const { pokemons, loading, page, totalPages, setPages } = props

    const onLeftClickHandler = () =>{
       if(page > 0) {
        setPages(page-1)
       }
    }
    const onRightClickHandler = ()=>{
        if(page+1 !== totalPages) {
            setPages(page+1)
           }
    }

    return (
        <div >
            <div className="pokedex-header">
                <h1>Pokedex</h1>
                <Pagination
                    page = {page+1}
                    totalPages = {totalPages}
                    onLeftClick = {onLeftClickHandler}
                    onRightClick = {onRightClickHandler}
                />
            </div>
            {loading ? (<div>Carregando, espera ai, fera...</div>) :
                 <div className="pokedex-grid">
                    {pokemons && pokemons.map((pokemon, index) => {
                        return (
                            <Pokemon key={index}  pokemon={pokemon}/>
                        )
                    })}
                </div>}
        </div>
    )
}