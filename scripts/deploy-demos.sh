#!/bin/bash

echo "Building demos"

npx lerna exec "gatsby clean && npm run build -- --prefix-paths" --scope="gatsby-mdx-suite-demo-*"

echo "Preparing files"
mkdir -p gh-pages-demos

mv demos/contentful/public gh-pages-demos/contentful
mv demos/filesystem/public gh-pages-demos/filesystem

echo "Deploying to GitHub Pages"
npx gh-pages -d gh-pages-demos

echo "Cleanup files"
rm -rf gh-pages-demos