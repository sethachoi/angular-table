import { ColType } from 'ng-table'

export const colDefs: ColType[] = [
  {
    key: 'id',
    label: 'User Id',
    type: 'number'
  },
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

export const EGG_KEYS = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a'
]
