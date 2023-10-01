export function getRandomArrayDivisibleBy25(min, max, size) {
  const result = [];
  while (result.length < size) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    if (randomNumber % 25 === 0) {
      result.push(randomNumber);
    }
  }

  return result;
}

export function getRandomDivisibleBy25(min, max) {
  let found = false;
  let randomNumber = 0;
  while (!found) {
    randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    if (randomNumber % 25 === 0) {
      found = true;
    }
  }
  return randomNumber;
}
