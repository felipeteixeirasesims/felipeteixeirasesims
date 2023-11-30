export default interface ICreatePromptResultDTO {
  title: string;
  promptId: string;
  remakeId?: string;
  used_prompt: string;
  generated_output: string;
}
