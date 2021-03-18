import * as bcrypt from 'bcrypt';

export const isCryptCompare = async (firstCrypt: string, secondCrypt: string): Promise<boolean> => {
  return await bcrypt.compare(firstCrypt, secondCrypt);
};
