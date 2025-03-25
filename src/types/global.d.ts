import type { Dayjs } from 'dayjs';

declare global {
  type IDatePickerControl = Dayjs | null;
}

export {};
