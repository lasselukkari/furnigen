

import React from 'react'
import TableGenerator from './TableGenerator';
import { Leva } from 'leva'



export default function App() {
  return (
    <div >
      <Leva 
      titleBar={{ filter: false, title: "Dimensions" }} 
      hideCopyButton={true}
      />
      <TableGenerator />
    </div>
  )
}
