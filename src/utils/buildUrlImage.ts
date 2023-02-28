import { CdnItem, Cdnlist } from '../app/shared/interfaces/cdnlist';
import { MainStructure } from '../app/shared/interfaces/main-structure';

export const buildUrlImage = (
  cdnId: number | undefined,
  imageName: string | undefined,
  main: MainStructure
): string => {
  const url: Cdnlist = main?.cdnlist?.find((cdn: CdnItem) => cdnId === cdn.id);
  if (url?.value) {
    if (cdnId === 1) return url.value.replace('{image}/ks/{ks}', imageName!);

    return url.value.replace('{image}', imageName!);
  }
  return '';
};
