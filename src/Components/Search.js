import { useState } from "react"



export const SearchBar = (props) => {
    const [search, setSearch] = useState("Ditto")
    const {onSearch} = props;
    const onchangeHandler = (e) => {
        setSearch(e.target.value)
        if(e.target.value.length === 0 ){
            onSearch(undefined)
        }
    }

    const onButtonHandler = () => {
        onSearch(search)


    }
  
    return (
        <div className="searchBar-container">
            <div className="searchBar">
                <input placeholder="Buscar pokemom" onChange={onchangeHandler} />

            </div>
            <div className="searchBtn">
                <button onClick={onButtonHandler}>Buscar</button>
            </div>
        </div>
    )
}