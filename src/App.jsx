import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import Recommendation from './components/Recommendation';
import Showreels from './components/Showreels';
import Awards from './components/Awards';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

export default function App() {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <Hero />
      <Services />
      <Projects />
      <Recommendation />
      <Showreels />
      <Awards />
      <Contact />
      <Footer />
      <BackToTop />
    </>
  );
}
