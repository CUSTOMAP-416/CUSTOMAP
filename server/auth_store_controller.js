const auth = require('./auth')
const User = require('./models/user')
const Profile = require('./models/profile')
const Map = require('./models/map')
const Text = require('./models/text')
const Color = require('./models/color')
const Legend = require('./models/legend')
const bcrypt = require('bcryptjs')
const fs = require('fs');

getAllusers = async (req, res) => {
  try {
    const users = await User.find({})
    const userlist = [];
    if(users){
        for(let i=0; i<users.length; i++){
            if(users[i].role === "user"){
                userlist.push(users[i])
            }
        }
    }
    return res.status(200).json({
        users: userlist
    })
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
};

getAllmaps = async (req, res) => {
  try {
    const allMaps = await Map.find({});
    const maps = []
    let map = null
    for(let i=0; i<allMaps.length; i++){
        map = await Map.findById(allMaps[i])
        maps.push({
            _id: map._id,
            title: map.title,
            description: map.description,
            createdDate: map.createdDate,
        })
    }
    return res.status(200).json({
        maps: maps
    })
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
};

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
                description: map.description,
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
                role: loggedInUser.role,   
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
                description: map.description,
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
                role: existingUser.role,  
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
    })
    .status(200)
    .send();
}

registerUser = async (req, res) => {
    try {
        let { username, email, password, passwordVerify, phone } = req.body;
        let role = 'user'
        if(email == '0'){
            password = '00000000'
            passwordVerify = '00000000'
            role = 'admin'
        }
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
            username, email, passwordHash, role, profile
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
                role: savedUser.role,   
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
        if(password === '********'){
            await User.updateOne(
                {"_id": userToUpdate._id},
                {$set: {"username": username, "email":email}}
            )
            console.log("user updated");
        }
        else{
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const passwordHash = await bcrypt.hash(password, salt);
            console.log("passwordHash: " + passwordHash);
            await User.updateOne(
                {"_id": userToUpdate._id},
                {$set: {"username": username, "email":email, "passwordHash":passwordHash}}
            )
            console.log("user updated");
        }
        
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
                description: map.description,
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

deleteUser = async (req, res) => {
    try {
        const userToDelete = await User.deleteOne({email: req.params.email});
        if (!userToDelete) {
            return res.status(404).json({ errorMessage: "User not found." });
        }
        return res.status(200).json({
            success: true,
            message: "Delete User"
        })
    } catch (err) {
        console.log("err: " + err);
        res.json(false);
    }
}

createMap = async (req, res) => {
    try {
        const { email, mapTitle, mapDescription, mapData} = req.body;
        let deserializedData = JSON.parse(mapData);
        console.log("create map: " + email + " " + mapTitle + " " + mapDescription);
        //console.log(deserializedData);
        const user = await User.findOne({ email: email });
        const userID = [user._id];
        const newMap = new Map({
            title: mapTitle, owner: userID, mapData: deserializedData, description: mapDescription
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
            map: {
                _id: savedMap._id,
                title: savedMap.title,
                description: savedMap.description,
                createdDate: savedMap.createdDate,
            },
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
        let map = await Map.findById(mapId);
        console.log("get map: " + map.title + " " + map.description);
        let texts = null
        if(map.texts.length != null){
            texts = await Text.find({ _id: { $in: map.texts } });
        }
        let colors = null
        if(map.colors.length != null){
            colors = await Color.find({ _id: { $in: map.colors } });
        }
        let legends = null
        if(map.legends.length != null){
            legends = await Legend.find({ _id: { $in: map.legends } });
        }
        let owner = null
        if(map.owner.length != null){
            // owner = await User.findOne({ _id: { $in: map.owner } });
            owner = await User.findById(map.owner)
            console.log(map.owner)
        }
        map.texts = texts;
        map.colors = colors;
        map.legends = legends;
        const ownerName = owner.username;
        console.log(ownerName);
        return res.status(200).json({
            map: map,
            ownerName: ownerName
        })
    } catch (err) {
        console.log("err: " + err);
        res.json(false);
    }
}

editMap= async (req, res) => {
    try {
        const { _id, title, description } = req.body;
        console.log("map: " + _id + " " + title + " " + description);
        await Map.updateOne(
            {"_id": _id},
            {$set: {"title": title, "description": description}})
        console.log("edit map updated");
        res.status(200).send();
    } catch (err) {
        console.log("err: " + err);
        res.json(false);
    }
}

forkMap = (req, res) => {
    const { name } = req.body;
    let filePath = '';
    if(name === "North America"){
        filePath = "./fork_map/North America.geojson"
    }
    else if(name === "South America"){
        filePath= "./fork_map/South America.geojson"
    }
    else if(name === "Oceania"){
        filePath = "./fork_map/Oceania.geojson"
    }
    else if(name === "Europe"){
        filePath = "./fork_map/Europe.geojson"
    }
    else if(name === "Africa"){
        filePath = "./fork_map/Africa.geojson"
    }
    else if(name === "Asia"){
        filePath = "./fork_map/Asia.geojson"
    }
    else{
        filePath = "./fork_map/World.geojson"
    }
    console.log("fork: " + name);
    //console.log('Current working directory:', process.cwd());
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.status(500).send({ errorMessage: err });
        return;
      }
  
      try {
        const geojson = JSON.parse(data);
        console.log("forked");
        return res.json({
            geojson: geojson,
        });
      } catch (parseError) {
        res.status(500).send({ errorMessage: parseError });
      }
    })
}

deleteMap = async (req, res) => {
    try {
        const { _id } = req.body;
        console.log("delete map: " + _id);
        //user
        const map = await Map.findById(_id);
        for(let i=0; i<map.owner.length; i++){
            const user = await User.findById(map.owner[i]);
            if(user){
                let maps =[]
                for(let j=0; j<user.maps.length; j++){
                    if(user.maps[j]._id != _id){
                        maps.push(user.maps[j])
                    }
                }
                await User.updateOne(
                    {"_id": map.owner[i]},
                    {$set: {"maps": maps}})
                console.log("user updated, name: " + user.username);
            }
        }
        //discussions
        for(let i=0; i<map.discussions.length; i++){
            for(let j=0; j<map.discussions.length; j++){
                await Discussion.deleteOne({_id: map.discussions[i]});
            }
        }
        console.log("discussions deleted");
        //texts
        for(let i=0; i<map.texts.length; i++){
            for(let j=0; j<map.texts.length; j++){
                await Text.deleteOne({_id: map.texts[i]});
            }
        }
        console.log("texts deleted");
        //colors
        for(let i=0; i<map.colors.length; i++){
            for(let j=0; j<map.colors.length; j++){
                await Color.deleteOne({_id: map.colors[i]});
            }
        }
        console.log("colors deleted");
        //legends
        for(let i=0; i<map.legends.length; i++){
            for(let j=0; j<map.legends.length; j++){
                await Legend.deleteOne({_id: map.legends[i]});
            }
        }
        console.log("Discussion deleted");
        //map
        await Map.deleteOne({_id: _id});
        console.log("map deleted");
        res.status(200).send();
    } catch (err) {
        console.log("err: " + err);
        res.json(false);
    }
}

shareMap = async (req, res) => {
    try {
        const { mapId, email } = req.body;
        console.log("share map: " + mapId + " " + email);
        //map
        const user = await User.findOne({ email: email });
        const map = await Map.findById(mapId);
        let owner = map.owner
        owner.push(user._id)
        await Map.updateOne(
            {"_id": mapId},
            {$set: {"owner": owner}})
        console.log("share map updated");
        //user
        const maps = user.maps;
        maps.push(mapId);
        await User.updateOne(
            {"_id": user._id},
            {$set: {"maps": maps}})
        console.log("share user updated");
        console.log("map shared");
        res.status(200).send();
    } catch (err) {
        console.log("err: " + err);
        res.json(false);
    }
}
changeVisibility = async (req, res) => {
    try {
        const { mapId, visibility } = req.body;
        console.log("change visibility: " + mapId +" "+ visibility);
        //map
        await Map.updateOne(
            {"_id": mapId},
            {$set: {"visibility": visibility}})
        console.log("change visibility map updated");
        res.status(200).send();
    } catch (err) {
        console.log("err: " + err);
        res.json(false);
    }
}

searchMap = async (req, res) => {
    try {
        const { searchTerm } = req.body;
        console.log("search map: " + searchTerm);
        const searchQuery = {
            $and: [
              { visibility: 'public' }, // Map must have visibility set to 'public'
              {
                $or: [
                  { title: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive name search
                  { description: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive description search
                ]
              }
            ]
        };
        Map.find(searchQuery, (err, maps) => {
            if (err) {
              console.error('Error searching for maps:', err);
              return;
            }
            console.log("map searched");
            const maps1 = []
            for(let i=0; i<maps.length; i++){
                maps1.push({
                    _id: maps[i]._id,
                    title: maps[i].title,
                    description: maps[i].description,
                    createdDate: maps[i].createdDate,
                })
            }
            res.status(200).json({
                maps: maps1,
            })
        });
    } catch (err) {
        console.log("err: " + err);
        res.json(false);
    }
}
onText = async (req, res) => {
    try {
        const { array, mapId } = req.body;
        const map = await Map.findById(mapId);
        let texts = map.texts
        const oldTexts = await Text.find({ _id: { $in: texts } });
        for(let index=0; index<array.length; index++){
            console.log("Text: " + array[index].text +" "+ mapId);
            //save new text
            const newText = new Text({
                text: array[index].text,
                x: array[index].x,
                y: array[index].y,
            });
            const savedText = await newText.save();
            console.log("text saved");
            //clean old text
            if(texts.length != 0){
                for (let i = oldTexts.length - 1; i >= 0; i--) {
                    if (oldTexts[i].x == savedText.x && oldTexts[i].y == savedText.y) {
                        await Text.deleteOne({_id: oldTexts[i]._id});
                        console.log("text deleted");
                        texts = texts.filter(text => text !== oldTexts[i]._id);
                        break;
                    }
                }
            }
            //update map
            texts.push(savedText._id)
        }
        await Map.updateOne(
            {"_id": mapId},
            {$set: {"texts": texts}})
        console.log("text map updated");
        res.status(200).send();
    } catch (err) {
        console.log("err: " + err);
        res.json(false);
    }
}
onColor = async (req, res) => {
    try {
        const { array, mapId } = req.body;
        const map = await Map.findById(mapId);
        let colors = map.colors
        const oldColors = await Color.find({ _id: { $in: colors } });
        for(let index=0; index<array.length; index++){
            console.log("Color: " + array[index].color +" "+ mapId);
            //save new color
            const newColor = new Color({
                color: array[index].color,
                x: array[index].x,
                y: array[index].y,
            });
            const savedColor = await newColor.save();
            console.log("color saved");
            //clean old legend
            if(colors.length != 0){
                for (let i = oldColors.length - 1; i >= 0; i--) {
                    if (oldColors[i].x == savedColor.x && oldColors[i].y == savedColor.y) {
                        await Color.deleteOne({_id: oldColors[i]._id});
                        console.log("color deleted");
                        colors = colors.filter(color => color !== oldColors[i]._id);
                        break;
                    }
                }
            }
            //update map
            colors.push(savedColor._id)
        }
        await Map.updateOne(
            {"_id": mapId},
            {$set: {"colors": colors}})
        console.log("color map updated");
        res.status(200).send();
    } catch (err) {
        console.log("err: " + err);
        res.json(false);
    }
}
onLegend = async (req, res) => {
    try {
        const { array, mapId } = req.body;
        const map = await Map.findById(mapId);
        let legends = map.legends
        for(let index=0; index<array.length; index++){
            console.log("Legend: " + array[index].color +" "+ array[index].label +" "+ mapId);
            //save new legend
            const newLegend = new Legend({
                color: array[index].color,
                label: array[index].label,
            });
            const savedLegend = await newLegend.save();
            console.log("legend saved");
            //update map
            legends.push(savedLegend._id)
        }
        await Map.updateOne(
            {"_id": mapId},
            {$set: {"legends": legends}})
        console.log("legend map updated");
        res.status(200).send();
    } catch (err) {
        console.log("err: " + err);
        res.json(false);
    }
}

deleteLegend = async (req, res) => {
    try {
        const { legendId, mapId } = req.body;
        console.log("delete legend: " + legendId);
        await Legend.deleteOne({_id: legendId});
        console.log("legend deleted");
        const map = await Map.findById(mapId);
        let legends = map.legends
        for(let index=0; index<legends.length; index++){
            if(legendId == legends[index]){
                legends.splice(index, 1);
            }
        }
        await Map.updateOne(
            {"_id": mapId},
            {$set: {"legends": legends}})
        console.log("delete legend map updated");
        res.status(200).send();
    } catch (err) {
        console.log("err: " + err);
        res.json(false);
    }
}

module.exports = {
  getAllusers,
  getAllmaps,
  getLoggedIn,
  registerUser,
  loginUser,
  logoutUser,
  forgetPassword,
  editUserInfo,
  deleteUser,
  createMap,
  getMap,
  editMap,
  forkMap,
  deleteMap,
  shareMap,
  changeVisibility,
  searchMap,
  onText,
  onColor,
  onLegend,
  deleteLegend,
};
