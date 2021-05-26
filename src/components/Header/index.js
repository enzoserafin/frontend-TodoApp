/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as S from './styles';
import logo from '../../assets/logo.png';
import bell from '../../assets/bell.png';
import api from '../../services/api';
import isConnected from '../../utils/isConnect';

function Header({ clickNotification }) {
  const [lateCount, setLateCount] = useState();

  async function lateVerify() {
    await api.get(`/task/filter/late/${isConnected}`).then(response => {
      setLateCount(response.data.length);
    });
  }

  useEffect(() => {
    lateVerify();
  }, []);

  async function logout() {
    await localStorage.removeItem('@todo/macaddress');
    window.location.reload();
  }

  return (
    <S.Container>
      <S.LeftSide>
        <img src={logo} alt="Logo" />
      </S.LeftSide>
      <S.RightSide>
        <Link to="/">INÍCIO</Link>
        <span className="dividir" />
        <Link to="/task">NOVA TAREFA</Link>
        <span className="dividir" />
        {!isConnected ? (
          <Link to="/qrcode">SINCRONIZAR CELULAR</Link>
        ) : (
          <button type="button" onClick={logout}>
            SAIR
          </button>
        )}

        {lateCount > 0 ? (
          <>
            <span className="dividir" />
            <button onClick={clickNotification}>
              <img src={bell} alt="Notificação" />
              <span>{lateCount}</span>
            </button>
          </>
        ) : null}
      </S.RightSide>
    </S.Container>
  );
}

export default Header;
