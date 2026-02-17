import './App.css'
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Upload from "./pages/Upload";
import Watch from "./pages/Watch";


import Layout from "./components/Layout"

function App(){
  return (
    <Layout>
      <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/watch/:id" element={<Watch />}/>
      <Route path="/upload" element={<Upload />}/>
      <Route path="/profiles" element={<Profile />}/>
      </Routes>
    </Layout>
  )
}export default App;