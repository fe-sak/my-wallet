export default function formatToMoney(number) {
  return number.toFixed(2).replace('.', ',').replace('-', '');
}
