import { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Pokemon } from '../types';

export const GET_SINGLE_POKEMON = gql`
  query pokemon($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      id
      number
      name
      weight {
        maximum
      }
      height {
        maximum
      }
      types
      resistant
      weaknesses
      image
    }
  }
`;

export const useGetSinglePokemon = (id?: string | null, name?: string | null) => {
  const { data, ...queryRes } = useQuery(GET_SINGLE_POKEMON, {
    variables: {
      id,
      name
    },
    skip: !id && !name
  });

  const pokemon: Pokemon = useMemo(() => data?.pokemon || null, [data]);

  return {
    pokemon,
    loading: queryRes.loading
  };
};
