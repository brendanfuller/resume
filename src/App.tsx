import { useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import SimpleLayout from "./layout/SimpleLayout.js";

function App() {
  return (
    <PDFViewer showToolbar={false} className="main">
      <SimpleLayout />
    </PDFViewer>
  );
}

export default App;
