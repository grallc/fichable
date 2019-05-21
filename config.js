// Clés liées à l'utilisation du captcha de soumission des fiches
const getFicheCaptchaKey = () => process.env.FICHES_CAPTCHA_KEY || `6Ldj0KMUAAAAAAsxuWCndk2tO802cAYFwoFoD_zj`;
const getFicheCaptchaSecret = () => process.env.FICHES_CAPTCHA_SECRET || `6Ldj0KMUAAAAAHnXbyNqZCDHpP2mH_9Jm4vzSrqe`;

// Clés liées à l'utilisation du captcha d'inscription
const getRegisterCaptchaKey = () => process.env.REGISTER_CAPTCHA_KEY || `6Ldc3aMUAAAAAJ_hZK4x_1QtA3T18dWbyjAmjCXQ`;
const getRegisterCaptchaSecret = () => process.env.REGISTER_CAPTCHA_SECRET || `6Ldc3aMUAAAAAIswGbZ_oJLy8_ZZ4Bba4vATK6Ap`;

// Selon l'environnement de production, à savoir production ou développement, on retourne l'URI vers la BDD
const getDatabaseURI = () => process.env.NODE_ENV === 'production' ? (process.env.MONGO_URI || `mongodb://localhost:27017/fichable-pro`) : (process.env.MONGO_URI || 'mongodb://localhost:27017/fichable-dev');

// On retourne la clé de génération des mots de passe
const getAuthSecret = () => process.env.AUTH_SECRET || `;tcRLfSKq\KPf^d-5~i\_B"`;

// Le port est-il différent du port par défaut ?
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
