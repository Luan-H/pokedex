import Image from "next/image"
import styles from '../../styles/Pokemon.module.css'

export const getStaticPaths = async () => {
    const maxPokemons = 151
    const api = 'https://pokeapi.co/api/v2/pokemon/'

    const res = await fetch(`${api}?limit=${maxPokemons}`)
    const data = await res.json()

    const paths = data.results.map((pokemon, index) => {
        const pokemonId = (index + 1).toString().padStart(3, '0');
        return {
            params: { pokemonId: pokemonId },
        };
    });

    return {
        paths,
        fallback: false,
    }
}

export const getStaticProps = async (context) => {
    const paddedId = context.params.pokemonId; // ID formatado com zeros à esquerda, por exemplo, "001"
    const id = parseInt(paddedId, 10); // Converte para um número inteiro (remove os zeros à esquerda)

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const data = await res.json()

    return {
        props: { pokemon: data },
    }
}


export default function PokemonId({ pokemon }) {
    const formattedId = String(pokemon.id).padStart(3, '0');
    return (
        <div className={styles.pokemon_container}>
            <h1 className={styles.pokemon_title}>{pokemon.name}</h1>
            <Image
                src={`https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${formattedId}.png`}
                width={200}
                height={200}
                alt={pokemon.name}
            />
            <div>
                <h3>Número:</h3>
                <p>#{formattedId}</p>
            </div>
            <div>
                <h3>Tipo:</h3>
                <div className={styles.types_container}>
                    {pokemon.types.map((item, index) => (
                        <span key={index} className={`${styles.type} ${styles['type_' + item.type.name]}`}>{item.type.name}</span>
                    ))}
                </div>
            </div>
            <div className={styles.data_container}>
                <div className={styles.data_height}>
                    <h4>Altura:</h4>
                    <p>{pokemon.height * 10}cm</p>
                </div>
                <div className={styles.data_weight}>
                    <h4>Peso:</h4>
                    <p>{pokemon.weight / 10}kg</p>
                </div>
            </div>
        </div>
    )
}