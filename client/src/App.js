import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavBar from "./component/NavBar";
import Footer from "./component/Footer";
import Main from "./page/main";
import Mypage from "./page/mypage";
import NewPost from "./page/newPost";
import ReadPost from "./page/readPost";

function App() {
    return (
        <div className="App">
            <NavBar isLoggedIn={true} />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/mypage" element={<Mypage />} />
                <Route path="/newpost" element={<NewPost />} />
                <Route path="/readpost" element={<ReadPost />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
