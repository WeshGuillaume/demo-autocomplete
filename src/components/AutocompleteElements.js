import React, { Fragment, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';

import VariableAutocomplete from './VariablesAutocomplete';
import UserAutocomplete from './UserAutocomplete';
import ChannelAutocomplete from './ChannelAutocomplete';

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

const VariableContainer = styled.span.attrs({ className: 'debug' })`
  display: inline-block;
  margin: 4px;
  background-color: #4a90e2;
  border-radius: 3px;
  color: white;
  font-weight: bold;
  padding: 4px 8px;
`;

export function Variable({ children }) {
  return (
    <Fragment>
      <VariableContainer>{children}</VariableContainer>
    </Fragment>
  );
}

export const AutocompleteWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  height: 300px;
  position: absolute;
  top: -316px;
  left: 0;
  right: 0;
`;

export const AutocompleteContainer = styled.div`
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

export function AutocompleteList({ children }) {
  return (
    <AutocompleteWrapper>
      <AutocompleteContainer open>{children}</AutocompleteContainer>
    </AutocompleteWrapper>
  );
}

export function autocompleteItem(type) {
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
