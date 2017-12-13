var Seeder = require('mongoose-data-seed').Seeder;
var SurabiControl = require('../models/surabi-control');
const adminUserId = '1';

var data = [
  {
    name: 'text',
    displayName: 'Text Box',
    icon: 'srb-text-box',
    tag: 'input',
    categories: ['basic'],
    skills: ['text'],
    createdBy: adminUserId,
    updatedBy: adminUserId,
  },
  {
    name: 'textarea',
    displayName: 'Text Area',
    icon: 'srb-text-area',
    tag: 'textarea',
    categories: ['basic'],
    skills: ['text', 'multi'],
    createdBy: adminUserId,
    updatedBy: adminUserId,
  },
  {
    name: 'check',
    displayName: 'Check Box',
    icon: 'srb-check-box',
    tag: 'input',
    categories: ['basic'],
    skills: ['text'],
    createdBy: adminUserId,
    updatedBy: adminUserId,
  },
  {
    name: 'radio',
    displayName: 'Radio Button',
    icon: 'srb-radio-box',
    tag: 'input',
    categories: ['basic'],
    skills: ['text'],
    createdBy: adminUserId,
    updatedBy: adminUserId,
  },
  {
    name: 'dropdown',
    displayName: 'Dropdown',
    icon: 'srb-drop-down',
    tag: 'select',
    categories: ['basic'],
    skills: ['select', 'multi'],
    createdBy: adminUserId,
    updatedBy: adminUserId,
  },
  {
    name: 'button',
    displayName: 'Button',
    icon: 'srb-button',
    tag: 'button',
    categories: ['basic', 'button'],
    skills: ['clickable', 'readonly'],
    createdBy: adminUserId,
    updatedBy: adminUserId,
  },
  {
    name: 'label',
    displayName: 'Label',
    icon: 'srb-label',
    tag: 'label',
    categories: ['basic', 'label'],
    skills: ['readonly'],
    createdBy: adminUserId,
    updatedBy: adminUserId,
  }
];

var SurabiControlSeeder = Seeder.extend({
  shouldRun: function () {
    return SurabiControl.count().exec().then(count => count === 0);
  },
  run: function () {
    return SurabiControl.create(data);
  }
});

module.exports = SurabiControlSeeder;