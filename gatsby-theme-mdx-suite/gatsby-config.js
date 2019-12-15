const isProduction = process.env.NODE_ENV === `production`
const isStaging = !!process.env.STAGING

const renderDocs = isStaging || !isProduction

module.exports = ({ mdx, doczSrc, forceDocs = false }) => ({
  plugins: [
    // Styling
    `gatsby-plugin-theme-ui`,
    `gatsby-plugin-emotion`,
    // Docs
    (forceDocs || renderDocs) && {
      resolve: `gatsby-theme-docz`,
      options: {
        filterComponents: (modules) => modules,
        files: [
          `src/components/mdx/**/docs/*.{md,markdown,mdx}`,
          `node_modules/@gatsby-mdx-suite/*/docs/*.{md,markdown,mdx}`,
          `../../node_modules/@gatsby-mdx-suite/*/docs/*.{md,markdown,mdx}`,
        ],
        noRootRoute: true,
        docgenConfig: {
          searchPatterns: [
            `src/components/mdx/**/*.{js,jsx,mjs}`,
            `node_modules/@gatsby-mdx-suite/**/*.{js,jsx,mjs}`,
            `../../node_modules/@gatsby-mdx-suite/**/*.{js,jsx,mjs}`,
          ],
        },
      },
    },
    // MDX
    {
      resolve: `gatsby-plugin-mdx`,
      options: mdx,
    },
    // SEO
    `gatsby-plugin-react-helmet`,
  ].filter(Boolean),
})
