// Anything exported from this file is importable 

import axios from 'axios';
import jwt_decode from 'jwt-decode';

const clientId = "e-learner";
const clientSec = "2404e989-7656-479d-b930-d7fdc3f1ecb4";
const Auth_Url = "http://localhost:8180/auth/realms/e-learning-realm/protocol/openid-connect/token";
const header = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
      auth : {
        "username":clientId,
        "password":clientSec
      }
}

export async function getToken(data){
    const { userid, password } = data;
    console.log(userid,password);
    const res = await axios.post(Auth_Url,{
        "grant_type":"password",
        "username":userid,
        "password":password
        },header);
        setData(res);

       

}

export async function getRole(logintype){
    const token = jwt_decode(localStorage.getItem("token"));
    const lgtype = logintype == "admin"?"creator" : logintype.toUpperCase();
    console.log(lgtype)
    const role = token.realm_access.roles.filter((a)=>a.includes(lgtype));
    console.log(role);
    if(role.length > 0){
        const res = role[0].split("-");
        console.log(res);
        return logintype!="admin"?res[res.length-1]:'ADMIN';
    }
    return "invalid";
}

function setData(res){
    localStorage.setItem("token", res.data.access_token);
    
    localStorage.setItem("refresh_token", res.data.refresh_token);
}


export async function refreshToken(refresh_token){
    const res = await axios.post(
        Auth_Url,
        {
            "grant_type": "refresh_token",
            "refresh_token": refresh_token,
        },header
    );
    setData(res);
}
