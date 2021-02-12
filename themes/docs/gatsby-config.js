const { existsSync, lstatSync } = require('fs')
const { resolve } = require('path')
const reporter = require('gatsby-cli/lib/reporter')

const defaultComponentPaths = [
  // Project/custom components
  resolve(process.cwd(), `src/components/mdx/`),
  // Base theme components
  resolve(
    process.cwd(),
    `node_modules/gatsby-theme-mdx-suite-base/src/components/mdx/`
  ),
  resolve(
    process.cwd(),
    `../../node_modules/gatsby-theme-mdx-suite-base/src/components/mdx/`
  ),
  // External components
  resolve(process.cwd(), `node_modules/@gatsby-mdx-suite/`),
  resolve(process.cwd(), `../../node_modules/@gatsby-mdx-suite/`),
]

const pagesPath = `${__dirname}/pages`
const nonScriptFileRegex = new RegExp(`^(?!.*[.][jt]sx?$).*$`)

module.exports = ({
  mdx = { extensions: [`.mdx`, `.md`] },
  componentPaths = defaultComponentPaths,
}) => ({
  plugins: [
    // MDX pages from /docs
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `docs`,
        path: pagesPath,
      },
    },
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: pagesPath,
      },
    },
    // Parse components
    ...componentPaths
      .map((componentPath) => {
        if (existsSync(componentPath)) {
          return {
            resolve: `gatsby-source-filesystem`,
            options: {
              path: componentPath,
              ignore: [
                (path) => {
                  // Always accept root dirs
                  if (path === componentPath) {
                    return false
                  }

                  // Filter out non mdx packages
                  if (
                    path.indexOf(`@gatsby-mdx-suite/mdx-`) === -1 &&
                    path.indexOf(`/mdx/`) === -1
                  ) {
                    return true
                  }

                  // Skip subdirectories in mdx packages as they contain helpers and not MDX components
                  if (
                    (path.indexOf(`/mdx/`) !== -1 &&
                      path.split('/mdx/')[1].split('/').length > 2) ||
                    (path.indexOf(`@gatsby-mdx-suite/mdx-`) !== -1 &&
                      path.split('@gatsby-mdx-suite/mdx-')[1].split('/')
                        .length > 3)
                  ) {
                    reporter.verbose(`Ignoring: ${path}`)
                    return true
                  }

                  // If it is a dir and did not match filter above, continue file lookup
                  const stats = lstatSync(path)
                  if (stats.isSymbolicLink() || stats.isDirectory()) {
                    return false
                  }

                  // filter out non script files
                  if (nonScriptFileRegex.test(path)) {
                    return true
                  }

                  reporter.verbose(`Located component: ${path}`)
                  return false
                },
              ],
            },
          }
        }
        return false
      })
      .filter(Boolean),
    {
      resolve: `gatsby-transformer-react-docgen`,
    },
    {
      resolve: `gatsby-transformer-documentationjs`,
    },
  ].filter(Boolean),
})
