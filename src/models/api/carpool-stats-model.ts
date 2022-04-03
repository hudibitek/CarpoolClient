export interface ICarpoolStatsModel {
  car: {
    id: string;
    carName: string;
    carPlates: string;
    numberOfTrips: number;
  };
  uniquePassengers: string[];
}
