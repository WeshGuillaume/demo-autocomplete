import React, { Fragment } from 'react';

import {
  Variable,
  AutocompleteList,
  autocompleteItem
} from './AutocompleteElements';

const variable = variables => ({
  prefix: '{',
  type: 'TOKEN',
  mutability: 'IMMUTABLE',
  onMatch: text =>
    variables.filter(variable => variable.name.indexOf(text) !== -1),
  component: Variable,
  listComponent: AutocompleteList,
  itemComponent: autocompleteItem('variable'),
  format: item => `{${item.name}}`
});

export default variable;
