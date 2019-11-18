import React from 'react';

import {
  Variable,
  AutocompleteList,
  autocompleteItem
} from './AutocompleteElements';

const channel = channels => ({
  prefix: '#',
  type: 'TOKEN',
  mutability: 'IMMUTABLE',
  onMatch: text =>
    channels.filter(channel => channel.name.indexOf(text) !== -1),
  component: Variable,
  listComponent: AutocompleteList,
  itemComponent: autocompleteItem('channel'),
  format: item => `#${item.name}`
});

export default channel;
