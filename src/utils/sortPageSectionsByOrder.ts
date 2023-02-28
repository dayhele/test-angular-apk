import { CardDefault } from '../app/shared/interfaces/card-default';

export const sortPageSectionsByOrder = (a: CardDefault, b: CardDefault) => {
  return a.order! < b.order! ? -1 : a.order! > b.order! ? 1 : 0;
};
