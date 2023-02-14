import { useState } from 'react'
import { PDFViewer } from '@react-pdf/renderer';
import Simplex from './layout/Simplex';

function App() {
  return (

      <PDFViewer showToolbar={false} className="main">
        <Simplex/>
      </PDFViewer>
 
  )
}

export default App
