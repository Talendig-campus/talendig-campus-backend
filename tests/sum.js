const sum = (a, b) => {
  if (typeof a === 'number' && typeof b === 'number') {
    return a + b;
  }

  throw new Error('invalid sum');
};

// sum();
module.exports = { sum };
