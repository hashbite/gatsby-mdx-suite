# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.5.0](https://github.com/axe312ger/gatsby-mdx-suite/compare/gatsby-theme-mdx-suite-core@0.4.3...gatsby-theme-mdx-suite-core@0.5.0) (2020-11-08)


### Features

* **editing:** replace headlines, paragraphs and images with our enhanced components ([07c56f7](https://github.com/axe312ger/gatsby-mdx-suite/commit/07c56f7c48e12ed66e6dcf400f625f03171796cb))





## [0.4.3](https://github.com/axe312ger/gatsby-mdx-suite/compare/gatsby-theme-mdx-suite-core@0.4.2...gatsby-theme-mdx-suite-core@0.4.3) (2020-10-22)


### Bug Fixes

* **default-config:** properly detect background videos in Section ([339ae56](https://github.com/axe312ger/gatsby-mdx-suite/commit/339ae563811c9b5b7fd71766c095eb329ce83b0d))
* **media-collections:** properly detect videos in section and header, remove viewport ([d85fe41](https://github.com/axe312ger/gatsby-mdx-suite/commit/d85fe41cae7461ece3b84357677937f62d2ed959))





## [0.4.2](https://github.com/axe312ger/gatsby-mdx-suite/compare/gatsby-theme-mdx-suite-core@0.4.1...gatsby-theme-mdx-suite-core@0.4.2) (2020-10-21)

**Note:** Version bump only for package gatsby-theme-mdx-suite-core





## [0.4.1](https://github.com/axe312ger/gatsby-mdx-suite/compare/gatsby-theme-mdx-suite-core@0.4.0...gatsby-theme-mdx-suite-core@0.4.1) (2020-10-20)


### Bug Fixes

* **data:** remove fakeFile and other schema types ([45302af](https://github.com/axe312ger/gatsby-mdx-suite/commit/45302afc8038fa62483f3084925ad2095999630f))
* **styling:** ensure background color is set to root-background ([77ecd2c](https://github.com/axe312ger/gatsby-mdx-suite/commit/77ecd2c682fe1415419c65bdbaf58b1df35393f6))





# [0.4.0](https://github.com/axe312ger/gatsby-mdx-suite/compare/gatsby-theme-mdx-suite-core@0.3.0...gatsby-theme-mdx-suite-core@0.4.0) (2020-10-19)


### Bug Fixes

* **styling:** ensure body font family is used by default ([f8a4e7d](https://github.com/axe312ger/gatsby-mdx-suite/commit/f8a4e7d05119ba520bb428b26034d1cf2c9c448b))


### Features

* **spacing:** introduce verticalRhythm helper and section-gap theme variable ([e412f97](https://github.com/axe312ger/gatsby-mdx-suite/commit/e412f978c7c00a09f333ee83a82a882bee5dd37a))





# [0.3.0](https://github.com/axe312ger/gatsby-mdx-suite/compare/gatsby-theme-mdx-suite-core@0.2.3...gatsby-theme-mdx-suite-core@0.3.0) (2020-10-14)


### Features

* **section:** add support for background videos ([88c5bfc](https://github.com/axe312ger/gatsby-mdx-suite/commit/88c5bfc6d6d4fabafd8070e7db469a4e0171cba2))





## [0.2.3](https://github.com/axe312ger/gatsby-mdx-suite/compare/gatsby-theme-mdx-suite-core@0.2.2...gatsby-theme-mdx-suite-core@0.2.3) (2020-10-13)


### Bug Fixes

* **build:** force postcss to v7 till all deps are upgraded ([d285550](https://github.com/axe312ger/gatsby-mdx-suite/commit/d285550cacc4ee1bb83f0f4c78ab195cdf929b4f))





## [0.2.2](https://github.com/axe312ger/gatsby-mdx-suite/compare/gatsby-theme-mdx-suite-core@0.2.1...gatsby-theme-mdx-suite-core@0.2.2) (2020-10-12)


### Bug Fixes

* **config:** ensure minimum config arrays are replaced ([afde732](https://github.com/axe312ger/gatsby-mdx-suite/commit/afde732fbef0456506ca81537f5806e2961417c0))





## [0.2.1](https://github.com/axe312ger/gatsby-mdx-suite/compare/gatsby-theme-mdx-suite-core@0.2.0...gatsby-theme-mdx-suite-core@0.2.1) (2020-10-12)


### Bug Fixes

* **theme-config:** merge common default values into core theme ([7ad01b5](https://github.com/axe312ger/gatsby-mdx-suite/commit/7ad01b55ac861814a7bfabc2cb8c3e12c81a4a75))





# [0.2.0](https://github.com/axe312ger/gatsby-mdx-suite/compare/gatsby-theme-mdx-suite-core@0.1.4...gatsby-theme-mdx-suite-core@0.2.0) (2020-10-11)


### Bug Fixes

* **headlines:** headlines will now use text color by default ([62879fe](https://github.com/axe312ger/gatsby-mdx-suite/commit/62879fe706c0b69b2ff5652b6b52130018b9db9c))


### Features

* **color-sets:** add white, black and 9 gray variants ([bf9babc](https://github.com/axe312ger/gatsby-mdx-suite/commit/bf9babce8c012b0de1f5d393651913f92512f448))
* **lists:** better support for icons as bullet points and support ordered lists ([78faf9e](https://github.com/axe312ger/gatsby-mdx-suite/commit/78faf9e6db693c5868e31f7003fd5d974f9a51f9))
* **styling:** introduce new custom useBreakpoint hook ([6dfadc9](https://github.com/axe312ger/gatsby-mdx-suite/commit/6dfadc9dbcb6e80dc2f855fdb410e85f705e3b85))
* **typography:** use custom vertical rhythm implementation ([f36badb](https://github.com/axe312ger/gatsby-mdx-suite/commit/f36badb555cd944de0119bb9c6218e413bccb7a9))


### Performance Improvements

* **css:** introduce css minification via cssnano ([3083456](https://github.com/axe312ger/gatsby-mdx-suite/commit/3083456fdd5e7e627d242103f34c2a6185f3dc92))
* **css:** switch to csso for css minification ([6416516](https://github.com/axe312ger/gatsby-mdx-suite/commit/64165167fd0cd3668e529b1ab408025e5d68788b))
* **theming:** reduce default theme config payload ([56ca8bb](https://github.com/axe312ger/gatsby-mdx-suite/commit/56ca8bb0fba5146c686fc9fe789d4036d9129ea3))





## [0.1.4](https://github.com/axe312ger/gatsby-mdx-suite/compare/gatsby-theme-mdx-suite-core@0.1.3...gatsby-theme-mdx-suite-core@0.1.4) (2020-10-07)


### Bug Fixes

* **header:** show content above background media and fix transparent mode ([32fb07a](https://github.com/axe312ger/gatsby-mdx-suite/commit/32fb07acc812953e038fe4dacb0e1c9e0aacf865))


### Performance Improvements

* replace lodash with deepmerge ([85f48bd](https://github.com/axe312ger/gatsby-mdx-suite/commit/85f48bd1b80904e6df358bf2f4c233ee1b781d83))





## [0.1.3](https://github.com/axe312ger/gatsby-mdx-suite/compare/gatsby-theme-mdx-suite-core@0.1.2...gatsby-theme-mdx-suite-core@0.1.3) (2020-09-23)

**Note:** Version bump only for package gatsby-theme-mdx-suite-core





## [0.1.2](https://github.com/axe312ger/gatsby-mdx-suite/compare/gatsby-theme-mdx-suite-core@0.1.1...gatsby-theme-mdx-suite-core@0.1.2) (2020-09-20)

**Note:** Version bump only for package gatsby-theme-mdx-suite-core





## [0.1.1](https://github.com/axe312ger/gatsby-mdx-suite/compare/gatsby-theme-mdx-suite-core@0.1.0...gatsby-theme-mdx-suite-core@0.1.1) (2020-09-16)


### Bug Fixes

* **contentful:** update example content ([6c9a8c4](https://github.com/axe312ger/gatsby-mdx-suite/commit/6c9a8c442197b17366d1198490c9a9f338bba1da))





# 0.1.0 (2020-07-23)


### Features

* add default content and migrations for assets, pages, menu and blog ([40f37f9](https://github.com/axe312ger/gatsby-mdx-suite/commit/40f37f9916bd85f96b277827164f2ca43ae12384))
