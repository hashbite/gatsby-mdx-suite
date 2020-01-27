# Gatsby MDX Suite

> This collection of packages provides a drop in solution to support MDX in your GatsbyJS content workflow.
>
> The intention is to provide a feature rich but fully custimizable set of components ready to use for your authors.

## Core features

### ![Implemented features](https://img.shields.io/badge/Status-Implemented-green?style=flat)

*  Fully customizable, extend and alterable MDX components. We just provide some minimal layout for the components and integrate with theme-ui.
* Simple MDX tag structures to keep editing simple.
* Contentful support
* Starters & a theme for fast integration into your GatsbyJS project
* Full i18n integration with helpers to easily create menus and language switchers
* No crazy magic. The components code are pretty simple and very common dependencies are used
* Automated generation of documentation of all components used within the system. Provides basic information about Markdown and MDX as well.
* Components to render Menus, Links, Language Switch & more

### ![Work in progress features](https://img.shields.io/badge/Status-Work_in_progress-yellowgreen?style=flat)

* Upcomming support of WYSIWYG editors. Waiting for https://github.com/blocks/blocks to get more progress, in the meanwhile https://github.com/Ionaru/easy-markdown-editor is being used.
* Automatic parsing of MDX content to create graphql relations to used assets like images, videos & others.
* More components to come


### ![Upcoming features](https://img.shields.io/badge/Status-Upcoming-orange?style=flat)

* GDPR/DSGVO compatability
* This whole thing is still alpha, so more to come and anything might change.

## Core dependencies

* React using mostly the hooks API & contexts
* GatsbyJS with themes -> EmotionJS, theme-ui, styled systems
* Pretty plain integration of i18next
* Documentation is generated via docz

## Project structure

* GastbyJS theme: `gatsby-theme-mdx-suite`
  * Has required configuration opions
  * Integrates theme-ui & MDX into your project
  * Ensures the documentation will be rendered
  * Initializes the MDX data context and i18next
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
* Starters: `./starters/*` or `gatsby-starter-mdx-suite-*`
  * Get quickly started, should be used as example implementations as well

## Getting started

Either go for one of the starters and start hacking.

Or integrate the `gatsby-theme-mdx-suite` like the starters do into your project.

Or wait till somebody found time to write a tutorial how to do it.

## Automated documentation

The documentation is generated via the amazing docz project. The new version uses GatsbyJS as main renderer. A perfect match. This generated documentation will serve multiple purposes:

* Provide a introduction to Markdown and MDX to support new users
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

* Provide your own theme configuraton via theme-ui
* Wrap and extend existing components with your own styles & logic
* Replace whole components (even copy & paste might be the right way some times)
* You can use emotion to wrap any component and then target other components within your custom styles.
  * https://emotion.sh/docs/styled#styling-any-component
  * https://emotion.sh/docs/styled#targeting-another-emotion-component

### In consideration

* We might provide several attributes to alter styling
* Shadow components via theme-ui or overwrite components by passing them to the root component (should work, still to be tested, might be a bad idea)
