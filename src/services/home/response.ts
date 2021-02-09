interface ICitiesInfo {
  id?: number;
  name?: string;
}

interface CitiesInfo {
  location_suggestions?: ICitiesInfo[];
}

export default CitiesInfo;
