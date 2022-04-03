export interface ITravelPlanEmployeeModel {
  id: string;
  employeeId: string;
  employee: {
    id: string;
    name: string;
    isDriver: boolean;
  };
  travelPlanId: string;
  travelPlan: {
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
  };
}
