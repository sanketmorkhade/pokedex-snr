export type Pokemon = {
  id: string;
  name: string;
  number: string;
  types: string[];
  image: string;
  weight?: {
    maximum: string;
  };
  height?: {
    maximum: string;
  };
  resistant: string[];
  weaknesses: string[];
};

export type PokemonOption = {
  value: Pokemon['id'];
  label: Pokemon['name'];
};
