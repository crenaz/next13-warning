"use client";

import { use } from "react";

import Image from 'next/image';
import styles from './page.module.css';



const fetchMap = new Map<string,Promise<any>>();

function queryClient(name: string, query: () => Promise<any> ) {
  if (!fetchMap.has(name)) {
    fetchMap.set(name, query());
  }
  return fetchMap.get(name)!;
}



export default function Home() {
  const data =  use(
    queryClient("hello", () =>
      fetch("http://localhost:3000/api/hello").then(res => res.json())
    )
  );
  
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js 13!</a>
        </h1>

        <p className={styles.description}>
          * Now using {' '}
          <code className={styles.code}>.tsx</code>
        </p>

        <div className={styles.grid}>
{JSON.stringify(data)}
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
  )
}
