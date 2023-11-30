export default interface ICreatePromptResultDTO {
  title: string;
  promptId: string;
  userId: string;
  remakeId?: string;
  used_prompt: string;
  generated_output: string;
}
