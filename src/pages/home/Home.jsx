import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";

const Home = () => {
    return (
        <div className="home">
            <Sidebar />
            <h1 className="title">
                <Navbar />
                Home container
            </h1>
        </div>
    )
}

export default Home