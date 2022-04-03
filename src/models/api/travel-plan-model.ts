export interface ITravelPlanModel {
  id: string;
  startLocation: string;
  endLocation: string;
  startDate: string;
  endDate: string;
  carId: string;
  car: {
    id: string;
    name: string;
    carType: string;
    color: string;
    plates: string;
    numberOfSeats: number;
  };
  driverId: string;
  driver: {
    id: string;
    name: string;
    isDriver: boolean;
  }
}
