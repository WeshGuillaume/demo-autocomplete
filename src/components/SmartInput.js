import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import Autocomplete from 'draft-js-autocomplete';
import {
  Editor,
  EditorState,
  Modifier,
  Entity,
  convertFromRaw,
  CompositeDecorator
} from 'draft-js';

import VariableAutocomplete from './VariablesAutocomplete';
import UserAutocomplete from './UserAutocomplete';
import ChannelAutocomplete from './ChannelAutocomplete';

const Container = styled.div`
  padding: 16px;
  background-color: #212125;
  border-radius: 3px;
  position: relative;
  color: white;
  font-family: AvenirNext-Medium;
  font-size: 16px;
  color: #ffffff;
  letter-spacing: 0.01px;
  line-height: 24px;
`;

const VariableContainer = styled.span`
  display: inline-block;
  padding: 4px 8px;
  margin: 4px;
  background-color: #4a90e2;
  border-radius: 3px;
  color: white;
  font-weight: bold;
`;

function autocompleteItem(type) {
  return ({ item, onClick, current }) => {
    const ref = useRef(null);

    useEffect(
      () => {
        if (current) {
          ref.current.scrollIntoView({
            block: 'nearest',
            behavior: 'smooth'
          });
        }
      },
      [current]
    );

    const Component =
      {
        user: UserAutocomplete,
        variable: VariableAutocomplete,
        channel: ChannelAutocomplete
      }[type] || (props => <span {...props} />);

    return (
      <AutocompleteItemContainer hovered={current} onClick={onClick} ref={ref}>
        <Component item={item} />
      </AutocompleteItemContainer>
    );
  };
}

const AutocompleteItemContainer = styled.div`
  cursor: pointer;
  width: 100%;
  padding: 16px 32px;
  color: white;

  ${props =>
    props.hovered &&
    css`
      background-color: #21232b;
    `}
`;

const ItemContent = styled.span`
  font-family: AvenirNext-DemiBold;
  font-size: 15px;
  color: #ffffff;
  letter-spacing: 0.01px;
`;

const AutocompleteWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  height: 300px;
  position: absolute;
  top: -316px;
  left: 0;
  right: 0;
`;

const AutocompleteContainer = styled.div`
  z-index: 99;
  border-radius: 5px;
  border: 1 black solid;
  background-color: #1f2025;
  overflow: hidden;
  box-shadow: -2px 4px 15px 0 rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  transform: translateY(10px);
  opacity: 0;
  width: 100%;
  pointer-events: none;
  transition: 0.2s all ease-in-out;
  display: flex;
  flex-direction: column;
  max-height: 300px;
  overflow-y: scroll;

  ${props =>
    props.open &&
    css`
      transform: translateY(0);
      opacity: 1;
      pointer-events: auto;
    `}
`;

const users = [
  { firstname: 'Guillaume', lastname: 'Jackson', username: 'weshguillaume' },
  { firstname: 'Brendan', lastname: 'Depp', username: 'brendan' },
  { firstname: 'Anis', lastname: 'Pit', username: 'anis' },
  { firstname: 'John', lastname: 'Doe', username: 'jhon' },
  { firstname: 'Paul', lastname: 'Benet', username: 'paul' }
];

const variables = [
  { name: 'user.name', description: 'Current user firstname' },
  { name: 'server.name', description: 'Current server name' },
  { name: 'user.username', description: 'Current user username' },
  { name: 'server.owner', description: 'Current server owner username' }
];

const channels = [
  { name: 'random', description: 'Post about anything' },
  { name: 'general', description: 'Anything related to the server' },
  { name: 'test', description: 'Test channel' }
];

const variable = {
  prefix: '{',
  type: 'VARIABLE',
  mutability: 'IMMUTABLE',
  onMatch: text =>
    variables.filter(variable => variable.name.indexOf(text) !== -1),
  component: User,
  listComponent: ({ children }) => (
    <AutocompleteWrapper>
      <AutocompleteContainer open>{children}</AutocompleteContainer>
    </AutocompleteWrapper>
  ),
  itemComponent: autocompleteItem('variable'),
  format: item => `{${item.name}}`
};

const channel = {
  prefix: '#',
  type: 'CHANNEL',
  mutability: 'IMMUTABLE',
  onMatch: text =>
    channels.filter(channel => channel.name.indexOf(text) !== -1),
  component: User,
  listComponent: ({ children }) => (
    <AutocompleteWrapper>
      <AutocompleteContainer open>{children}</AutocompleteContainer>
    </AutocompleteWrapper>
  ),
  itemComponent: autocompleteItem('channel'),
  format: item => `#${item.name}`
};

const user = {
  prefix: '@',
  type: 'MENTION',
  mutability: 'IMMUTABLE',
  onMatch: text =>
    users.filter(
      user =>
        `${user.firstname}${user.lastname}${user.username}`.indexOf(text) !== -1
    ),
  component: User,
  listComponent: ({ children }) => (
    <AutocompleteWrapper>
      <AutocompleteContainer open>{children}</AutocompleteContainer>
    </AutocompleteWrapper>
  ),
  itemComponent: autocompleteItem('user'),
  format: item => `@${item.username}`
};

export function User({ children }) {
  return <VariableContainer>{children}</VariableContainer>;
}

export default function SmartInput() {
  const [state, setState] = useState(EditorState.createEmpty());
  const editor = useRef(null);

  const autocompletes = [user, channel, variable];

  return (
    <Container>
      <Autocomplete
        editorState={state}
        autocompletes={autocompletes}
        onChange={setState}>
        <Editor ref={editor} editorState={state} onChange={setState} />
      </Autocomplete>
    </Container>
  );
}
