// src/pages/Home.tsx
import React from 'react'
import QuoteSection from '../components/Home/QuoteSection/QuoteSection'
import MetricsSection from '../components/Home/MetricsSection/MetricsSection'
import ProblemSection from '../components/Home/ProblemSection/ProblemSection'
import CallToAction from '../components/Home/CallToAction/CallToAction'
import Footer from '../components/Home/Footer/Footer'
import '../views/Home.css'

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <QuoteSection />
      <MetricsSection />
      <ProblemSection />
      <CallToAction />
      <Footer />
    </div>
  )
}

export default Home
