import { expect, test } from 'vitest'
import { mergeStyles } from './mergeStyles'

test('merge string styles', () => {
  const styles1 = 'foo'
  const styles2 = 'bar'
  expect(mergeStyles(styles1, styles2)).toStrictEqual('foo bar')
})

test('merge object styles', () => {
  const styles1 = { foo: 'bar' }
  const styles2 = { foo: 'bar2' }
  expect(mergeStyles(styles1, styles2)).toStrictEqual({ foo: 'bar bar2' })
})

test('merge nested styles', () => {
  const styles1 = { foo: { foo: 'bar' } }
  const styles2 = { foo: { foo: 'bar2' } }
  expect(mergeStyles(styles1, styles2)).toStrictEqual({ foo: { foo: 'bar bar2' } })
})

test('merge when key does not exist', () => {
  const styles1 = {}
  const styles2 = { foo: 'bar' }
  expect(mergeStyles(styles1, styles2)).toStrictEqual({ foo: 'bar' })
})
