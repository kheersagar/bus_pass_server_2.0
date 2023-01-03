const jwt = require("jsonwebtoken");
const tokenCheck = (req,res,next) =>{
  const token = req.headers['x-access-token'];
  console.log(req.headers)
  if (token === null) res.status(403).send("No Token Found");

  try {
    const isValid = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (isValid) {
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(401).send(err);
  }
}
const isAdmin = (req,res,next) =>{
  const token = req.headers['x-access-token'];
  if (token === null) res.status(403).send("No Token Found");

  try {
    const isValid = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (isValid && isValid.role === 'admin') {
      next();
    }else{
      res.status(403).send("Not an Admin")
    }
  } catch (err) {
    console.log(err);
    res.status(401).send(err);
  }
}

module.exports ={tokenCheck,isAdmin}