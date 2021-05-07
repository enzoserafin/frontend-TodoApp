/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import * as S from './styles';

import api from '../../services/api';
import isConnected from '../../utils/isConnect';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FilterCard from '../../components/FilterCard';
import TaskCard from '../../components/TaskCard';

import filterItens from '../../utils/filterItens';

function Home() {
  const [filterActived, setFilterActived] = useState('all');
  const [taks, setTaks] = useState([]);
  const [redirect, setRedirect] = useState(false);

  async function loadTasks() {
    await api
      .get(`/task/filter/${filterActived}/${isConnected}`)
      .then(response => {
        setTaks(response.data);
      });
  }

  function Notification() {
    setFilterActived('late');
  }

  useEffect(() => {
    loadTasks();

    if (!isConnected) setRedirect(true);
  }, [filterActived]);

  return (
    <S.Container>
      {redirect && <Redirect to="/qrcode" />}
      <Header clickNotification={Notification} />
      <S.FilterArea>
        {filterItens.map(item => {
          return (
            <FilterCard
              key={item.title}
              title={item.title}
              actived={filterActived === item.actived}
              onClick={() => setFilterActived(item.actived)}
            />
          );
        })}
      </S.FilterArea>

      <S.Title>
        <h3>{filterActived === 'late' ? 'TAREFAS ATRASADAS' : 'TAREFAS'}</h3>
      </S.Title>

      <S.Content>
        {taks.map(task => (
          <Link to={`/task/${task._id}`} key={task._id}>
            <TaskCard
              type={task.type}
              title={task.title}
              when={task.when}
              done={task.done}
            />
          </Link>
        ))}
      </S.Content>

      <Footer />
    </S.Container>
  );
}

export default Home;
