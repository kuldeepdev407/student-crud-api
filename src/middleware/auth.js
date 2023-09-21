const firebase = require("firebase-admin");
const { notOkRequest } = require("../utility/request");
async function verifyJWT(req, res, next) {
  const headers = await req.headers;
  if (!("authorization" in headers)) {
    return notOkRequest(res, { msg: "Auth token is not provided" });
  }
  try {
    let auth_token = headers["authorization"].split(" ")[1];
    const id = await firebase
      .app()
      .auth()
      .verifyIdToken(auth_token);
      
    
    if(id){
        return next();
    }
      
  } catch (e) {
    return notOkRequest(res, {"msg": "Auth token is not correct", "err_data":e.message})
  }
}

module.exports = {
  verifyJWT,
};
