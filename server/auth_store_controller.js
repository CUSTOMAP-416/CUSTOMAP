const auth = require('./auth')
const User = require('./models/user')
const Profile = require('./models/profile')
const Map = require('./models/map')
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

        const maps = []
        for(let i=0; i<loggedInUser.maps.length; i++){
            const map = await Map.findById(loggedInUser.maps[i])
            maps.push({
                _id: map._id,
                title: map.title,
                createdDate: map.createdDate,
            })
        }

        const profile = await Profile.findById(loggedInUser.profile);
        return res.status(200).json({
            loggedIn: true,
            user: {
                username: loggedInUser.username,
                email: loggedInUser.email,
                phone: profile.phone,   
                maps: maps, 
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

        const maps = []
        for(let i=0; i<existingUser.maps.length; i++){
            const map = await Map.findById(existingUser.maps[i])
            maps.push({
                _id: map._id,
                title: map.title,
                createdDate: map.createdDate,
            })
        }

        const profile = await Profile.findById(existingUser.profile);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: true
        }).status(200).json({
            success: true,
            user: {
                username: existingUser.username,  
                email: existingUser.email,
                phone: profile.phone,    
                maps: maps,        
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

        const newProfile = new Profile({
            phone
        });
        const savedProfile = await newProfile.save();
        const profile = savedProfile._id
        console.log("new profile saved: " + profile);

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);
        console.log("passwordHash: " + passwordHash);

        const newUser = new User({
            username, email, passwordHash, profile
        });
        const savedUser = await newUser.save();
        console.log("new user saved: " + savedUser._id);

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
                email: savedUser.email,
                phone: phone,   
                maps: [],              
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
      const userinfo = await User.findOne({ email: email, username: username });
      console.log("userinfo: " + userinfo);
      if (!userinfo) {
        return res
          .status(404)
          .json({ errorMessage: "No matching user namd and email found." });
      } else {
        console.log("Find user name email");
        
        const userphone = await Profile.findById(userinfo.profile);
        console.log("userphone: " + userphone.phone);

        if (userphone.phone !== phone) {
          return res
            .status(404)
            .json({ errorMessage: "No matching user phone found." });
        } else {
          console.log("Find user phone");
        }
      }
      res.status(200).json({ message: "ForgetSuccess" });
      console.log("all Mached");
    } catch (err) {
      console.error(err);
      res.status(500).send();
    }
}

editUserInfo = async (req, res) => {
    try{
        const { username, email, password, phone } = req.body;
        console.log("edit user: " + username + " " + email + " " + password + " " + phone);
        
        const userToUpdate = await User.findOne({ email: req.params.email });
        if (!userToUpdate) {
            return res.status(404).json({ errorMessage: "User not found." });
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);
        console.log("passwordHash: " + passwordHash);
        await User.updateOne(
            {"_id": userToUpdate._id},
            {$set: {"username": username, "email":email, "passwordHash":passwordHash}}
        )
        console.log("user updated");
        const profile = await Profile.findById(userToUpdate.profile);
        await Profile.updateOne(
            {"_id": profile._id},
            {$set: {"phone": phone}}
        )
        console.log("profile updated");

        const maps = []
        for(let i=0; i<userToUpdate.maps.length; i++){
            const map = await Map.findById(userToUpdate.maps[i])
            maps.push({
                _id: map._id,
                title: map.title,
                createdDate: map.createdDate,
            })
        }

        return res.status(200).json({
            success: true,
            user: {
                username: username,  
                email: email,
                phone: phone,   
                maps: maps,          
            },
            message: "Changed User Info"
        })
    } catch(err) {
        console.error(err);
        res.status(500).send();
    }
}

createMap = async (req, res) => {
    try {
        const { email, mapTitle, mapData} = req.body;
        let deserializedData = JSON.parse(mapData);
        console.log("create map: " + email + " " + mapTitle);
        //console.log(deserializedData);
        const user = await User.findOne({ email: email });
        const userID = user._id;
        const newMap = new Map({
            title: mapTitle, owner: userID, mapData: deserializedData
        });
        const savedMap = await newMap.save();
        console.log("new map saved: " + savedMap._id);
        const maps = user.maps;
        maps.push(savedMap._id);
        await User.updateOne(
            {"_id": userID},
            {$set: {"maps": maps}})
        console.log("user updated");
        return res.status(200).json({
            message: "Created successfully!",
        })
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

getMap = async (req, res) => {
    try {
        const { mapId } = req.body;
        console.log("map id: " + mapId);
        const map = await Map.findById(mapId);
        console.log("get map: " + map.title);
        return res.status(200).json({
            map: map,
        })
    } catch (err) {
        console.log("err: " + err);
        res.json(false);
    }
}

editMap= async (req, res) => {
    try {
        const { _id, title } = req.body;
        console.log("map: " + _id + " " + title);
        await Map.updateOne(
            {"_id": _id},
            {$set: {"title": title}})
        console.log("map updated");
        res.status(200).send();
    } catch (err) {
        console.log("err: " + err);
        res.json(false);
    }
}

module.exports = {
  getLoggedIn,
  registerUser,
  loginUser,
  logoutUser,
  forgetPassword,
  editUserInfo,
  createMap,
  getMap,
  editMap,
};
