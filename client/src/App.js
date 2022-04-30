import './App.css';
import { Route, Routes } from 'react-router-dom';
import NavBar from './component/NavBar';
import Main from './page/main';
import Mypage from './page/mypage';
import NewPost from './page/newPost';
import ReadPost from './page/readPost';
import BuyNFT from './page/buyNFT';
import { useState } from 'react';

function App() {
    const [tempTitle, setTempTitle] = useState('');
    const [tempContent, setTempContent] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('default');
    const [addr, setAddr] = useState();
    const [balance, setBalance] = useState(0);
    const [editSeq, setEditSeq] = useState(false);
    const [postingId, setPostingId] = useState();

    return (
        <div className="App">
            <NavBar isLoggedIn={isLoggedIn} />
            <div>
                <Routes>
                    <Route
                        path="/"
                        element={<Main setEditSeq={setEditSeq} />}
                    />
                    <Route
                        path="/mypage"
                        element={
                            <Mypage
                                isLoggedIn={isLoggedIn}
                                setIsLoggedIn={setIsLoggedIn}
                                userName={userName}
                                setUserName={setUserName}
                                addr={addr}
                                setAddr={setAddr}
                                balance={balance}
                                setBalance={setBalance}
                                editSeq={editSeq}
                                setEditSeq={setEditSeq}
                            />
                        }
                    />
                    <Route
                        path="/newpost"
                        element={
                            <NewPost
                                editSeq={editSeq}
                                setEditSeq={setEditSeq}
                                userName={userName}
                                postingId={postingId}
                                tempTitle={tempTitle}
                                tempContent={tempContent}
                            />
                        }
                    />
                    <Route
                        path="/readpost/:id"
                        element={
                            <ReadPost
                                userName={userName}
                                setEditSeq={setEditSeq}
                                setPostingId={setPostingId}
                                setTempTitle={setTempTitle}
                                setTempContent={setTempContent}
                            />
                        }
                    />
                    <Route
                        path="/buynft"
                        element={
                            <BuyNFT
                                userName={userName}
                                addr={addr}
                                balance={balance}
                                setIsLoggedIn={setIsLoggedIn}
                            />
                        }
                    />
                </Routes>
            </div>
        </div>
    );
}

export default App;
