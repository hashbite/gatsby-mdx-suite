# Gatsby MDX Suite

> This collection of packages provides a drop in solution to support MDX in your GatsbyJS content workflow.
>
> The intention is to provide a feature rich but fully custimizable set of components ready to use for your authors.


**🚀 Start right away using our [GatsbyJS starter](https://github.com/axe312ger/gatsby-starter-mdx-suite)**

## Core features

### ![Implemented features](https://img.shields.io/badge/Status-Implemented-green?style=flat)

* Fully customizable, extend and alterable MDX components. You can modify them by shadowing, overwriting the theme and style them via emotion and tailwindCSS.
* Simple MDX tag structures to keep editing simple.
* Full integration with [Contentful](https://contentful.com/)
* Build with Gatsby themes for fast integration into your GatsbyJS project
* A starter to get set up a new Gatsby MDX project within minutes.
* Full i18n integration with helpers to easily create menus and a language switcher.
* No to much crazy magic besides MDX. Components are often a few DOM elements with css applied or just a wrapper around a common React package.
* Automated generation of documentation of all components used within the system. Provides basic information about Markdown and MDX as well.  Demo: https://gatsby-mdx-suite-example-full.netlify.app/docs
* Components to render Menus, Links, Language Switch & more.
* GDPR/DSGVO compatability. Your visitors have full control over data flow and analytics. Nothing is sent outside if they don't give consent. You can adjust the behavior and style of the privacy manager. Demo: https://gatsby-mdx-suite-example-full.netlify.app/
* Online MDX editor per project, get real time previews of your MDX. Demo: https://gatsby-mdx-suite-example-full.netlify.app/docs/playground

### ![Work in progress features](https://img.shields.io/badge/Status-Work_in_progress-yellowgreen?style=flat)

* Upcoming support of WYSIWYG editors. Waiting for https://github.com/blocks/blocks to get more progress, in the meantime, we developed our own split-screen editor using [Monaco Editor
](https://microsoft.github.io/monaco-editor/) and [MDX runtime](https://mdxjs.com/advanced/runtime). Curious? [The playground in the docs]( Demo: https://gatsby-mdx-suite-example-full.netlify.app/docs/playground) is powered by it.
* We are closing the last bugs and finish documentation for the beta release.
* Build & Website performance improvements
* More components to come. Always. Feel free to submit your own!


## Core dependencies

* React using mostly the hooks API & contexts
* GatsbyJS with themes -> [Emotion](https://emotion.sh/) & [tailwindcss](https://tailwindcss.com/) via [twin.macro](https://github.com/ben-rogerson/twin.macro)
* Internationalization support via [LinguiJS](https://lingui.js.org/)
* Optional support for menu rendering, icons, themes, color sets, ...

## Project structure

* GastbyJS themes: `./themes/*` or `gatsby-theme-mdx-suite-*`
  * `gatsby-theme-mdx-suite-core`:
    * Has some required configuration opions!
    * Connects to Contentful
    * Integrates MDX into your project
    * Initializes the MDX data context
    * Integrates LinguiJS & emotion
  * `gatsby-theme-mdx-suite-base`:
      Adds default components to MDX (https://github.com/axe312ger/gatsby-mdx-suite/blob/master/themes/base/src/gatsby-plugin-theme-ui/components.js)
    * Adds SVG support
    * Adds SEO plugins (Sitemap, Helmet, ...)
    * Adds Icons support
  * `gatsby-theme-mdx-suite-docs`:
    * Enables `/docs` with MDX playground, components documentation and theme overview
  * `gatsby-theme-mdx-suite-base`:
    * Adds a blog to the page with proper pagination, `back to the news` button, ...
    * Some example blog posts
* MDX components: `./mdx/*` or `@gatsby-mdx-suite/mdx-*`
  * Basic - Very basic stuff like images and links
  * Layout - Add visual structure to the content. Grids, columns and more.
  * Contentful - Useful components when using Contentful as CMS
  * Bandcamp/Instagram/YoutTube - Render social media content like videos, posts, tracks and whole feeds
  * Media - A media gallery lightbox component which supports mixed content
  * More... ?
* Helper packages: `./packages/*` or `@gatsby-mdx-suite/*`
  * Contexts: Important and required package. Provides the contexts to get data available within MDX
  * i18n: Helpers to generate paths and render language switch component
  * seo: SEO helper components
  * menu: generate single menu levels or whole menu trees
* Examples: `./starters/*`
  * Minimal:
    * Integrates required core theme: `gatsby-theme-mdx-suite-core`
    * Just a minimal selection of MDX components
    * Minimal default styling
  * Base:
    * Features of minimal plus:
    * Enables optional base theme: `gatsby-theme-mdx-suite-base`
    * Simple demo content
    * Some more default styling
    * Enabled optional video support
    * Includes the docs
  * Full:
    * Features of base plus:
    * Complex demo content
    * Demonstrates how to shadow components
    * Enabled optional blog theme `gatsby-theme-mdx-suite-blog`
    * Additional theme overwrites

## Getting started

Either go for one of the starters and start hacking.

Or integrate the `gatsby-theme-mdx-suite` like the starters do into your project.

Or wait till somebody found time to write a tutorial how to do it.

## Automated documentation

Within the `/docs` route a documentation apge will be generated. This provides:

* Provide an introduction to Markdown and MDX to help new users getting into editing
* Give an overview of all components integrated into the project
* Renders interactive playgrounds for all components, including a list of available attributes.
* Provides further information for developers:
  * Which data needs to be available for rendering?
  * Any extra information on how to alter and customize the components.
  * ...?

## The problem of availability of data within MDX

- Data needs to be available within MDX but is queried via static graphQL (https://github.com/axe312ger/gatsby-mdx-suite/issues/7)
- The data layer needs to provide information which assets/data is used within MDX (https://github.com/axe312ger/gatsby-mdx-suite/issues/8)

## Configuration

The most accurate documentation are the starters. Especially https://github.com/axe312ger/gatsby-mdx-suite/tree/master/starters/contentful.

### Integrate into your project

**Note:** This is outdated. Have a look at the examples in `/examples`

This is just a quick listing, the whole readme will be improved soon and a getting starting guide provided.

* `npm i gatsby-theme-mdx-suite`
* Add `gatsby-theme-mdx-suite` to your `gatsby-config.js`
* Configure the theme.
  * Example: https://github.com/axe312ger/gatsby-mdx-suite/blob/master/starters/contentful/gatsby-config.js#L16-L42
* When creating your sub-pages, ensure to pass all required data to it. This is required to properly render links, menu items and the language switcher.
  * Example: https://github.com/axe312ger/gatsby-mdx-suite/blob/master/starters/contentful/gatsby-node.js#L45-L50
* Query all required data in your gatsby page template. Pass it down to the `MdxDataContext`
  * Example: https://github.com/axe312ger/gatsby-mdx-suite/blob/master/starters/contentful/src/templates/page.js#L18-L48
  * Related Context: https://github.com/axe312ger/gatsby-mdx-suite/blob/master/packages/contexts/mdx-data.js
* Adjust the theme to your design preferences via theme-ui.
  * Example: https://github.com/axe312ger/gatsby-mdx-suite/tree/master/starters/contentful/src/gatsby-plugin-theme-ui


## How to alter the design

The idea is to support these options to alter the design:

### Currently possible

* Provide your own theme configuraton
* Wrap and extend existing components with your own styles & logic via Emotion
* [Shadow components](https://www.gatsbyjs.com/docs/themes/shadowing/) or use existing ones as blueprint for your custom components
* You can use emotion to wrap any component and then target other components within your custom styles.
  * https://emotion.sh/docs/styled#styling-any-component
  * https://emotion.sh/docs/styled#targeting-another-emotion-component
