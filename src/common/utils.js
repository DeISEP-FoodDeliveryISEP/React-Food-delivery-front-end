import { $axios } from "./request";
export function formatImageLink(filename = '') {
    return `${$axios.defaults.baseURL}/common/download?name=${filename}`;
}

export function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR',
    }).format(price / 100);
}