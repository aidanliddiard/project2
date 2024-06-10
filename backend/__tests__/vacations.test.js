// const request = require("supertest");
// const { app } = require("../index.ts");
// // const { getVacations } = require('../../src/vacationQueries.js');  

// // Mock the getVacations function
// jest.mock('../vacationQueries.js', () => ({
//     getVacations: jest.fn()
//   }));

//   describe('Test Get Vacations', () => {
//     afterEach(() => {
//       jest.clearAllMocks(); // Reset mock function calls after each test
//     });
  
//     it('should return mock data from getVacations', async () => {
//       // Define mock data for the getVacations function
//       const mockData = [
//         {
//           id: 1,
//           city: "Tokyo",
//           country: "Japan",
//           description: "Explore the bustling streets of Tokyo.",
//           start_date: "2024-08-01",
//           end_date: "2024-08-10",
//           user_id: 1
//         }
//       ];
  
//       // Mock the behavior of the getVacations function to return mock data
//       getVacations.mockResolvedValue(mockData);
  
//     });
  
//     it('should handle errors from getVacations', async () => {
//       // Mock the behavior of the getVacations function to throw an error
//       getVacations.mockRejectedValue(new Error('Database error'));
//     });
//   });