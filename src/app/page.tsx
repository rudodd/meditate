"use client"
import { useEffect } from 'react';

// @ts-ignore
import {Howl, Howler} from 'howler';

export default function Home() {

  const sound = new Howl({
    src: '/sounds/white-noise-long.mp3',
    preload: true,
    onload: () => console.log('audio loaded')
  })

  useEffect(() => {
    console.log('console here')
  }, [])

  return (
    <main>
      <h1>Meditate</h1>
    </main>
  );
}
