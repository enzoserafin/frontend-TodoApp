/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable eqeqeq */
/* eslint-disable no-alert */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { format } from 'date-fns';
import * as S from './styles';

import api from '../../services/api';
import isConnected from '../../utils/isConnect';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import TypeIcons from '../../utils/typeIcons';

import iconCalendar from '../../assets/calendar.png';
import iconClock from '../../assets/clock.png';

function Task({ match }) {
  const [redirect, setRedirect] = useState(false);
  const [type, setType] = useState();
  const [id, setId] = useState();
  const [done, setDone] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState();
  const [date, setDate] = useState();
  const [hour, setHour] = useState();

  async function loadTaskDetails() {
    await api.get(`./task/${match.params.id}`).then(response => {
      setType(response.data.type);
      setDone(response.data.done);
      setTitle(response.data.title);
      setDescription(response.data.description);
      setDate(format(new Date(response.data.when), 'yyyy-MM-dd'));
      setHour(format(new Date(response.data.when), 'HH:mm'));
    });
  }

  function formTaskValidate() {
    if (!type) {
      return alert('Você precisa selecionar o tipo da tarefa');
    }
    if (!title) {
      return alert('Você precisa informar o título da tarefa');
    }
    if (!description) {
      return alert('Você precisa informar a descrição da tarefa');
    }
    if (!date) {
      return alert('Você precisa definir a data da tarefa');
    }
    if (!hour) {
      return alert('Você precisa definir a data da tarefa');
    }
    return true;
  }

  async function save() {
    if (formTaskValidate()) {
      if (match.params.id) {
        await api
          .put(`/task/${match.params.id}`, {
            macaddress: isConnected,
            done,
            type,
            title,
            description,
            when: `${date}T${hour}:00.000`,
          })
          .then(() => setRedirect(true));
      } else {
        await api
          .post('/task', {
            macaddress: isConnected,
            type,
            title,
            description,
            when: `${date}T${hour}:00.000`,
          })
          .then(() => setRedirect(true));
      }
    } else {
      return null;
    }
  }

  async function remove() {
    const res = window.confirm('Deseja realmente remover a tarefa?');
    if (res === true) {
      await api
        .delete(`/task/${match.params.id}`)
        .then(() => setRedirect(true));
    }
  }

  useEffect(() => {
    if (!isConnected) {
      setRedirect(true);
    }
    loadTaskDetails();
  }, []);

  return (
    <S.Container>
      {redirect && <Redirect to="/" />}
      <Header />

      <S.Form>
        <S.TypeIcons>
          {TypeIcons.map(
            (icon, index) =>
              index > 0 && (
                <button key={icon} type="button" onClick={() => setType(index)}>
                  <img
                    src={icon}
                    alt="Tipo da Tarefa"
                    className={type !== index ? type : 'inative'}
                  />
                </button>
              ),
          )}
        </S.TypeIcons>
        <S.Input>
          <span>Título</span>
          <input
            type="text"
            placeholder="Título da tarefa..."
            onChange={e => setTitle(e.target.value)}
            value={title}
          />
        </S.Input>

        <S.TextArea>
          <span>Descrição</span>
          <textarea
            rows={5}
            placeholder="Detalhe sua tarefa..."
            onChange={e => setDescription(e.target.value)}
            value={description}
          />
        </S.TextArea>

        <S.Input>
          <span>Data</span>
          <input
            type="date"
            onChange={e => setDate(e.target.value)}
            value={date}
          />
          <img src={iconCalendar} alt="Calendário" />
        </S.Input>

        <S.Input>
          <span>Hora</span>
          <input
            type="time"
            onChange={e => setHour(e.target.value)}
            value={hour}
          />
          <img src={iconClock} alt="Relógio" />
        </S.Input>

        <S.Options>
          <div>
            <input
              type="checkbox"
              checked={done}
              onChange={() => setDone(!done)}
            />
            <span>CONCLUÍDO</span>
          </div>
          {match.params.id && (
            <button type="button" onClick={remove}>
              EXCLUIR
            </button>
          )}
        </S.Options>

        <S.Save>
          <button type="button" onClick={save}>
            SALVAR
          </button>
        </S.Save>
      </S.Form>

      <Footer />
    </S.Container>
  );
}

export default Task;
