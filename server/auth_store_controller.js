const auth = require('./auth')
const User = require('./models/user')
const Profile = require('./models/profile')
const bcrypt = require('bcryptjs')

getLoggedIn = async (req, res) => {
    try {
        let userId = auth.verifyUser(req);
        if (!userId) {
            return res.status(200).json({
                loggedIn: false,
                user: null,
                errorMessage: "?"
            })
        }

        const loggedInUser = await User.findOne({ _id: userId });
        console.log("loggedInUser: " + loggedInUser);

        return res.status(200).json({
            loggedIn: true,
            user: {
                username: loggedInUser.username,
                email: loggedInUser.email,
                //phone: loggedInUser.phone
            }
        })
    } catch (err) {
        console.log("err: " + err);
        res.json(false);
    }
}

loginUser = async (req, res) => {
    console.log("loginUser");
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }

        const existingUser = await User.findOne({ email: email });
        console.log("existingUser: " + existingUser);
        if (!existingUser) {
            return res
                .status(401)
                .json({
                    errorMessage: "Wrong email or password provided."
                })
        }

        console.log("provided password: " + password);
        const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);
        if (!passwordCorrect) {
            console.log("Incorrect password");
            return res
                .status(401)
                .json({
                    errorMessage: "Wrong email or password provided."
                })
        }

        // LOGIN THE USER
        const token = auth.signToken(existingUser._id);
        console.log(token);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: true
        }).status(200).json({
            success: true,
            user: {
                username: existingUser.username,  
                email: existingUser.email              
            }
        })

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

logoutUser = async (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none"
    }).send();
}

registerUser = async (req, res) => {
    try {
        const { username, email, password, passwordVerify, phone } = req.body;
        console.log("create user: " + username + " " + email + " " + password + " " + passwordVerify + " " + phone);
        if (!username || !email || !password || !passwordVerify || !phone) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        console.log("all fields provided");
        if (password.length < 8) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter a password of at least 8 characters."
                });
        }
        console.log("password long enough");
        if (password !== passwordVerify) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter the same password twice."
                })
        }
        console.log("password and password verify match");
        const existingUser = await User.findOne({ email: email });
        console.log("existingUser: " + existingUser);
        if (existingUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "An account with this email address already exists."
                })
        }
        //check the phone has all number.
        if(!(/^\d+$/.test(phone))){
            return res
                .status(400)
                .json({ errorMessage: "Contains non-numeric characters." });
        }
        console.log("phone number has all number");

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);
        console.log("passwordHash: " + passwordHash);

        const newUser = new User({
            username, email, passwordHash
        });
        const savedUser = await newUser.save();
        console.log("new user saved: " + savedUser._id);

        const newProfile = new Profile({
            username, phone
        });
        const savedProfile = await newProfile.save();
        console.log("new profile saved: " + savedProfile._id);

        // LOGIN THE USER
        const token = auth.signToken(savedUser._id);
        console.log("token:" + token);
        console.log("username: "+ savedUser.username);

        await res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).json({
            success: true,
            user: {
                username: savedUser.username,  
                email: savedUser.email              
            }
        })

        console.log("token sent");

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

forgetPassword = async (req, res) => {
    try {
    console.log(req.body);
      const { username, email, phone } = req.body;
      console.log(username, email, phone)
      if (!email || !username || !phone) {
        return res
          .status(400)
          .json({ errorMessage: "Please enter all required fields." });
      }
      console.log("entered all fields");
      const user = await User.findOne({ email: email });
      console.log("user: "+ user);
      if (!user) {
        return res
          .status(404)
          .json({ errorMessage: "No matching user found." });
      }
      else{
        console.log("Find user");
      }
      res.status(200).json({
        user: {
          username: user.username,
          email: user.email
        },
      });
      console.log("all Mached");
    } catch (err) {
      console.error(err);
      res.status(500).send();
    }
}

module.exports = {
  getLoggedIn,
  registerUser,
  loginUser,
  logoutUser,
  forgetPassword,
};