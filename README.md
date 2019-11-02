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

### ![Work in progress features](https://img.shields.io/badge/Status-Work_in_progress-yellowgreen?style=flat)

* Upcomming support of WYSIWYG editors. Waiting for https://github.com/blocks/blocks to get more progress, in the meanwhile https://github.com/Ionaru/easy-markdown-editor is being used.
* Automated generation of documentation of all components used within the system. Provides basic information about Markdown and MDX as well.
* More components to come


### ![Upcoming features](https://img.shields.io/badge/Status-Upcoming-orange?style=flat)

* GDPR/DSGVO compatability

## Some ToDos, should be tickets :D

* other solution for background images, there is a new gatsby image thingy
* i18n path mapping to allow sindle language pages with out locale prefix in path
* remove box content and integrate with box. if you need more complex, overwrite the style
* some theme-ui features are not yet integrated in all components
* the image integration with contentful shoudl be merged since it gets the data now from a flexible context key and had a generic structure anyways

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
* Starters: `./starters/*` or `gatsby-starter-mdx-suite-*`
  * Get quickly started, should be used as example implementations as well

## Getting started

Either go for one of the starters and start hacking.

Or integrate the `gatsby-theme-mdx-suite` like the starters do into your project.

Or wait till somebody found time to write a tutorial how to do it.

## Automated documentation

The documentation is generated via the amazing docz project. The new version uses GatsbyJS as main renderer. A perfect match. This documentation serves multiple purposes:

* Provide a introduction to Markdown and MDX to support new users
* Give an overview of all components integrated into the project
* Renders interactive playgrounds for all components, including a list of available attributes.
* Provides further information for developers:
  * Which data needs to be available for rendering?
  * Any extra information on how to alter and customize the components.
  * ...?


## The problem of availability of data within MDX

@todo

## i18n integration, creating paths, using the LocationContext to create menus and more

@todo

## How to alter the design

@todo