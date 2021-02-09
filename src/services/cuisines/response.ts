interface ICuisinesInfo {
  cuisine?: {
    cuisine_id?: number;
    cuisine_name?: string;
  };
}

interface Cuisines {
  cuisines?: ICuisinesInfo[];
}

export default Cuisines;
