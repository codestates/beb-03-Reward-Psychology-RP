function UserIdentify({ setIsLoggedIn, setUserData }) {
    // const isLoggedIn = useSelector((state) => {
    //     state.isLoggedIn;
    // });
    // console.log(isLoggedIn);
    const [sign, setSign] = useState(false);
    const [errFlag, setErrFlag] = useState('');
    const [userName, setUserName] = useState('');
    const [mail, setMail] = useState('');
    const [pass, setPass] = useState('');
    const [passConfirm, setPassConfirm] = useState('');

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
        const res = await axios.post(uri, payload).catch((err) => {
            // setErrFlag(err.response.data.errorMessage);
            console.log(err.response);
        });

        if (res) {
            if (sign) {
                resAlert(
                    1,
                    'Your account is created! Please log in using your address!'
                );
                setSign(false);
            } else {
                setIsLoggedIn(true);
                console.log(res.data);
                setUserData(res.data);
                window.location.href = '/mypage';
            }
        }
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
                        {console.log(errFlag)}
                        {errFlag.indexOf('Join') === -1
                            ? errFlag.indexOf('Confirmation') === -1
                                ? null
                                : resAlert(0, errFlag)
                            : resAlert(0, errFlag)}
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
