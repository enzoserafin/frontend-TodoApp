/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import * as S from './styles';

import api from '../../services/api';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FilterCard from '../../components/FilterCard';
import TaskCard from '../../components/TaskCard';

import filterItens from '../../utils/filterItens';

function Home() {
  const [filterActived, setFilterActived] = useState('all');
  const [taks, setTaks] = useState([]);
  const [lateCount, setLateCount] = useState(0);

  async function loadTasks() {
    await api
      .get(`/task/filter/${filterActived}/11:11:11:11:11:11`)
      .then(response => {
        setTaks(response.data);
      });
  }

  async function lateVerify() {
    await api.get(`/task/filter/late/11:11:11:11:11:11`).then(response => {
      setLateCount(response.data.length);
    });
  }

  function Notification() {
    setFilterActived('late');
  }

  useEffect(() => {
    loadTasks();
    lateVerify();
  }, [filterActived]);

  return (
    <S.Container>
      <Header lateCount={lateCount} clickNotification={Notification} />
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
          <TaskCard
            type={task.type}
            title={task.title}
            when={task.when}
            key={task._id}
          />
        ))}
      </S.Content>

      <Footer />
    </S.Container>
  );
}

export default Home;
