import type { Query } from '../../shared/schemas/query'
import { describe, expect, it } from 'vitest'
import { withCounterLookback } from '../../server/utils/query-filter'

const baseQuery: Query = { id: 'link-id', limit: 500 }

describe('counter query bounds', () => {
  it('adds a retention-safe start time to unbounded requests', () => {
    expect(withCounterLookback(baseQuery, 1_800_000_000_000)).toEqual({
      ...baseQuery,
      startAt: 1_797_580_800,
    })
  })

  it('preserves an explicit start time', () => {
    const query = { ...baseQuery, startAt: 1_700_000_000 }

    expect(withCounterLookback(query, 1_800_000_000_000)).toBe(query)
  })
})
