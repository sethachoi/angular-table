// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1+
import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { action } from '@storybook/addon-actions';
import { NgTableComponent } from '../projects/ng-table/src/lib/ng-table.component';
import { NgTableModule } from '../projects/ng-table/src/lib';

export default {
  title: 'Example/NgTable',
  component: NgTableComponent,
  decorators: [
    moduleMetadata({
      imports: [NgTableModule]
    }),
  ],
} as Meta;

const Template: Story<NgTableComponent> = (args: NgTableComponent) => ({
  component: NgTableComponent,
  props: args,
});

const items = [{
  id: 1,
  name: 'Bob Bobson',
  title: 'Asst Regional Mgr',
  age: 35,
  hair: 'black'
}, {
  id: 2,
  name: 'Paul Paulson',
  title: 'Office Mgr',
  age: 30,
  hair: 'brown'
}, {
  id: 3,
  name: 'Ann Annington',
  title: 'Sr Engineer',
  age: 27,
  hair: 'purple'
}, {
  id: 4,
  name: 'Ann Annington',
  title: 'Sr Engineer',
  age: 23,
  hair: 'purple'
}, {
  id: 5,
  name: 'Ann Annington',
  title: 'Engineer',
  age: 23,
  hair: 'purple'
}, {
  id: 6,
  name: 'Richard Richardson',
  title: 'Sr Engineer',
  age: 28,
  hair: 'blonde'
}, {
  id: 7,
  name: 'Juliet Juliets',
  title: 'Dog Enthusiast',
  age: 22,
  hair: 'orange'
}]

const colDefs = [{
  key: 'id',
  label: 'User Id',
  type: 'number'
}, {
  key: 'name',
  label: 'Name',
  type: 'string'
}, {
  key: 'title',
  label: 'Title',
  type: 'string'
}, {
  key: 'age',
  label: 'Age',
  type: 'number'
}, {
  key: 'hair',
  label: 'Hair Color',
  type: 'string'
}]

export const Overall = Template.bind({});
Overall.args = {
  colDefs,
  items,
  primaryKey: 'id',
  loading: false,
  maxHeight: 350,
  filterUpdate: action('filterUpdate')
}
