import styled from 'styled-components';
import Colors from '~/themes/colors';

export const Card = styled.div`
  background-color: ${Colors.white};
  border-radius: 5px;
  width: 100%;
  max-width: 250px;
  height: 275px;
  padding: 5px;
  transition: 0.3s;
  text-align: center;

  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }
`;

export const CardTitle = styled.p`
  color: ${Colors.red};
  text-transform: uppercase;
`;

export const CardImg = styled.img`
  height: 50px;
  width: 50px;
`;

export const CardAddress = styled.p`
  color: ${Colors.red};
  margin-bottom: 25px;
`;

export const CardButton = styled.span`
  background-color: ${Colors.red};
  color: ${Colors.white};
  font-weight: bold;
  padding: 15px;
  font-size: 12px;
  border-radius: 50px;
  cursor: pointer;
`;
