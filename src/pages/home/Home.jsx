import Sidebar from "../../components/sidebar/Sidebar";
import "./home.scss";

const Home = () => {
    return (
        <div className="home">
            <Sidebar />
            <h1 className="title">Home</h1>
        </div>
    )
}

export default Home