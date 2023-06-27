import React from 'react'
import Footer from '../components/Footer'
import Body from '../components/Body'
import Header from '../components/Header'
import Missing from '../components/Missing'
import Wanted from '../components/Wanted'


export default function Home() {
  return (
    <div>
        <div><Header></Header></div>
        <div><Body></Body></div>
        <div><Missing></Missing></div>
        <div><Wanted></Wanted></div>
        <div><Footer></Footer></div>
    </div>
  )
}