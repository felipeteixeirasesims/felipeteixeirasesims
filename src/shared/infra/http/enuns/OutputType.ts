const OutputType = {
  HTML: 'HTML',
  RICH_TEXT: 'RICH_TEXT',
  TEXT: 'TEXT'
} as const;

type OutputType = (typeof OutputType)[keyof typeof OutputType];

export default OutputType;
