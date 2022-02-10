import {onlyDigit} from '@/utils/string.utils';

function firstDayOfCurrentMonth() {
  const THIS_YEAR = new Date().getFullYear();
  const THIS_MONTH = new Date().getMonth();
  const THIS_DATE = new Date(THIS_YEAR, THIS_MONTH, 1);
  return THIS_DATE;
}

function luhnValidator(ccn: string) {
  let nCheck = 0,
    bEven = false;
  ccn = ccn.replace(/\D/g, '');

  for (var n = ccn.length - 1; n >= 0; n--) {
    var cDigit = ccn.charAt(n),
      nDigit = parseInt(cDigit, 10);

    if (bEven && (nDigit *= 2) > 9) nDigit -= 9;

    nCheck += nDigit;
    bEven = !bEven;
  }

  return nCheck % 10 === 0;
}

export function ccnValidation(ccn: string) {
  const value = onlyDigit(ccn);
  const isValid = luhnValidator(value);
  if (isValid) {
    return Promise.resolve();
  }
  return Promise.reject({message: 'Неправильный номер карты'});
}

export function requiredFieldValidator(value?: string | number | boolean) {
  if (value) {
    return Promise.resolve();
  } else {
    return Promise.reject({message: 'Обязательное поле'});
  }
}

export function cardExpirationDateValidator(date: string) {
  const [month, year] = date.split('/');
  const isValidMonth = Number(month) > 0 && Number(month) <= 12;
  const currentYear = new Date().toLocaleString('ru', {year: '2-digit'});
  const cardExpDate = new Date(Number(`20${year}`), Number(month) - 1, 1);
  const isValidDate = firstDayOfCurrentMonth().valueOf() <= cardExpDate.valueOf();
  const isValidYear = Number(currentYear) <= Number(year);
  return isValidDate && isValidMonth && isValidYear;
}

export function ccExpValidation(date: string) {
  const isValidExpDate = cardExpirationDateValidator(date);
  if (isValidExpDate) {
    return Promise.resolve();
  }
  return Promise.reject({message: 'Неправильная дата'});
}

export function cscValidation(csc?: string) {
  const lengthMessage = 'Код должен быть не менее 3 символов';
  if (csc && csc.length < 3) {
    return Promise.reject({message: lengthMessage});
  }
  return Promise.resolve();
}
