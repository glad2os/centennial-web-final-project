const jwt = require("jsonwebtoken");

async function verifyAccessToken(token) {
    return jwt.verify(token, process.env.TOKEN_SECRET);
}

function generateAccessToken(username) {
    return jwt.sign({username: username}, process.env.TOKEN_SECRET, {expiresIn: '7d'});
}

module.exports = {
    verifyAccessToken,
    generateAccessToken
}
