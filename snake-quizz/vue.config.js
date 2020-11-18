module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
      ? '/snakequizz.io'
      : '/',
    css: {
      loaderOptions: {
        sass: {
          data: `
            @import "@/scss/colors.scss";
          `
        }
      }
    }
  }
  
  