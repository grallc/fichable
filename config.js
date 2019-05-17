const getFicheCaptchaKey = () => process.env.FICHES_CAPTCHA_KEY || `6Ldj0KMUAAAAAAsxuWCndk2tO802cAYFwoFoD_zj    `;
const getFicheCaptchaSecret = () => process.env.FICHES_CAPTCHA_SECRET || `6Ldj0KMUAAAAAHnXbyNqZCDHpP2mH_9Jm4vzSrqe`;

const getRegisterCaptchaKey = () => process.env.REGISTER_CAPTCHA_KEY || `6Ldc3aMUAAAAAJ_hZK4x_1QtA3T18dWbyjAmjCXQ`;
const getRegisterCaptchaSecret = () => process.env.REGISTER_CAPTCHA_SECRET || `6Ldc3aMUAAAAAIswGbZ_oJLy8_ZZ4Bba4vATK6Ap`;

const getDatabaseURI = () => process.env.NODE_ENV === 'production' ? (process.env.MONGO_URI || `mongodb://localhost:27017/fichable-pro`) : (process.env.MONGO_URI || 'mongodb://localhost:27017/fichable-dev');

const getAuthSecret = () => process.env.AUTH_SECRET || `;tcRLfSKq\KPf^d-5~i\_B"`;

const getPort = () => process.env.PORT || 8080

module.exports = {
    getFicheCaptchaKey,
    getFicheCaptchaSecret,
    getRegisterCaptchaKey,
    getRegisterCaptchaSecret,
    getDatabaseURI,
    getAuthSecret,
    getPort
}
