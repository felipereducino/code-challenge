interface IRestaurantsInfo {
  restaurant?: {
    id?: string;
    name?: string;
    cuisines?: string;
    average_cost_for_two?: number;
    location?: {
      address?: string;
    };
    user_rating?: {
      aggregate_rating?: string;
    };
  };
}

interface Restaurants {
  restaurants?: IRestaurantsInfo[];
}

export default Restaurants;
