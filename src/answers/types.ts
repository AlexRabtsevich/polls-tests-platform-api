export interface IAnswer {
  pollItemId: string;
  pollAnswerUuid: string;
}

export interface IPollResult {
  score: number;
  countQuestions: number;
}
