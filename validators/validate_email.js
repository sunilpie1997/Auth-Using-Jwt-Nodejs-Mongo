/* reg exp for email validation*/
let regex=/^\S{1,90}@gmail\.com$/;

exports.validateEmail=function(email){
console.log(regex);
    return regex.test(email);
}