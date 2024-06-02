import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '@/app/(app)/about-us/page'

describe('About Us', () => {
  it('renders a heading', async () => {
    render(await Page())

    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading).toBeInTheDocument()
  })
})
