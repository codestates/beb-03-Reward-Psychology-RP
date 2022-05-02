import './App.css';
import { Route, Routes } from 'react-router-dom';
import NavBar from './component/NavBar';
import Main from './page/main';
import Mypage from './page/mypage';
import NewPost from './page/newPost';
import ReadPost from './page/readPost';
import BuyNFT from './page/buyNFT';
import { useState } from 'react';
import GlobalContext from './context';

function App() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('default');
    const [addr, setAddr] = useState();
    const [balance, setBalance] = useState(0);
    const [editSeq, setEditSeq] = useState(false);
    const [postingId, setPostingId] = useState();
    const [pvKey, setPvKey] = useState('');
    const [modal, setModal] = useState(false);

    return (
        <div className="App">
            <NavBar isLoggedIn={isLoggedIn} />
            <div>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <GlobalContext.Provider
                                value={{ setEditSeq, setTitle, setContent }}
                            >
                                <Main />
                            </GlobalContext.Provider>
                        }
                    />

                    <Route
                        path="/mypage"
                        element={
                            <GlobalContext.Provider
                                value={{
                                    isLoggedIn,
                                    setIsLoggedIn,
                                    userName,
                                    setUserName,
                                    addr,
                                    setAddr,
                                    balance,
                                    setBalance,
                                    editSeq,
                                    setEditSeq,
                                    pvKey,
                                    setPvKey,
                                    setTitle,
                                    setContent,
                                    modal,
                                    setModal,
                                }}
                            >
                                <Mypage />
                            </GlobalContext.Provider>
                        }
                    />

                    <Route
                        path="/newpost"
                        element={
                            <GlobalContext.Provider
                                value={{
                                    userName,
                                    addr,
                                    postingId,
                                    title,
                                    setTitle,
                                    content,
                                    setContent,
                                    editSeq,
                                    setEditSeq,
                                    modal,
                                    setModal,
                                }}
                            >
                                <NewPost />
                            </GlobalContext.Provider>
                        }
                    />

                    <Route
                        path="/readpost/:id"
                        element={
                            <GlobalContext.Provider
                                value={{
                                    userName,
                                    setPostingId,
                                    setTitle,
                                    setContent,
                                    editSeq,
                                    setEditSeq,
                                }}
                            >
                                <ReadPost />
                            </GlobalContext.Provider>
                        }
                    />

                    <Route
                        path="/buynft"
                        element={
                            <GlobalContext.Provider
                                value={{
                                    userName,
                                    addr,
                                    balance,
                                    setBalance,
                                    setIsLoggedIn,
                                    pvKey,
                                    setPvKey,
                                    setEditSeq,
                                    setTitle,
                                    setContent,
                                }}
                            >
                                <BuyNFT />
                            </GlobalContext.Provider>
                        }
                    />
                </Routes>
            </div>
        </div>
    );
}

export default App;
