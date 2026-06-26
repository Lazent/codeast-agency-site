import Header from './components/Header'
import Hero from './sections/Hero'
import Features from './sections/Features'
import Pricing from './sections/Pricing'
import { Box } from '@mui/material'
import Contact from './sections/Contact'
import About from './sections/About'
import Footer from './components/Footer'
import { Routes, Route } from 'react-router-dom'
import InterviewPrep from './sections/InterviewPrep'

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <Box sx={{ width: '100%', overflowX: 'hidden' }}>
          <Header />
          <Hero />
          <About />
          <Features />
          <Pricing />
          <Contact />
          <Footer />
        </Box>
      } />
      <Route path="/interview-prep" element={<InterviewPrep />} />
    </Routes>
  )
}

export default App