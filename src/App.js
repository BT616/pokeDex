
import React from "react"
import './App.css';
import { useState } from "react"
import Axios from "axios"

//"https://pokeapi.co/api/v2/pokemon?limit=150&offset=0"

function App() {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonChosen,setPokemonChosen]= useState(false)
  const [pokemon, setPokemon] = useState({
    Name: "",
    Species: "",
    Image: "",
    HP: "",
    Attack: "",
    Defense: ""
    
  });


  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((response) => {
      setPokemon({
        Name: pokemonName,
        id: response.data.id,
        Species: response.data.species.name,
        Image: response.data.sprites.front_default,
        HP: response.data.stats[0].base_stat,
        Attack: response.data.stats[1].base_stat,
        Defense: response.data.stats[2].base_stat
      });
      setPokemonChosen(true)
      console.log(response) 
    })
  }


  return (
    <div className="App">
      <div className="App-header">
        <h1> PokeDex </h1>
        <input
          type='text'
          onChange={(event) => {
            setPokemonName(event.target.value);
          }}
        />
        <button onClick={searchPokemon}> Search Pokemon</button>
      </div>
      <div className="DisplaySection">{!pokemonChosen ? 
      (<h1> Choose a pokemon</h1>) :
      (
      <> 
      <h1>{pokemon.Name}</h1>
      <img src={pokemon.Image}/>
      <h3>Order: {pokemon.id}</h3>
      <h3>Species: {pokemon.Species}</h3>
      <h3>HP:{pokemon.HP}</h3>
      <h3>Attack:{pokemon.Attack}</h3> 
      <h3>Defense:{pokemon.Defense}</h3>
      </>
       
        
  
      )}
      </div>
      
    </div>
  );
};

export default App;
