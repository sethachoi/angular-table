// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { NgTableComponent } from '../projects/ng-table/src/lib/ng-table.component'

export default {
  title: 'Example/NgTable',
  component: NgTableComponent,
} as Meta;

const Template: Story<NgTableComponent> = (args: NgTableComponent) => ({
  component: NgTableComponent,
  props: args,
});

export const Overall = Template.bind({});
