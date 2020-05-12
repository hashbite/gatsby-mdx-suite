import { findActiveTrail } from './helpers'

const menuRoot = [
  {
    menuItemId: 'Header Root',
    internalTargetId: 'Header Root',
    subitems: [
      {
        menuItemId: 'Header - First - Level 1',
        internalTargetId: 'Header - First - Level 1',
        subitems: [
          {
            menuItemId: 'Header - First - Level 2',
            internalTargetId: 'Header - First - Level 2',
          },
          {
            menuItemId: 'Header - Second - Level 2',
            internalTargetId: 'Header - Second - Level 2',
          },
          {
            menuItemId: 'Header - Third - Level 2',
            internalTargetId: 'Header - Third - Level 2',
          },
        ],
      },
    ],
  },
  {
    menuItemId: 'Footer Root',
    internalTargetId: 'Footer Root',
    subitems: [
      {
        menuItemId: 'Footer - Double - Level 1',
        internalTargetId: 'Footer - Double',
        subitems: [
          {
            menuItemId: 'Footer - Double - Level 2',
            internalTargetId: 'Footer - Double',
          },
          {
            menuItemId: 'Footer - Second - Level 2',
            internalTargetId: 'Footer - Second - Level 2',
          },
          {
            menuItemId: 'Footer - Third - Level 2',
            internalTargetId: 'Footer - Third - Level 2',
          },
        ],
      },
    ],
  },
]
test('locates root', () => {
  expect(
    findActiveTrail({
      id: 'Header Root',
      subTree: menuRoot,
    })
  ).toStrictEqual(['Header Root'])
})
test('locates level 1 item', () => {
  expect(
    findActiveTrail({
      id: 'Header - First - Level 1',
      subTree: menuRoot,
    })
  ).toStrictEqual(['Header Root', 'Header - First - Level 1'])
})

test('locates level 2 item', () => {
  expect(
    findActiveTrail({
      id: 'Header - Second - Level 2',
      subTree: menuRoot,
    })
  ).toStrictEqual([
    'Header Root',
    'Header - First - Level 1',
    'Header - Second - Level 2',
  ])
})

test('When parent and child share the same target, child should be the end of the trail', () => {
  expect(
    findActiveTrail({
      id: 'Footer - Double',
      subTree: menuRoot,
    })
  ).toStrictEqual([
    'Footer Root',
    'Footer - Double - Level 1',
    'Footer - Double - Level 2',
  ])
})

test('empty trail for unknown item', () => {
  expect(
    findActiveTrail({
      id: 'does not exist',
      subTree: menuRoot,
    })
  ).toHaveLength(0)
})
