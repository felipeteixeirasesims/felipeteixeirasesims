const InputType = {
  TEXT_FIELD: 'TEXT_FIELD',
  CHOICE_FIELD: 'CHOICE_FIELD',
  MULTIPLE_CHOICE_FIELD: 'MULTIPLE_CHOICE_FIELD'
} as const;

type InputType = (typeof InputType)[keyof typeof InputType];

export default InputType;
