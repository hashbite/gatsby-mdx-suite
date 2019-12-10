/**
 * This whole file is a workaround to prevent docz from failing when the
 * dependency is installed but gatsby-theme-docz is excluded in the gatsby-config.js
 *
 * Maybe related: https://github.com/doczjs/docz/issues/994
 */
const crypto = require('crypto')

const digest = (str) =>
  crypto
    .createHash('md5')
    .update(str)
    .digest('hex')

const isProduction = process.env.NODE_ENV === 'production'
const isStaging = !!process.env.STAGING

const renderDocs = isStaging || !isProduction

/**
 * If the docs are not rendered, create a fake db entry to prevent the parser for
 * useStaticQuery from failing via
 *
 *  ERROR #85901  GRAPHQL
 *
 *  There was an error in your GraphQL query:
 *
 *  Cannot query field "doczDb" on type "Query".
 *
 *  GraphQL request:3:9
 *  2 |       query {
 *  3 |         doczDb {
 *    |         ^
 *  4 |           id
 *
 *  File: node_modules/gatsby-theme-docz/src/hooks/useDbQuery.js:7:9
 */
exports.sourceNodes = ({ actions, createNodeId }, { forceDocs = false }) => {
  if (forceDocs || renderDocs) {
    console.log('skipping')
    return
  }

  console.log('faking docs db')

  const { createNode } = actions
  const db = JSON.stringify({})
  const contentDigest = digest(db)

  const node = {
    id: createNodeId('docz-db'),
    db,
    children: [],
    internal: {
      contentDigest,
      type: 'DoczDb',
    },
  }

  createNode(node)
}
