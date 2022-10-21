import Header from './components/Header'
import News from './components/News'
import Rating from './components/Rating'
import YourClub from './components/YourClub'

const Home = ({ ratingData, news }) => {
  return (
    <div>
      <Header />
      <News news={news} />
      <Rating data={ratingData} />
      <YourClub />
    </div>
  )
}

export default Home
