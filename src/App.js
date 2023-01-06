

import React from 'react'
//import Table from './Table/Table';
import Gate from './Gate/Gate';
import { Leva } from 'leva'



export default function App() {
  return (
    <div >
      <Leva 
      titleBar={{ filter: false, title: "Dimensions" }} 
      hideCopyButton={true}
      />
      <Gate />
    </div>
  )
}
