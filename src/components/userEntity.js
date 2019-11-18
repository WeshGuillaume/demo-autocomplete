import React from 'react';

import {
  Variable,
  AutocompleteList,
  autocompleteItem
} from './AutocompleteElements';

const user = users => ({
  prefix: '@',
  type: 'TOKEN',
  mutability: 'IMMUTABLE',
  onMatch: text =>
    users.filter(
      user =>
        `${user.firstname}${user.lastname}${user.username}`.indexOf(text) !== -1
    ),
  component: Variable,
  listComponent: AutocompleteList,
  itemComponent: autocompleteItem('user'),
  format: item => `@${item.username}`
});

export default user;
