const { existsSync, lstatSync } = require('fs')
const { resolve } = require('path')
const reporter = require('gatsby-cli/lib/reporter')

const defaultComponentPaths = [
  // Project/custom components
  resolve(process.cwd(), `src/components/mdx/`),
  // External components
  resolve(process.cwd(), `node_modules/@gatsby-mdx-suite/`),
  // Lerna/yarn workspaces environment
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
                    reporter.verbose(`${path} - Passed for root`)
                    return false
                  }

                  // Filter out non mdx packages
                  if (
                    path.indexOf(`@gatsby-mdx-suite/mdx-`) === -1 &&
                    path.indexOf(`/mdx/`) === -1
                  ) {
                    reporter.verbose(`${path} - Ignored as non mdx package`)
                    return true
                  }

                  // If it is a dir and passed, continue
                  const stats = lstatSync(path)
                  if (stats.isSymbolicLink() || stats.isDirectory()) {
                    reporter.verbose(`${path} - Passed as valid package`)
                    return false
                  }

                  // filter out non script files
                  if (nonScriptFileRegex.test(path)) {
                    reporter.verbose(`${path} - Ignored as non script file`)
                    return true
                  }

                  reporter.verbose(`${path} - Passed`)
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
