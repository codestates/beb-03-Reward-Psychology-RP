import './App.css';
import { Route, Routes } from 'react-router-dom';
import NavBar from './component/NavBar';
import Main from './page/main';
import Mypage from './page/mypage';
import NewPost from './page/newPost';
import ReadPost from './page/readPost';
import { useState } from 'react';

function App() {
    // const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div className="App">
            <NavBar isLoggedIn={true} />
            <div>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/mypage" element={<Mypage />} />
                    <Route path="/newpost" element={<NewPost />} />
                    <Route path="/readpost" element={<ReadPost />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
