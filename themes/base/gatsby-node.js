const { StatsWriterPlugin } = require('webpack-stats-plugin')

/**
 * Render webpack stats.json when ANALYZE env variable is set
 */
exports.onCreateWebpackConfig = ({ stage, actions }) => {
  if (process.env.ANALYZE && stage === 'build-javascript') {
    actions.setWebpackConfig({
      plugins: [
        new StatsWriterPlugin({
          filename: 'stats.json',
          stats: {
            preset: 'detailed',
            modulesSort: '!size',
            assetsSort: '!size',
            reasons: true,
            relatedAssets: true,
            dependentModules: true,
            modulesSpace: 200,
            chunkModulesSpace: 200,
            optimizationBailout: true,
            usedExports: true,
            chunkGroupChildren: true,
          },
        }),
      ],
    })
  }
}
