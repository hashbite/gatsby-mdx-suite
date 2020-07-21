import { createPath } from '.'

const config = {
  localeMap: {
    en: '',
    de: 'de',
  },
  pageTypeMap: {
    page: '',
    blogPost: 'blog',
  },
}
test('createPath applies locale map', () => {
  expect(
    createPath({
      slug: 'slug',
      locale: 'en',
      config,
    })
  ).toBe('/slug')
  expect(
    createPath({
      slug: 'slug',
      locale: 'de',
      config,
    })
  ).toBe('/de/slug')
})
test('createPath applies pageType map', () => {
  expect(
    createPath({
      slug: 'slug',
      pageType: 'page',
      config,
    })
  ).toBe('/slug')
  expect(
    createPath({
      slug: 'slug',
      pageType: 'blogPost',
      config,
    })
  ).toBe('/blog/slug')
})
test('createPath for index/home', () => {
  expect(
    createPath({
      slug: '',
      locale: 'en',
      config,
    })
  ).toBe('/')
  expect(
    createPath({
      slug: null,
      locale: 'de',
      config,
    })
  ).toBe('/de')
})
test('createPath with all-features', () => {
  expect(
    createPath({
      slug: 'slug',
      locale: 'de',
      pageType: 'blogPost',
      config,
    })
  ).toBe('/de/blog/slug')
})
