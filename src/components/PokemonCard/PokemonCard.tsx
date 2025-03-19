import { createUseStyles } from 'react-jss';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { Pokemon } from '../../types';

export const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
  const classes = useStyles();

  return (
    <>
      <NavLink to={`details?id=${pokemon.id}&name=${pokemon.name}`} className={classes.link}>
        <div key={pokemon.id} className={classes.card}>
          <img
            className={classes.image}
            src={pokemon.image}
            alt={pokemon.name}
          />
          <div className={classes.description}>
            <p className={classes.text}># {pokemon.number}</p>
            <h3 className={classes.text}>{pokemon.name}</h3>
          </div>
          <div className={classes.types}>
            {pokemon.types.map((type) => (
              <span key={type} className={clsx([classes.typeBadge])}>
                {type}
              </span>
            ))}
          </div>
        </div>
      </NavLink>
    </>
  );
};

const useStyles = createUseStyles(
  {
    link: {
      width: '80%',
      textDecoration: 'none',
    },
    card: {
      display: 'flex',
      border: '1px solid #ddd',
      borderRadius: '10px',
      padding: '10px',
      textAlign: 'center',
      background: '#fff',
      transition: 'transform 0.3s ease-in-out',
      '&:hover': {
        transform: 'scale(1.05)',
      },

      '@media (max-width: 768px)': {
        flexDirection: 'column',
        alignItems: 'center',
        rowGap: '24px',
        overflow: 'hidden',
      },
    },
    image: {
      width: '100px',
      height: '100px',
      padding: '0 40px',

      '@media (max-width: 768px)': {
        width: '150px',
        height: '150px',
        rowGap: '24px',
      },
    },
    description: {
      padding: '0 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      rowGap: '12px',
    },
    text: {
      color: '#131924',
      margin: '0px',
    },
    types: {
      padding: '0 50px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '16px',
    },
    typeBadge: {
      padding: '5px 10px',
      borderRadius: '15px',
      color: '#bfbfbf',
      fontSize: '0.8rem',
      background: '#131924',
      textDecoration: 'none',
    },
  },
  { name: 'PokemonCard' }
);
