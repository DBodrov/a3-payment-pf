const charsMap = {
  Й: 'Q',
  Ц: 'W',
  У: 'E',
  К: 'R',
  Е: 'T',
  Н: 'Y',
  Г: 'U',
  Ш: 'I',
  Щ: 'O',
  З: 'P',
  Ф: 'A',
  Ы: 'S',
  В: 'D',
  А: 'F',
  П: 'G',
  Р: 'H',
  О: 'J',
  Л: 'K',
  Д: 'L',
  Я: 'Z',
  Ч: 'X',
  С: 'C',
  М: 'V',
  И: 'B',
  Т: 'N',
  Ь: 'M',
};

export const formatCCName = (name: string) => {
  function toEngCharReplacer(match: string): string {
      return charsMap[match] || '';
  }
  return name.toUpperCase().replace(/[А-Я]/g, toEngCharReplacer);
};
