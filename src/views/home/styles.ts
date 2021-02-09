import styled, { createGlobalStyle } from 'styled-components';
import Colors from '~/themes/colors';

export const BodyStyleHome = createGlobalStyle`
  body {
    background-color: ${Colors.red};
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const ContainerResult = styled.div`
  margin-top: 10px;
  text-align: center;
  background-color: ${Colors.white};
  width: 400px;
  transition: 0.3s;
  border-radius: 5px;

  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }
`;

export const Input = styled.input`
  font-size: 20px;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  height: 42px;
  border: 0px !important;
  padding-left: 15px;

  &:focus {
    outline: none;
  }
`;

export const Button = styled.span`
  font-size: 20px;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  background-color: ${Colors.yellowLight};
  color: ${Colors.red};
  cursor: pointer;
  padding: 10px;
`;

export const Title = styled.h1`
  color: ${Colors.white};
`;
