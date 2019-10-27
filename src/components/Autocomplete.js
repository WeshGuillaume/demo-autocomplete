import React, { useEffect, useState, useRef } from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
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

const ItemContainer = styled.div`
  cursor: pointer;
  width: 100%;
  padding: 16px 32px;

  ${props =>
    props.hovered &&
    css`
      background-color: #21232b;
    `}
`;

function Item({ hovered, index, setHovered, item, onSelect }) {
  const ref = useRef(null);

  useEffect(
    () => {
      if (hovered) {
        return ref.current && ref.current.scrollIntoView({ block: 'nearest' });
      }
    },
    [hovered]
  );

  return (
    <ItemContainer
      ref={ref}
      hovered={hovered}
      onMouseMove={setHovered}
      onClick={e => (e.preventDefault(), e.stopPropagation(), onSelect())}>
      <span index={index}>{item.text || item}</span>
    </ItemContainer>
  );
}

export default function InputAutocomplete({
  open,
  hovered = 0,
  setHovered = () => {},
  innerRef,
  search,
  items = [],
  onSelect,
  onClose
}) {
  const [_open, setOpen] = useState(false);

  /**
   * Enter animation for the autocomplete block
   */
  useEffect(
    () => {
      setTimeout(() => {
        setOpen(open);
      }, 100);
    },
    [open]
  );

  return (
    <Container open={_open} ref={innerRef}>
      {items.map((item, index) => (
        <Item
          hovered={hovered === index}
          onSelect={() => onSelect(item)}
          setHovered={() => hovered !== index && setHovered(index)}
          item={item}
          index={index}
          key={index}
        />
      ))}
    </Container>
  );
}
