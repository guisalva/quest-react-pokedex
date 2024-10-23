import { useContext, useState } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../contexts/theme-context';

export function CustomSelect({ options, onSelect }) {
  const { theme } = useContext(ThemeContext)

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('Select a option');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    setSelected(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <CustomSelectContainer>
      <SelectedOption onClick={toggleDropdown} theme={theme}>
        {selected}
        <ArrowIcon isOpen={isOpen}>▼</ArrowIcon>
      </SelectedOption>
      {isOpen && (
        <OptionsList theme={theme}>
          {options.map((option, index) => (
            <li key={index} onClick={() => handleSelect(option)}>
              {option}
            </li>
          ))}
        </OptionsList>
      )}
    </CustomSelectContainer>
  );
}

const CustomSelectContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 200px;
  margin-left: 10px
`;

const SelectedOption = styled.div`
  background-color: ${(props) => props.theme.surface};
  color: ${(props) => props.theme.colorOnBackground};
  padding: 10px;
  border: 2px solid ${(props) => props.theme.colorOnBackground};
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-color: ${(props) => props.theme.colorOnBackground};
    color: ${(props) => props.theme.background};
  }
`;

const OptionsList = styled.ul`
  position: absolute;
  background-color: ${(props) => props.theme.surface};
  border: 2px solid ${(props) => props.theme.colorOnBackground};
  border-radius: 4px;
  width: 100%;
  max-height: 200px;
  overflow-y: auto; 
  padding: 0;
  margin: 5px 0 0 0;
  list-style-type: none;
  z-index: 10;

  & li {
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
    background-color: ${(props) => props.theme.colorOnBackground};
    color: ${(props) => props.theme.background};
  }
  }
`;

const ArrowIcon = styled.span`
  margin-left: 10px;
  transform: ${(props) => (props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.3s ease;
`;
