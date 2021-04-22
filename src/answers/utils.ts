import { IAnswer } from '@answers/types';
import { PollItem } from '@polls/schemas/poll-item.schema';

const getMapWithItemIdAndAnswerUuid = (answers: IAnswer[]) => {
  return answers.reduce((prevAnswersMap, currAnswer) => {
    prevAnswersMap.set(currAnswer.pollItemId, currAnswer.pollAnswerUuid);

    return prevAnswersMap;
  }, new Map());
};

export const getResultScore = (answers: IAnswer[], items: PollItem[]): number => {
  const mapWithItemAndAnswerUuid = getMapWithItemIdAndAnswerUuid(answers);

  return items.reduce((prev, curr) => {
    const ans = mapWithItemAndAnswerUuid.get(curr._id.toString());

    if (ans && ans === curr.rightAnswer) {
      return ++prev;
    }

    return prev;
  }, 0);
};
