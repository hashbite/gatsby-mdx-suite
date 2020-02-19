do we include base, components and utitlies?
.container is our content column?
add comments to all files you touch!
can we use to to make a proper multicolumns?
check if we can use browserlist config from package.json!!

- adds note that for now we use a easymde hack and wait for amazing blockz
- kitchensync
- other documentation pages for theme
- color mode switch zum theme!
- layout elegant anpassend dank theme-ui und tailwind <3

https://github.com/jquense/docpocalypse/blob/008b528525d1839c1e1e9ff0a16b621f09489b2d/packages/theme-core/gatsby-config.js

https://github.com/jquense/docpocalypse/blob/008b528525d1839c1e1e9ff0a16b621f09489b2d/packages/theme-core/gatsby-config.js

https://www.gatsbyjs.org/packages/gatsby-transformer-documentationjs/

- // @todo consider adding more like:
- // https://www.gatsbyjs.org/packages/gatsby-plugin-sitemap/
- // https://www.gatsbyjs.org/packages/gatsby-plugin-robots-txt/
- check proper semantic outlining:
  - https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML_sections_and_outlines
  - https://webdesign.tutsplus.com/articles/the-truth-about-multiple-h1-tags-in-the-html5-era--webdesign-16824
  - document this?

```
query HeaderQuery {
  allComponentMetadata {
    nodes {
      displayName
      props {
        name
        description {
          text
        }
        defaultValue {
          value
        }
      }
      description {
        text
      }
    }
  }
}
```

add jsx-a11y and other checks to fix lighthouse before it triggers?
