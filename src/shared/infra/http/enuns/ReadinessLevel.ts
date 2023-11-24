const ReadinessLevel = {
  ONE: 'ONE',
  TWO: 'TWO',
  THREE: 'THREE',
  FOUR: 'FOUR',
  FIVE: 'FIVE',
  SIX: 'SIX',
  SEVEN: 'SEVEN',
  EIGHT: 'EIGHT',
  NINE: 'NINE',
} as const;

type ReadinessLevel = typeof ReadinessLevel[keyof typeof ReadinessLevel];


export default ReadinessLevel;