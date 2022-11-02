import AboutUs from './components/AboutUs';
import Header from './components/Header';
import News from './components/News';
import Rating from './components/Rating';
import YourClub from './components/YourClub';

const Home = ({ ratingData, news, isLoading }: any) => {
	return (
		<div>
			<Header />
			{/* <News news={news} /> */}
			<AboutUs />
			<Rating data={ratingData} isLoading={isLoading} />
			<YourClub />
		</div>
	);
};

export default Home;
