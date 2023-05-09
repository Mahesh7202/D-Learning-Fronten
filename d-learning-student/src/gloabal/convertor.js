
 //import {Department, Branch, SemNo} from "../data/constants";
import { Department, Branch, SemNo } from "./constants";
export function convertCTToFeilds(CT){

    const value = String(CT).split('').map(item => Number(item));
    return {
        "department":d(value[0]),
        "branch": b(value[1]),
        "semno": s(value[2])
    }
}

 export function d(value){
    const dept = Department.find((v) => v["value"] == value);
    return dept ? dept["label"]: ''
}

export function b(value){
    const bran = Branch.find((v) => v["value"] == value);
    return bran? bran["label"]: ''
}

export function s(value){
    const semno = SemNo.find((v) => v["value"] == value);
    return semno? semno["label"]: ''
}