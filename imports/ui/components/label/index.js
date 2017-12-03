import styled, { withTheme } from 'styled-components';

const Label = styled.label`
  font-family: ${props => props.theme.baseFontFamily};
  font-size: 16px;
  border: none;
  cursor: pointer;
  display: block;
  line-height: 2;
  padding: 0;
`;

export default withTheme(Label);
