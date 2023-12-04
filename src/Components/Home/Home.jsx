import Banner from "./Banner";
import Fair from "./Fair";
import Properties from "./Properties";
import Services from "./Services";
import Testimonials from "./Testimonials";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Services></Services>
            <Properties></Properties>
            <Testimonials></Testimonials>
            <Fair></Fair>
        </div>
    );
};

export default Home;