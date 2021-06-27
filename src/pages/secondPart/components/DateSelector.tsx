import React from 'react';
import { DateTime } from 'luxon';

export const DateSelector: React.FC<{
  date: DateTime;
  handleChangeDate: (event: React.ChangeEvent<HTMLInputElement>) => void;
  min?: DateTime;
  max?: DateTime;
}> = ({ date, handleChangeDate, min, max }) => (
  <input
    type="date"
    onChange={handleChangeDate}
    value={date.toISODate()}
    min={min && min.toISODate()}
    max={max && max.toISODate()}
  />
);
