import { Button, Modal } from 'antd';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useGetSinglePokemon } from '../../hooks/useGetSinglePokemon';
import { createUseStyles } from 'react-jss';
import { useEffect } from 'react';

export const PokemonDetailsModal = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const id = searchParams.get('id');
  const name =searchParams.get('name');

  const { loading, pokemon } = useGetSinglePokemon(id, name);

  console.log({loading, pokemon})

  const handleClose = () => {
    navigate('/pokemon');
  };

  useEffect(() => {
    if (!loading && !pokemon) {
      handleClose();
    }
  }, [loading, pokemon])

  return (
    <>
      <Modal
        title={pokemon?.name || ''}
        footer={
          <Button type="primary" onClick={handleClose}>
            Close
          </Button>
        }
        className={classes.modal}
        loading={loading}
        open
        onCancel={() => handleClose()}
      >
        {pokemon && <div className={classes.modalContent}>
          <img
            className={classes.image}
            src={pokemon.image}
            alt={pokemon.name}
          />
          <p>
            <strong>Number:</strong> #{pokemon.number}
          </p>
          <p>
            <strong>Height:</strong> {pokemon?.height?.maximum}
          </p>
          <p>
            <strong>Weight:</strong> {pokemon?.weight?.maximum}
          </p>
          <p>
            <strong>Resistant:</strong> {pokemon?.resistant?.join(', ')}
          </p>
          <p>
            <strong>Weaknesses:</strong> {pokemon?.weaknesses?.join(', ')}
          </p>
        </div>}
      </Modal>
    </>
  );
};

const useStyles = createUseStyles(
  {
    modal: {
      top: 70,

      '& svg': {
        fill: '#131924',
      },
    },
    modalContent: {
      display: 'flex',
      flexDirection: 'column',

      '& p, strong': {
        color: '#131924',
        alignContent: 'flex-start',
      },
    },
    image: {
      width: '150px',
      display: 'block',
      margin: '50px auto',
    },
  },
  { name: 'PokemonDetailsModal' }
);
