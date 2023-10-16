import Header from './components/Header';
import Stats from './components/Stats';
import Map from './components/Map';
import Footer from './components/Footer';
import './assets/scss/main.scss';

const App = () => {
  return (
    <>
      <Header />
      <section className='wrapper'>
        <Stats />
        <Map />
      </section>
      <Footer />
    </>
  );
}

export default App;