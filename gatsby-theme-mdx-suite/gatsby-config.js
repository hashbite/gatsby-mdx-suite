// const annotationResolver = require(`./resolver`)

const isProduction = process.env.NODE_ENV === `production`
const isStaging = !!process.env.STAGING

const renderDocs = isStaging || !isProduction

// const tmpSrc = process.cwd()

module.exports = ({ mdx, doczSrc, forceDocs = false }) => ({
  plugins: [
    // Styling
    `gatsby-plugin-theme-ui`,
    `gatsby-plugin-emotion`,
    // Docs
    (forceDocs || renderDocs) && {
      resolve: `gatsby-theme-docz`,
      options: {
        // filterComponents: (modules) => modules,
        // src: tmpSrc || doczSrc || `src`,
        files: [
          `src/components/mdx/**/docs/*.{md,markdown,mdx}`,
          `node_modules/@gatsby-mdx-suite/*/docs/*.{md,markdown,mdx}`,
          `../../node_modules/@gatsby-mdx-suite/*/docs/*.{md,markdown,mdx}`,
        ],
        noRootRoute: true,
        // docgenConfig: { resolver: annotationResolver },
        customPattern: [
          `src/components/mdx/**/*.{js,jsx,mjs}`,
          `node_modules/@gatsby-mdx-suite/**/*.{js,jsx,mjs}`,
          `../../node_modules/@gatsby-mdx-suite/**/*.{js,jsx,mjs}`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: mdx,
    },
    // SEO
    `gatsby-plugin-react-helmet`,
  ].filter(Boolean),
})
