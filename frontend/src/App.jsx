import { useState } from 'react'
import './App.css'
import PageContainer from './components/PageContainer'
import Navbar from './components/Navbar'
import { BrowserRouter as Router } from 'react-router-dom'
import MainRoutes from './routes/MainRoutes'

function App() {

  return (

    <>
      <Router>
        <Navbar></Navbar>
        <PageContainer>
          <MainRoutes></MainRoutes>
        </PageContainer>
      </Router>
    </>
  )
}

export default App
