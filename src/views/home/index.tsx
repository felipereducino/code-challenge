import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useApi, { ApiMethod } from '~/services/useApi';
import CitiesInfo from '~/services/home/response';
import Load from '~/components/loading';

import * as St from './styles';

const Home: React.FC = () => {
  const [city, setCity] = useState('');
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const RequestCities = useApi<CitiesInfo>(
    `${process.env.REACT_APP_BASE_URL}/cities?q=${city}`,
    ApiMethod.GET,
  );

  const handleSearch = async (): Promise<void> => {
    try {
      setLoading(true);

      const response = await RequestCities.callApi();

      const data = response.data as CitiesInfo;

      setResult(data.location_suggestions);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <>
      <Load status={loading} />
      <St.BodyStyleHome />
      <St.Container>
        <St.Title>Busque sua cidade</St.Title>
      </St.Container>
      <St.Container>
        <St.Input type="text" onChange={(e) => setCity(e.target.value)} />
        <St.Button onClick={handleSearch}>Procurar</St.Button>
      </St.Container>

      <St.Container>
        <St.ContainerResult>
          {result &&
            result.map((cities) => (
              <p key={cities.id}>
                <Link to={`/${cities.id}`}>{cities.name}</Link>
              </p>
            ))}
        </St.ContainerResult>
      </St.Container>
    </>
  );
};

export default Home;
