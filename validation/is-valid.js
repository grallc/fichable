const isValidUsername =  (username) => {
    return /^[A-Za-z0-9_-]{4,15}$/.test(username)
}

const isValidPassword =  (password) => {
    return /^[A-Za-z0-9_@#/-]{8,15}$/.test(password)
}

module.exports = {isValidUsername, isValidPassword};