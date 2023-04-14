const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const jwt_SECRET = 'Nasirkhsnisagood$oy';


// Route 1.  Creating user using :POST "api/auth/createuser" . NO login required


router.post('/createuser', [
  body('name', 'Enter a Valid Name').isLength({ min: 3 }),
  body('email', 'Enter a valid Email').isEmail(),
  body('password', 'Enter Password atleast 5 character').isLength({ min: 5 }),
], async (req, res) => {
  // if there are errors , return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Check Whether the User whith this email exists already
  try {


    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "Sorry a user with this email already exist" })
    }

    const salt = await bcrypt.genSalt(10);
    let secPass = await bcrypt.hash(req.body.password, salt);

    // user is created
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass
    });

    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, jwt_SECRET);
   console.log(authtoken);
    res.json({ authtoken });


    // if any other error ocure catch by this
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 2 .Authentication user using :POST "api/auth/login" . NO login required


router.post('/login', [
  body('email', 'Enter a valid Email').isEmail(),
  body('password', 'Password can not be black').exists(),
], async (req, res) => {
  let success = false;
  // if there are errors , return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // email and password are take from req.body using destructuring
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Please try to login correct credentials" })
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success = false;
      return res.status(400).json({success, error: "Please try to login correct credentials" })
    }


    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, jwt_SECRET);
    success = true;
    res.json({success, authtoken });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 3 .Get loggedin user details using :POST "api/auth/getuser" .  login required


router.post('/getuser',fetchuser, async (req, res) =>{
       try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
       }  catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
})

module.exports = router