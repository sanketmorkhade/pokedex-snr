import React, { useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useGetPokemons } from '../../hooks/useGetPokemons';
import { PokemonCard } from '../PokemonCard';

export const PokemonList = () => {
  const classes = useStyles();
  const { pokemons, loading } = useGetPokemons();
  const [searchText, setSearchText] = useState('');

  const filteredPokemon = useMemo(() => {
    const text = searchText.toLowerCase();

    return pokemons.filter(
      ({ name, number, types }) =>
        name.toLowerCase().includes(text) ||
        number.toLowerCase().includes(text) ||
        types.some((type) => type.toLowerCase().includes(text))
    );
  }, [pokemons, searchText]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  return (
    <>
      {!loading && (
        <div className={classes.searchBox}>
          <input
            type="text"
            className={classes.searchField}
            placeholder="Search Pokemon..."
            value={searchText}
            onChange={handleSearchChange}
          />
        </div>
      )}

      <div className={classes.list}>
        {loading && <div className={classes.loading}></div>}
        {!loading &&
          filteredPokemon.map((pkmn) => (
            <PokemonCard pokemon={pkmn} key={pkmn.id} />
          ))}
      </div>
    </>
  );
};

const useStyles = createUseStyles(
  {
    loading: {
      width: '100px',
      height: '100px',
      backgroundImage: "url('pokeball-white.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      animation: '$spin 2s linear infinite',
      position: 'absolute',
      top: '50%',
    },

    '@keyframes spin': {
      from: { transform: 'rotate(0deg)' },
      to: { transform: 'rotate(360deg)' },
    },

    searchBox: {
      width: '100%',
      position: 'sticky',
      top: '0px',
      background: '#171E2b',
      zIndex: 2
    },

    searchField: {
      margin: '40px 20px 20px 40px',
      padding: '10px',
      width: '75%',
      maxWidth: '400px',
      borderRadius: '5px',
      border: '1px solid #ddd',
      fontSize: '16px',
      color: '#131924',
    },
    list: {
      padding: '32px',
      boxSizing: 'border-box',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '40px',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
  },
  { name: 'PokemonList' }
);
