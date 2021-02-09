/* eslint-disable react-hooks/exhaustive-deps */
/* eslint no-return-assign: [2, "always"] */
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { MdStar, MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md';
import useApi, { ApiMethod } from '~/services/useApi';
import RestaurantInfo from '~/services/restaurant/response';
import CuisinesInfo from '~/services/cuisines/response';
import Load from '~/components/loading';
import Colors from '~/themes/colors';

import Card from '~/components/card';

import * as St from './styles';

const Restaurant: React.FC = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantTypes, setRestaurantTypes] = useState([]);

  const stars = [
    {
      position: 1,
      selected: false,
    },
    {
      position: 2,
      selected: false,
    },
    {
      position: 3,
      selected: false,
    },
    {
      position: 4,
      selected: false,
    },
    {
      position: 5,
      selected: false,
    },
  ];

  const costs = [
    {
      position: 1,
      selected: false,
    },
    {
      position: 2,
      selected: false,
    },
    {
      position: 3,
      selected: false,
    },
    {
      position: 4,
      selected: false,
    },
  ];

  const [activeStar, setActiveStar] = useState(stars);
  const [activeCost, setActiveCost] = useState(costs);
  const [activeCuisine, setActiveCuisine] = useState('');

  const history = useHistory();
  const { id } = useParams();

  if (!id) {
    history.push('/');
  }

  const RequestRestaurants = useApi<RestaurantInfo>(
    `${process.env.REACT_APP_BASE_URL}/search?city_id=${id}`,
    ApiMethod.GET,
  );

  const RequestRestaurantsTypes = useApi<CuisinesInfo>(
    `${process.env.REACT_APP_BASE_URL}/cuisines?city_id=${id}`,
    ApiMethod.GET,
  );

  useEffect(() => {
    RequestRestaurants.callApi();
    RequestRestaurantsTypes.callApi();
  }, []);

  const loadDataRestaurant = () => {
    const data = RequestRestaurants.data as RestaurantInfo;

    setRestaurants(data.restaurants);
  };

  const loadDataRestaurantTypes = () => {
    const data = RequestRestaurantsTypes.data as CuisinesInfo;

    setRestaurantTypes(data.cuisines);
  };

  useEffect(() => {
    if (RequestRestaurants.data) {
      loadDataRestaurant();
    }
  }, [RequestRestaurants.loading]);

  useEffect(() => {
    if (RequestRestaurantsTypes.data) {
      loadDataRestaurantTypes();
    }
  }, [RequestRestaurantsTypes.loading]);

  const filterRestaurants = (): void => {
    let getRestaurants = RequestRestaurants.data;

    const getRankingValue = activeStar.find((item) => item.selected);

    if (getRankingValue?.selected) {
      getRestaurants = getRestaurants.restaurants.filter(
        (item) =>
          Number(
            Number(item.restaurant.user_rating.aggregate_rating).toFixed(0),
          ) === getRankingValue.position,
      );
    }

    const getCostValue = activeCost.find((item) => item.selected);

    if (getCostValue?.selected) {
      if (getCostValue.position === 1) {
        if (getRankingValue?.selected) {
          getRestaurants = getRestaurants.filter(
            (item) =>
              Number(Number(item.restaurant.average_cost_for_two).toFixed(0)) <=
              50,
          );
        } else {
          getRestaurants = getRestaurants.restaurants.filter(
            (item) =>
              Number(Number(item.restaurant.average_cost_for_two).toFixed(0)) <=
              50,
          );
        }
      } else if (getCostValue.position === 2) {
        if (getRankingValue?.selected) {
          getRestaurants = getRestaurants.filter(
            (item) =>
              Number(Number(item.restaurant.average_cost_for_two).toFixed(0)) >=
                50 &&
              Number(Number(item.restaurant.average_cost_for_two).toFixed(0)) <=
                80,
          );
        } else {
          getRestaurants = getRestaurants.restaurants.filter(
            (item) =>
              Number(Number(item.restaurant.average_cost_for_two).toFixed(0)) >=
                50 &&
              Number(Number(item.restaurant.average_cost_for_two).toFixed(0)) <=
                80,
          );
        }
      } else if (getCostValue.position === 3) {
        if (getRankingValue?.selected) {
          getRestaurants = getRestaurants.filter(
            (item) =>
              Number(Number(item.restaurant.average_cost_for_two).toFixed(0)) >=
                80 &&
              Number(Number(item.restaurant.average_cost_for_two).toFixed(0)) <=
                110,
          );
        } else {
          getRestaurants = getRestaurants.restaurants.filter(
            (item) =>
              Number(Number(item.restaurant.average_cost_for_two).toFixed(0)) >=
                80 &&
              Number(Number(item.restaurant.average_cost_for_two).toFixed(0)) <=
                110,
          );
        }
      } else {
        /* eslint-disable-next-line */
        if (getRankingValue?.selected) {
          getRestaurants = getRestaurants.filter(
            (item) =>
              Number(Number(item.restaurant.average_cost_for_two).toFixed(0)) >=
              110,
          );
        } else {
          getRestaurants = getRestaurants.restaurants.filter(
            (item) =>
              Number(Number(item.restaurant.average_cost_for_two).toFixed(0)) >=
              110,
          );
        }
      }
    }

    if (activeCuisine) {
      if (getRankingValue?.selected || getCostValue?.selected) {
        getRestaurants = getRestaurants.filter((item) =>
          item.restaurant.cuisines.includes(activeCuisine),
        );
      } else {
        getRestaurants = getRestaurants.restaurants.filter((item) =>
          item.restaurant.cuisines.includes(activeCuisine),
        );
      }
    }

    getRankingValue?.selected || getCostValue?.selected || activeCuisine
      ? setRestaurants(getRestaurants)
      : setRestaurants(getRestaurants.restaurants);
  };

  const handleChangeRankingStar = (value: number): void => {
    const receiveStars = activeStar;

    for (let i = 0; i < receiveStars.length; i += 1) {
      if (i !== value) {
        receiveStars[i].selected = false;
      } else {
        receiveStars[i].selected = !activeStar[value].selected;
      }
    }

    setActiveStar([...receiveStars]);
    filterRestaurants();
  };

  const handleChangeCostStar = (value: number): void => {
    const receiveCosts = activeCost;

    for (let i = 0; i < receiveCosts.length; i += 1) {
      if (i !== value) {
        receiveCosts[i].selected = false;
      } else {
        receiveCosts[i].selected = !receiveCosts[value].selected;
      }
    }

    setActiveCost([...receiveCosts]);
    filterRestaurants();
  };

  const handleChangeCuisine = (value: string): void => {
    setActiveCuisine(value === 'Todos' ? '' : value);
    filterRestaurants();
  };

  const getStars = (quantity: number): Element[] => {
    const items = [];

    for (let i = 0; i < quantity; i += 1) {
      items.push(<MdStar key={`${i}/${quantity}`} />);
    }

    return items;
  };

  const getCosts = (quantity: number): JSX.Element => {
    if (quantity === 0) {
      return <St.OptionsCostText key={quantity}>R$50,00</St.OptionsCostText>;
    }

    if (quantity === 1) {
      return (
        <St.OptionsCostText key={quantity}>
          R$50,00 a R$80,00
        </St.OptionsCostText>
      );
    }

    if (quantity === 2) {
      return (
        <St.OptionsCostText key={quantity}>
          R$80,00 a R$110,00
        </St.OptionsCostText>
      );
    }

    return (
      <St.OptionsCostText key={quantity}>R$110,00 ou mais</St.OptionsCostText>
    );
  };

  return (
    <>
      <Load
        status={RequestRestaurants.loading || RequestRestaurantsTypes.loading}
      />

      <St.BodyStyle />

      <St.Container>
        <St.OptionsContainer>
          <div>
            <St.TitleOptions>NOTE</St.TitleOptions>

            {activeStar.map((star, index) => (
              <St.OptionsRakingText
                key={star.position}
                onClick={() => handleChangeRankingStar(index)}
              >
                <IconContext.Provider value={{ color: Colors.grey }}>
                  {star.selected ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                </IconContext.Provider>
                <IconContext.Provider value={{ color: Colors.yellow }}>
                  {getStars(index + 1)}
                </IconContext.Provider>
              </St.OptionsRakingText>
            ))}
          </div>
          <div>
            <St.TitleOptions>COST</St.TitleOptions>

            {activeCost.map((cost, index) => (
              <St.OptionsRakingText
                key={cost.position}
                onClick={() => handleChangeCostStar(index)}
              >
                <IconContext.Provider value={{ color: Colors.grey }}>
                  {cost.selected ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                </IconContext.Provider>
                {getCosts(index)}
              </St.OptionsRakingText>
            ))}
          </div>
          <div>
            <St.TitleOptions>CUISINES</St.TitleOptions>

            <St.CuisineOption
              active={!activeCuisine}
              onClick={() => handleChangeCuisine('Todos')}
            >
              Todos
            </St.CuisineOption>
            {restaurantTypes?.map((item) => (
              <St.CuisineOption
                key={item.cuisine.cuisine_id}
                active={activeCuisine === item.cuisine.cuisine_name}
                onClick={() => handleChangeCuisine(item.cuisine.cuisine_name)}
              >
                {item.cuisine.cuisine_name}
              </St.CuisineOption>
            ))}
          </div>
        </St.OptionsContainer>
        <St.ProductContainer>
          {restaurants && restaurants.length ? (
            restaurants?.map((item) => (
              <Card
                key={item.restaurant.id}
                name={item.restaurant.name}
                stars={item.restaurant.user_rating.aggregate_rating}
                address={item.restaurant.location.address}
              />
            ))
          ) : (
            <h3>Não encontramos nenhum estabelecimento.</h3>
          )}
        </St.ProductContainer>
      </St.Container>
    </>
  );
};

export default Restaurant;
