import faker from 'faker'
import { PersonType } from '../types'

type FakeApiType = {
  data: PersonType[]
}

const generateFakeUser = (): PersonType => {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    id: faker.random.number(),
    phone: faker.phone.phoneNumberFormat(),
    address1: faker.address.streetAddress(),
    company: faker.company.companyName(),
    email: faker.internet.email(),
    job: faker.name.jobTitle(),
    age: faker.random.number({
      min: 18,
      max: 80
    })
  }
}

// get a bunch of fake peeps
export const getData = (): Promise<FakeApiType> => {
  const fakeData = []
  for (let i = 0; i < 250; i++) {
    fakeData.push(generateFakeUser())
  }
  const response = new Promise<FakeApiType>((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: fakeData })
    }, 1500)
  })
  return response
}