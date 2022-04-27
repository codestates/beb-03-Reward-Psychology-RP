import { Container, Link, Button } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import axios from 'axios';

function UserIdentify() {
    const [sign, setSign] = useState(false);
    const [userName, setUserName] = useState('');
    const [mail, setMail] = useState('');
    const [pass, setPass] = useState('');
    const [passConfirm, setPassConfirm] = useState('');

    const signHandler = () => {
        if (sign === false) {
            setSign(true);
        } else if (sign === true) {
            setSign(false);
        }
    };

    const handleChange = (ev) => {
        if (ev.target.id === 'outlined-basic_name') {
            setUserName(ev.target.value);
        } else if (ev.target.id === 'outlined-basic_email') {
            setMail(ev.target.value);
        } else if (ev.target.id === 'outlined-basic_pass') {
            setPass(ev.target.value);
        } else if (ev.target.id === 'outlined-basic_passConf') {
            setPassConfirm(ev.target.value);
        }
    };

    async function sendReq() {
        let uri;
        let payload;

        if (sign) {
            uri = 'http://localhost:4000/join';
            payload = {
                email: mail,
                userName: userName,
                password: pass,
                password2: passConfirm,
            };
        } else {
            uri = 'http://localhost:4000/login';
            payload = {
                userName: userName,
                password: pass,
            };
        }

        const res = await axios.post(
            uri,
            payload
            // config
        );

        const data = res.data;
        console.log(data);
    }

    return (
        <Container>
            <Box>
                <Box sx={{ pt: 11 }} />
                {sign ? (
                    <div>
                        <Box
                            sx={{
                                p: 3,
                                fontSize: 30,
                            }}
                        >
                            Sign in
                        </Box>
                        <TextField
                            id="outlined-basic_name"
                            label="user name"
                            variant="outlined"
                            placeholder="Input your user name"
                            fullWidth="true"
                            onChange={handleChange}
                            sx={{ mt: 11 }}
                        />
                        <TextField
                            id="outlined-basic_email"
                            label="email"
                            variant="outlined"
                            placeholder="Input your email"
                            fullWidth="true"
                            onChange={handleChange}
                            sx={{ mt: 2 }}
                        />
                        <TextField
                            id="outlined-basic_pass"
                            type="password"
                            label="Password"
                            variant="outlined"
                            placeholder="Input your Password"
                            fullWidth="true"
                            onChange={handleChange}
                            sx={{ mt: 2 }}
                        />
                        <TextField
                            id="outlined-basic_passConf"
                            type="password"
                            label="Password comfirmation"
                            variant="outlined"
                            placeholder="Input your Password once more"
                            fullWidth="true"
                            onChange={handleChange}
                            sx={{ mt: 2, mb: 2 }}
                        />
                        <Link
                            onClick={() => {
                                signHandler();
                            }}
                        >
                            I already have account!
                        </Link>
                        {userName && mail && pass && passConfirm ? (
                            <Box sx={{ mt: 5 }}>
                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        sendReq();
                                    }}
                                >
                                    sign in
                                </Button>
                            </Box>
                        ) : null}
                    </div>
                ) : (
                    <div>
                        <Box
                            sx={{
                                p: 3,
                                fontSize: 30,
                            }}
                        >
                            log in
                        </Box>
                        <TextField
                            id="outlined-basic_name"
                            label="user name"
                            variant="outlined"
                            placeholder="Input your user name"
                            fullWidth="true"
                            onChange={handleChange}
                            sx={{ mt: 11 }}
                        />
                        <TextField
                            id="outlined-basic_pass"
                            type="password"
                            label="Password (Private key)"
                            variant="outlined"
                            placeholder="Input your Password (Private key)"
                            fullWidth="true"
                            onChange={handleChange}
                            sx={{ mt: 2, mb: 2 }}
                        />
                        <Link
                            onClick={() => {
                                signHandler();
                            }}
                        >
                            Don't you have an account yet?
                        </Link>
                        {userName && pass ? (
                            <Box sx={{ mt: 5 }}>
                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        sendReq();
                                    }}
                                >
                                    login
                                </Button>
                            </Box>
                        ) : null}
                    </div>
                )}
            </Box>
        </Container>
    );
}

export default UserIdentify;
