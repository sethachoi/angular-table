import { ColType } from 'ng-table'

export const colDefs: ColType[] = [
  {
    key: 'firstName',
    label: 'First Name',
    type: 'string'
  },
  {
    key: 'lastName',
    label: 'Last Name',
    type: 'string'
  },
  {
    key: 'id',
    label: 'User Id',
    type: 'number'
  },
  {
    key: 'phone',
    label: 'Phone Number',
    type: 'string'
  },
  {
    key: 'address1',
    label: 'Street Address',
    type: 'string'
  },
  {
    key: 'company',
    label: 'Company Name',
    type: 'string'
  },
  {
    key: 'email',
    label: 'Email',
    type: 'string'
  },
  {
    key: 'job',
    label: 'Job title',
    type: 'string'
  },
  {
    key: 'age',
    label: 'Age',
    type: 'number'
  }
]
