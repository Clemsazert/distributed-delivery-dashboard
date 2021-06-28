import React from 'react';
import { DateTime } from 'luxon';
import styled from 'styled-components';

const StyledDateInput = styled.input`
  height: 50px;
  padding: 0px 10px;
  font-family: inherit;
`;

export const DateSelector: React.FC<{
  date: DateTime;
  handleChangeDate: (event: React.ChangeEvent<HTMLInputElement>) => void;
  min?: DateTime;
  max?: DateTime;
}> = ({ date, handleChangeDate, min, max }) => (
  <StyledDateInput
    type="date"
    onChange={handleChangeDate}
    value={date.toISODate()}
    min={min && min.toISODate()}
    max={max && max.toISODate()}
  />
);
