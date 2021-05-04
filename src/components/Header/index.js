import React from 'react';
import * as S from './styles';
import logo from '../../assets/logo.png';
import bell from '../../assets/bell.png';

function Header() {
  return (
    <S.Container>
      <S.LeftSide>
        <img src={logo} alt="Logo" />
      </S.LeftSide>
      <S.RightSide>
        <a href="www.google.com.br">INÍCIO</a>
        <span className="dividir" />
        <a href="www.google.com.br">NOVA TAREFA</a>
        <span className="dividir" />
        <a href="www.google.com.br">SINCRONIZAR CELULAR</a>
        <span className="dividir" />
        <a href="www.google.com.br" id="notification">
          <img src={bell} alt="Notificação" />
          <span>5</span>
        </a>
      </S.RightSide>
    </S.Container>
  );
}

export default Header;
