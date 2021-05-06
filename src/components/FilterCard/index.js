/* eslint-disable react/prop-types */
import React from 'react';
import * as S from './styles';

import filter from '../../assets/filter.png';

function FilterCard({ title, actived, onClick }) {
  return (
    <S.Container actived={actived} onClick={onClick}>
      <img src={filter} alt="Filtro" />

      <span>{title}</span>
    </S.Container>
  );
}

export default FilterCard;
