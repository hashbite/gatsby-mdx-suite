module.exports = {
  locales: ['en-US'],
  fallbackLocales: { default: 'en-US' },
  catalogs: [
    {
      path: 'src/locales/{locale}/messages',
      include: [
        // Project specific
        'src',
        // Normal project
        'node_modules/@gatsby-mdx-suite',
        'node_modules/gatsby-theme-mdx-suite-base/src',
        'node_modules/gatsby-theme-mdx-suite-core/src',
        'node_modules/gatsby-theme-mdx-suite-blog/src',
        // Monorepo
        '../../node_modules/@gatsby-mdx-suite',
        '../../node_modules/gatsby-theme-mdx-suite-base/src',
        '../../node_modules/gatsby-theme-mdx-suite-core/src',
        '../../node_modules/gatsby-theme-mdx-suite-blog/src',
      ],
    },
  ],
  extractBabelOptions: {
    presets: ['babel-preset-gatsby'],
  },
  format: 'po',
}
