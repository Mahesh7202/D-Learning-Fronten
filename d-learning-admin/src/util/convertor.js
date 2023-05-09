
import {Department, Branch, SemNo} from "../data/constants";

export function convertCTToFeilds(CT){

    const { d, b, s } = convertCttoFeildsValues(CT);

    const department = Department.find((v) => v["value"] == d);
    const branch = Branch.find((v) => v["value"] == b);
    const semno = s ? SemNo.find((v) => v["value"] == s): undefined;

    console.log(CT);

    return {
        "department": department ? department["label"]:'' ,
        "branch": branch ? branch["label"]: '',
        "semno": semno ? semno["label"] : ''
    }
}

export function convertCttoFeildsValues(CT){
    const value = String(CT).split('').map(item => Number(item));
    return {
        "d": value[0],
        "b": value[1],
        "s": value.length > 1 ? value[2]: undefined
    }

}