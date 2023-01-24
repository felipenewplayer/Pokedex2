

import { useEffect, useState } from 'react';
import { GetPokemons, GetPokemonsData, SearchPokemom } from './Api';

import './App.css';
import { NavBar } from './Components/NavBar';
import { Pokedex } from './Components/Pokedex';
import { SearchBar } from './Components/Search';
import { FavoriteProvider } from './Contexts/favoritesContext';
 
const favoritesKeys = 'Favorite Pokemons'

function App() {
  const [loading, setLoading] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [page, setPages] = useState(0)
  const [totalPages, setTotalpages] = useState(0)
  const [pokemons, setPokemons] = useState([])
  const [favorites, setFavorites] = useState([])

  const itensPerPage = 25
  const fetchPokemons = async () => {
    try {
      setLoading(true)
      setNotFound(false)
      const data = await GetPokemons(itensPerPage, itensPerPage * page)
      const promises = data.results.map(async (pokemon) => {
        return await GetPokemonsData(pokemon.url)
      })

      const results = await Promise.all(promises)
      setPokemons(results);
      setLoading(false)
      setTotalpages(Math.ceil(data.count / itensPerPage))

    } catch (error) {
    
    }
  }

  const localFavoritePokemons = () =>{
    const pokemons = JSON.parse(localStorage.getItem(favoritesKeys))
    setFavorites(pokemons)
  }

  useEffect(() => {
    localFavoritePokemons()
  },[])

  useEffect(() => {
    fetchPokemons()
  },[page]);

  const upDateFavoritePokemons = (name)=>{
    const  upDatedFavorites = [...favorites]
    const favoritesIndex = favorites.indexOf(name)
    if(favoritesIndex >=0){
      upDatedFavorites.splice(favoritesIndex, 1)
    }else{
      upDatedFavorites.push(name)
    }
    localStorage.setItem(favoritesKeys, JSON.stringify(upDatedFavorites))
    setFavorites(upDatedFavorites)
  }

  const onSearchHandler = async (pokemon) =>{
    if(!pokemon){
      return fetchPokemons()
    }
    
    setLoading(true)
    setNotFound(false)

    const result = await SearchPokemom(pokemon)
      if(!result){
        setNotFound(true)
      }else{
        setPokemons([result])
        setPages(0)
        setTotalpages(1)
      }
      setLoading(false)
    }

  return (
    <FavoriteProvider
      value={{favoritePokemons: favorites, upDateFavoritePokemons:upDateFavoritePokemons}}>
        <div>
          <NavBar />
          <SearchBar  onSearch ={ onSearchHandler}/>
          {notFound? (
            <div className="not-found-pokemon">
            Pokemon não encontrado
            </div>
          ): 
          (<Pokedex pokemons={pokemons}
            loading={loading}
            page={page}
            setPages={setPages}
            totalPages={totalPages} 
            />)}
        </div>
    </FavoriteProvider >
  );
}

export default App;
