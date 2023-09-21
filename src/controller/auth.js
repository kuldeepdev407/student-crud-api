const Student = require('../model/Student')
const bcrypt = require('bcrypt')
const firebase = require('firebase-admin')
const axios = require('axios');
const { validateRequestFields, notOkRequest, okJsonRequest } = require('../utility/request')

async function loginStudent(req, res){
    const validate = await validateRequestFields(req, ["email","password"]);
    if(validate !== ""){
        return notOkRequest(res, {"msg":"missing fields"+validate});
    }

    const data = await req.body;
    try{
        const student = await Student.findOne({email:data.email});
        if(student){
            const password_match = await bcrypt.compare(data.password, student.password);

            if(password_match){
                // creating firebase cutome token
                const token = await firebase.app().auth().createCustomToken(student.id);

                // getting a verificable token from Firebase
                const get_token = await axios({
                    url: `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=${process.env.FIREBASE_API_KEY}`,
                    method: 'post',
                    data: {
                      token: token,
                      returnSecureToken: true
                    },
                    json: true,
                  });
                return okJsonRequest(res,{"msg":"Login Succesfully", "token":get_token.data.idToken, "id":student.id}) 
            }
            return notOkRequest(res, {"msg":"Password does not match"}); 
        }
    }catch(e){
        return notOkRequest(res, {"msg":"Some error occure", "err_data":e.message})

    }
    return notOkRequest(res, {"msg":"Email does not exist!"})
}

module.exports = {
    loginStudent
}