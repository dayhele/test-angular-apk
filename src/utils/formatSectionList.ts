import { CardDefault } from '../app/shared/interfaces/card-default';
import {
  CardListData,
  SectionCardListData,
  SectionControlData
} from '../app/shared/interfaces/card-home';
import { MainStructure } from '../app/shared/interfaces/main-structure';
import { buildUrlImage } from './buildUrlImage';

export const formatSectionList = (
  sectionData: SectionCardListData,
  item: CardDefault,
  mainStructure: MainStructure,
  pageSectionData: SectionControlData[]
) => {
  const section = sectionData;

  section.list?.forEach((cardData: CardListData) => {
    switch (item?.cardProperties?.orientation) {
      case 'vertical':
        if (Object.keys(mainStructure).length != 0 && !cardData.isNSports && !cardData.isPreSave)
          return (cardData.imageUrl = buildUrlImage(
            cardData.cdn,
            cardData.cover,
            mainStructure
          ));
        else return (cardData.imageUrl = cardData.imageUrl?.replace('{image}', cardData.cover!));
      default:
        if (Object.keys(mainStructure).length != 0 && !cardData.isNSports && !cardData?.isPreSave)
          return (cardData.imageUrl = buildUrlImage(
            cardData.cdn,
            cardData.highlight,
            mainStructure
          ));
        else return (cardData.imageUrl = cardData.imageUrl?.replace('{image}', cardData.highlight!));
    }
  });

  pageSectionData.push({
    id: item.id,
    order: item.order,
    titleIcon: item.titleIcon,
    title: item.title,
    data: section?.list,
    type: item.type,
    cardProperties: item.cardProperties,
    hasCustomIcon: item.hasCustomIcon,
    hasCustomBanner: item.hasCustomBanner,
    description: item.description,
    loadStatus: 0,
  });

  return pageSectionData;
};
