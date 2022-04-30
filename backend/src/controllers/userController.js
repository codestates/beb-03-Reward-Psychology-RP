import User from "../models/User.js";
import bcrypt from "bcrypt";
import lightwallet from "eth-lightwallet";

export const getJoin = (req, res) => {
  return res.send("Join");
};

export const postJoin = async (req, res) => {
  const { email, userName, password, password2 } = req.body;
  const mnemonic = lightwallet.keystore.generateRandomSeed();
  const userNameOrEmailExists = await User.find({
    $or: [{ email }, { userName }],
  });

  // 로그인 과정에서 입력된 password 2개를 비교하여, 사용자가 의도한 password가 입력되도록 합니다.
  if (password !== password2) {
    return res
      .status(400)
      .send({ errorMessage: "Password Confirmation does not match" });
  }

  // users DB에 겹치는 userName이나 email이 있는지 확인합니다.
  if (userNameOrEmailExists.length !== 0) {
    return res
      .status(400)
      .send({ errorMessage: "This user is already registered" });
  }

  // 유저에게 wallet address와 private key를 발급합니다.
  try {
    lightwallet.keystore.createVault(
      {
        password: password,
        seedPhrase: mnemonic,
        hdPathString: "m/0'/0'/0'",
      },
      function (err, ks) {
        if (err) {
          return res.send({ errorMessage: `❌ KeyStore Error: ${err}` });
        }

        ks.keyFromPassword(password, function (err, pwDerivedKey) {
          ks.generateNewAddress(pwDerivedKey, 1);

          let address = ks.getAddresses().toString();
          let privateKey = ks.exportPrivateKey(address, pwDerivedKey);

          // user를 users DB에 저장합니다.
          User.create({
            email,
            userName,
            password,
            address,
          });

          console.log("⭐️⭐️⭐️ 지갑 주소입니다1:", address);
          console.log(
            "⭐️⭐️⭐️ private key입니다.",
            ks.exportPrivateKey(address, pwDerivedKey)
          );

          return res.send({
            successMessage: "Join Success, Go to Login Page",
            address,
            privateKey,
            mnemonic,
          });
        });
      }
    );
  } catch (error) {
    return res.status(400).send({ errorMessage: "Join Not Available" });
  }
};

export const getLogin = async (req, res) => {
  return res.send("Get Login Page");
};

export const postLogin = async (req, res) => {
  const { userName, password } = req.body;
  const user = await User.findOne({ userName });
  const passwordComparision = await bcrypt.compare(password, user.password);

  if (!user) {
    return res
      .status(404)
      .send({ errorMessage: "An account with this username dose not exist." });
  }

  if (!passwordComparision) {
    return res
      .status(404)
      .send({ errorMessage: "Password Comparision does not match" });
  }

  req.session.loggedIn = true;
  req.session.user = user;

  console.log("🙆‍♂️ LOG USER IN!");
  return res.send({});
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.send("Success Logout");
};

// const edit = (req, res) => {
//   return res.send("Edit");
// };
