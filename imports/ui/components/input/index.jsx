import styled, { withTheme } from 'styled-components';

const Input = styled.input`
  font-family: ${props => props.theme.baseFontFamily};
  width: 100%;
  height: 34px;
  border: solid 1px black;
  padding-left: 14px;
  padding-right: 14px;
  outline: none;
  border-radius: 0;
  color: black;
`;

export default withTheme(Input);
