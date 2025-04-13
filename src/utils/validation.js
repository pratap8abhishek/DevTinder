const validator = require("validator");

const validateSignUpData = (req) => {
    let { firstName, lastName, emailId, password } = req.body;

    // Trim to remove unwanted spaces
    firstName = firstName.trim();
    lastName = lastName.trim();
    emailId = emailId.trim();
    password = password.trim();

    if (!firstName || !lastName) {
        throw new Error("Name is not valid");
    } 
    
    if (!validator.isEmail(emailId)) {   
        throw new Error("Email is Not valid");
    }

    if (!validator.isStrongPassword(password, { minLength: 8, minNumbers: 1, minUppercase: 1, minSymbols: 1 })) {
        throw new Error("Please enter a strong password (at least 8 characters, 1 number, 1 uppercase, 1 symbol)");
    }
};

const validateEditProfileData = (req)=>{
    const allowEditFields = ["firstName","lastName","emailId","photoUrl","gender","age","about","skills"];

    const isEditAllowed = Object.keys(req.body).every((field)=>
    allowEditFields.includes(field)
);
return isEditAllowed;
};

module.exports = { validateSignUpData, validateEditProfileData };
