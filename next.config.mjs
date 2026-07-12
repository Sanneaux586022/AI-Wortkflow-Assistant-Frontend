// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   /* config options here */
//   turbopack:{
//     root: __dirname,
//   },
// };

// export default nextConfig;
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;