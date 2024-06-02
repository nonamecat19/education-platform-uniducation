import { render, screen } from '@testing-library/react'
import StudentsPage from '@/app/student/page'
import { trpcSSR } from '@/lib/trpc/ssr'
import { getCurrentUser } from '@/lib/api/users/queries'

jest.mock('@/lib/trpc/ssr', () => ({
  trpcSSR: {
    students: {
      getCurrentStudent: jest.fn(),
    },
  },
}))

jest.mock('@/lib/api/users/queries', () => ({
  getCurrentUser: jest.fn(),
}))

describe('StudentsPage', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders "Student not found" when student or user is not found', async () => {
    // @ts-ignore
    trpcSSR.students.getCurrentStudent.mockResolvedValue({ student: null })
    // @ts-ignore
    getCurrentUser.mockResolvedValue({ user: null })

    render(await StudentsPage())

    const notFoundMessage = await screen.findByText('Student not found')
    expect(notFoundMessage).toBeTruthy()
  })

  it('renders student information correctly', async () => {
    const studentMock = {
      name: 'John',
      surname: 'Doe',
      patronymic: 'Smith',
      studentId: '12345',
    }
    const userMock = {
      image: 'http://example.com/avatar.jpg',
      email: 'john.doe@example.com',
    }

    // @ts-ignore
    trpcSSR.students.getCurrentStudent.mockResolvedValue({ student: studentMock })
    // @ts-ignore
    getCurrentUser.mockResolvedValue({ user: userMock })

    render(await StudentsPage())

    const nameElement = await screen.findByText(/Name: John/)
    const surnameElement = await screen.findByText(/Surname: Doe/)
    const patronymicElement = await screen.findByText(/Patronymic: Smith/)
    const emailElement = await screen.findByText(/Email: john.doe@example.com/)
    const imageElement = await screen.findByAltText('avatar')

    expect(nameElement).toBeTruthy()
    expect(surnameElement).toBeTruthy()
    expect(patronymicElement).toBeTruthy()
    expect(emailElement).toBeTruthy()
    expect(imageElement).toBeTruthy()
    // @ts-ignore
    expect(imageElement.src).toBe('http://example.com/avatar.jpg')
  })
})
