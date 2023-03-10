import { formatPrice } from './formatPrice';

export function maskMoney(e) {
    const onlyDigits = e.target.value
        .split('')
        .filter(s => /\d/.test(s))
        .join('')
        .padStart(3, '0');
    const digitsFloat = onlyDigits.slice(0, -2) + '.' + onlyDigits.slice(-2);
    e.target.value = formatPrice(digitsFloat);
}
