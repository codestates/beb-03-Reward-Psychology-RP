<<<<<<< HEAD
import User from "../models/User";

export const join = (req, res) => {
  return res.send("Join");
};

export const login = (req, res) => {
  return res.send("Login");
=======
import User from "../models/User.js";
import bcrypt from "bcrypt";
import lightwallet from "eth-lightwallet";

export const getJoin = (req, res) => {
  return res.send("Join");
};

export const postJoin = async (req, res) => {
  const { email, userName, password, password2 } = req.body;
  const mnemonic = lightwallet.keystore.generateRandomSeed();
  let address;
  const userNameOrEmailExists = await User.find({
    $or: [{ email }, { userName }],
  });

  if (password !== password2) {
    return res.status(400).send("Password Confirmation does not match");
  }

  if (!userNameOrEmailExists) {
    return res.status(400).send("Join Error: This user is already registered");
    // .render("Join", { errorMessage: "This user is already registered." });
  }

  try {
    lightwallet.keystore.createVault(
      {
        password: password,
        seedPhrase: mnemonic,
        hdPathString: "m/0'/0'/0'",
      },
      function (err, ks) {
        ks.keyFromPassword(password, function (err, pwDerivedKey) {
          ks.generateNewAddress(pwDerivedKey, 1);

          address = ks.getAddresses().toString();

          console.log("⭐️⭐️⭐️ 지갑 주소입니다:", address);
          console.log(
            "⭐️⭐️⭐️ private key 인 거 같은데 확인이 필요합니다:",
            ks.encPrivKeys[address.substring(2)].key
          );
          //   let keystore = ks.serialize();
        });
      }
    );

    await User.create({
      email,
      userName,
      password,
      address,
    });
    return res.send("to Login Page, Success Join");
    // .render("Login");
  } catch (error) {
    return res.status(400).send("Join Not Available");
    // .render("Join", { errorMessage: "Not Available" });
  }
};

export const getLogin = async (req, res) => {
  return res.send("Login Page");
  // .render("Login");
};

export const postLogin = async (req, res) => {
  const { userName, password, profileImage } = req.body;
  const user = await User.findOne({ userName });
  const passwordCompare = bcrypt.compare(password, user.password);
  if (!user) {
    return res.status(404).send("Post Login Success");
    // .render("Login", {errorMessage: "An account with this username dose not exist.",});
  }
  if (!passwordCompare) {
    return res.status(404).send("Password Comparision does not match");
    // .render("Login", {errorMessage: "Wrong Password",});
  }
  console.log("🙆‍♂️ LOG USER IN!");
  return res.redirect("/");
>>>>>>> jeong
};
