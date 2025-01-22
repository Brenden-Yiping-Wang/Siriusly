export class CreateAnswerDto {
  readonly user_id: string;
  readonly question_id: string;
  readonly answer: string;
  readonly is_answered: boolean;
}
