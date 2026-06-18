import Header from './components/Header'
import Hero from './sections/Hero'
import Features from './sections/Features'
import Pricing from './sections/Pricing'
import { Box } from '@mui/material'
import Contact from './sections/Contact'
import About from './sections/About'

function App() {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', color: 'text.primary' }}>
      <Header />
      <Hero />
      <About />
      <Features />
      <Pricing />
      <Contact />
    </Box>
  )
}

export default App