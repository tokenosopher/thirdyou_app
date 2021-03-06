module.exports = {
  reactStrictMode: true,
  env: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    CLIENT_ID_WEB3AUTH: process.env.CLIENT_ID_WEB3AUTH,
    TWILIO_SEND_EMAIL_URL: process.env.TWILIO_SEND_EMAIL_URL,
    INFURA_IPFS: process.env.INFURA_IPFS,
    MORALIS_API_KEY: process.env.MORALIS_API_KEY,
  },
  images: {
    domains: ["ipfs.infura.io", "ipfs.io"],
  },
};
