import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useContext } from "react";


// import { CrowdsaleContext } from "../context/CrowdsaleContext";
import Ico from '../components/Ico';
// const connectWallet  = React.useContext(CrowdsaleContext);

export default function Home() {


  return (
    <div>
      <Head>
        <title>DaveCoin ICO</title>
        <meta name="description" content="DaveCoin ICO Landing Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Ico/> 


    </div>
  )
}
