import { createRandomNumber } from '../../common/utils/create-random-number';

export const createRandomNickname = (): string => {
  const randomNumber = createRandomNumber(6);
  const planets = [
    'mercury',
    'venus',
    'earth',
    'mars',
    'jupiter',
    'saturn',
    'uranus',
    'neptune',
  ];
  const indexOfPlanets = Math.floor(Math.random() * planets.length);
  const randomPlanet = planets[indexOfPlanets];
  return randomPlanet + randomNumber;
};
