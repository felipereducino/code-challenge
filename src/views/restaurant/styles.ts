import styled, { createGlobalStyle } from 'styled-components';
import Colors from '~/themes/colors';

interface IActive {
  active?: boolean;
}

export const BodyStyle = createGlobalStyle`
  body {
    background-color: ${Colors.yellowLight};
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

export const OptionsContainer = styled.div`
  flex: 1;
  background-color: ${Colors.white};
  padding: 15px;
  border-radius: 5px;
`;

export const TitleOptions = styled.h1`
  color: ${Colors.red};
  font-size: 20px;
`;

export const OptionsRakingText = styled.div`
  font-size: 25px;
`;

export const OptionsCostText = styled.span`
  position: relative;
  bottom: 5px;
  font-size: 17px;
  color: ${Colors.grey};
`;

export const CuisineOption = styled.p<IActive>`
  cursor: pointer;
  color: ${({ active }) => (active ? Colors.red : Colors.grey)};

  &:hover {
    color: ${Colors.red};
  }
`;

export const ProductContainer = styled.div`
  flex: 6;
  display: grid;
  grid-gap: 30px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  justify-content: left;
  justify-items: left;
  max-height: 275px;
  padding-left: 10px;
  padding-right: 10px;
`;
