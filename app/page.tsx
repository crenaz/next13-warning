"use client";

import { use, useState } from "react";

import Image from 'next/image';
import styles from './page.module.css';

type Pokemon = { id: number; name: string; image?: string };

function makeQueryClient() {
  const fetchMap = new Map<string,Promise<any>>();
  return function queryClient<QueryResult>(
    name: string,
    query: () => Promise<QueryResult>
  ): Promise<QueryResult> {
    if (!fetchMap.has(name)) {
      fetchMap.set(name, query());
    }
    return fetchMap.get(name)!;
  }
}

const queryClient = makeQueryClient();

export default function Home() {
  const pokemon =  use(
    queryClient<Pokemon[]>(
      "pokemon",
     () =>
      fetch("http://localhost:3000/api/pokemon").then(res =>
       res.json()
       )
    )
  );

  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>();
  
  const pokemonDetail = selectedPokemon
    ? use(
    queryClient<Pokemon>(
      ["pokemon", selectedPokemon.id].join('-'),
     () =>
      fetch(`http://localhost:3000/api/${selectedPokemon.id}`).then(
        (res) => res.json()
       ) 
    )
  )
 : null; 

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          So, this is <a href="https://nextjs.org">Next.js</a>
        </h1>

        <p className={styles.description}>
          This is from this <a href="https://www.youtube.com/watch?v=zwQs4wXr9Bg">tutorial</a>
        </p>

        <div className={styles.grid}>
          <div>{pokemon.map((p) => (
            <button key={p.id} onClick={() => setSelectedPokemon(p)}>
              {p.name}
            </button>
          ))}
            <div>{pokemonDetail?.image && <Image src={pokemonDetail.image} alt={pokemonDetail.name} width={200} height={200} />}</div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
