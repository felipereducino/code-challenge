import React from 'react';
import { IconContext } from 'react-icons';
import { MdStar } from 'react-icons/md';
import Burger from '~/assets/burger.svg';
import Colors from '~/themes/colors';

import * as St from './styles';

interface IContent {
  name?: string;
  stars?: string;
  address?: string;
}

const Card: React.FC<IContent> = ({ name, stars, address }) => {
  const getStars = (quantity: number): Element[] => {
    const items = [];

    for (let i = 0; i < quantity; i += 1) {
      items.push(<MdStar key={`${i}/${quantity}`} />);
    }

    return items;
  };

  return (
    <St.Card>
      <St.CardTitle>{name}</St.CardTitle>
      <St.CardImg src={Burger} />
      <p>
        <IconContext.Provider value={{ color: Colors.yellow }}>
          {getStars(Number(Number(stars).toFixed(0)))}
        </IconContext.Provider>
      </p>
      <St.CardAddress>
        {address.length >= 40 ? `${address.substring(0, 40)}...` : address}
      </St.CardAddress>
      <St.CardButton>ORDER NOW</St.CardButton>
    </St.Card>
  );
};

export default Card;
