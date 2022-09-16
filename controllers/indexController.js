const userModel = require('../models/userSchema');
const { sendToken } = require('../utils/auth');

exports.profile =async function (req, res) {
   const alluser= await userModel.find()
   res.json({alluser})
    
}

exports.signup = async (req, res) => {
   try {
    const { username, email, password } = req.body;
    const newUser = new userModel({ username, email, password });
    const CreatedUser = await newUser.save();

    sendToken(res,200,CreatedUser);

   } catch (error) {
         res.status(500).json(error.message);
   }
}

exports.signin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userModel.findOne({ username }).select('+password').exec();
        const result = await user.comparePassword(password);
        
        sendToken(res,200,user);

        } catch (error) {
        res.status(500).json(error.message);
    }
}



exports.createuser = (req, res) => {
    userModel.create({
        name: req.body.name,
        age: req.body.age
    }).then((user) => {
        res.json({ user });
    })
}
