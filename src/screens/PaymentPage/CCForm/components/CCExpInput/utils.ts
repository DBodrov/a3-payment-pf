export const SPEC_SYMBOLS = ['(', ')', '-', ' ', '+', '_', '/'];
// export const isSpecSymbol = (char: string) => SPEC_SYMBOLS.includes(char);

export function removeMask(value: string) {
  const result = [...value].filter(char => {
    return !SPEC_SYMBOLS.includes(char) && isFinite(Number(char));
  }).join('');
  return result;
}

export function createMaskedValue(value: string, mask: string) {
  const val = [...value];
  const result = [...mask].map(ch => {
    if (ch === '9' && val.length > 0) {
      return val.shift()
    } else if (val.length === 0) {
      return false;
    }
    return ch;
  }).filter(Boolean).join('');

  return result;
}

export function createDisplayValue(rawValue: string, mask: string) {
  const result = createMaskedValue(rawValue, mask);
  return result;
}
