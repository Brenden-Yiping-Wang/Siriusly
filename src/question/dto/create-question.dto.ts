export class CreateQuestionDto {
  readonly question: string;
  readonly choices: string[];
  readonly tags?: string[];
}
