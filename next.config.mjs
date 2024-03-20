/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    AUTH_SECRET: "E331C98D78DCC7449F065C3E0941A243",
    MONGODB_URI: "mongodb://localhost:27017/auth",
  },
};

export default nextConfig;
