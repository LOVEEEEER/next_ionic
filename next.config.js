module.exports = {
  basePath: '',
  images: {
    domains: ['images.unsplash.com'],
  },
  env: {
    IMGBB_TOKEN: process.env.IMGBB_TOKEN,
  },
  swcMinify: true,
  transpilePackages: ['@ionic/react', '@ionic/core', '@stencil/core', 'ionicons'],
};
