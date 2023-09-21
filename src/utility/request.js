
/** Check for if field is missing or not
 * 
 * @param {*} req 
 * @param {Array<string>} required_arr 
 * @param {boolean} is_json
 * 
 * @returns {string}  
 */
async function validateRequestFields(req, required_arr, is_json=true){
    let missing_fields = ""
    if(is_json){
        const keys = await req.body;
        for(let i in required_arr){
            if(!(required_arr[i] in keys)){
                missing_fields+=",'"+required_arr[i]+"'";
            }
        }
    }

    //TODO: implement non json data verification
    return missing_fields;
}

// json response with diffrent code

//200 Json response
function okJsonRequest(res, data){
    return res.status(200).json(data);
}


//400 Request 
function notOkRequest(res, data){
    return res.status(400).json(data)
}

// 404 Request
function notFoundRequest(res, data){
    return res.status(404).json(data)
}

// 500 Request 
function serverErrRequest(res, data = undefined){
    if(data == undefined){
        return res.status(500).json({"err":"Internal Server Err!"})
    }
    return res.status(500).json(data)
}

module.exports = {
    okJsonRequest,
    notOkRequest,
    notFoundRequest,
    serverErrRequest,
    validateRequestFields
}