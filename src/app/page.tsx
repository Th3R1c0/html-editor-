'use client';

import styles from './page.module.css'
import {Suspense, useEffect, useState} from 'react';
import EditorApp from '@/components/todologic';
import Homee from '@/components/Home';
import Header from '@/components/Header'

export default function Home() {
  return (
      <main className='w-screen h-screen'>
       <Homee />
      </main>
  )
}

