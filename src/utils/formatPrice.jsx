export function formatPrice(price) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(price);
}

export function priceFormattedToNumber(price) {
    return Number(price.replace(/\D/g, '')) / 100;
}
