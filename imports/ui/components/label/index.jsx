import styled, { withTheme } from 'styled-components';

const Label = styled.label`
  font-family: ${props => props.theme.baseFontFamily};
  border: none;
  cursor: pointer;
  display: block;
  line-height: 2;
  margin-top: 10px;
  padding: 0;
`;

export default withTheme(Label);
