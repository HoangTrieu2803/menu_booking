import { addDays, lightFormat, nextMonday } from "date-fns";

export const handleFormatDate = (date: Date) => {
    return lightFormat(date, 'yyyy-MM-dd');
}
export const handleFormatDateStart = (date: Date) => {
    return lightFormat(date, 'dd-MM');
}

export const numberFormat = (number:number) => {
    const decimals =  0;
    const thousandsSeparator = ',';

    const fixedNumber = number.toFixed(decimals);
    const parts = fixedNumber.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);

    return parts.join(thousandsSeparator);
}

export const FIRST_MONDAY = nextMonday(new Date());

export const RECENT_MONDAY = handleFormatDateStart(addDays(FIRST_MONDAY, -7));

export const LAST_FRIDAY = addDays(FIRST_MONDAY, 4);