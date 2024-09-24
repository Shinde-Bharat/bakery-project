export default function generateOrderId() {
    const prefix = 'ORD';
    const numericPart = Math.floor(10000 + Math.random() * 90000); // 5-digit number
    const alphabeticPart = Array(5).fill(0).map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26))).join('');
    return `${prefix}-${numericPart}-${alphabeticPart}`;
};