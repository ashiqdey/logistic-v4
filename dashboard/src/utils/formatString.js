
// remove extra space from both end
export function trimRaw(str) {
  if (!str) return '';
  str = str.trim();

  return str;
}


// a-z, A-Z, 0-9
export function alphaNumeric(str) {
  if (!str) return '';
  if (typeof str === 'number') return String(str);
  return str.replace(/[^A-Za-z0-9]/g, '');
}

// a-z, A-Z, 0-9, <space>, -, _
export function naming(str) {
  if (!str) return '';

  return str.replace(/[^\w\s-]/g, '');
}



//  0-9 as string
export function strNumeric(str) {
  if (!str) return '';
  if (typeof str === 'number') return String(str);

  return str.replace(/\D/g, '');
}



//  return decimal number, '1.3009.09, 1.30T09.E9, 1.3009.E9ab' -> '1.003'
export function strDecimal(str, decimalPoint) {
  if (!str) return '';
  if (typeof str === 'number') return String(str);

  const decimal = str.replace(/[^0-9.]/g, '').split('.').splice(0, 2).join('.');

  if (decimalPoint) {
    return String(parseFloat(parseFloat(decimal).toFixed(decimalPoint)))
  }

  return decimal;
}

export function capitalizeFirst(s) {
  return `${s.charAt(0).toUpperCase()}${s.slice(1)}`;
}