import React, { useState, useEffect } from 'react';
import api from '../lib/api';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Table from './Table';

export const App = () => {
  const [users, setUsers] = useState(null);
  const [projects, setProjects] = useState(null);
  const [errMsg, setErrMsg] = useState('');
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);
  const [updateUser, setUpdateUser] = useState(false);
  const [updateProjects, setUpdateProjects] = useState(false);

  const fetchData = async (usersAreFetching, projectsAreFetching) => {
    console.log(usersAreFetching, projectsAreFetching);
    // const promiseUsers = await api.getUsersDiff();
    // const promiseProjects = await api.getProjectsDiff();
    // if (usersAreFetching) setIsLoadingUsers(true);
    // if (projectsAreFetching) setIsLoadingProjects(true);
    // Promise.all([promiseUsers, promiseProjects]).then((values) => {
    //   if (usersAreFetching) {
    //     setUsers(values[0]);
    //     setIsLoadingUsers(false);
    //     setUpdateUser(false);
    //   }

    //   if (projectsAreFetching) {
    //     setProjects(values[1]);
    //     setIsLoadingProjects(false);
    //     setUpdateProjects(false);
    //   }

    // }).catch(({ error }) => {
    //   setIsLoadingProjects(false);
    //   setIsLoadingUsers(false);
    //   setErrMsg(error);
    //   console.log(error);
    // })

    if (usersAreFetching) {
      setIsLoadingUsers(true);
      await api.getUsersDiff().then((data => {
        setUsers(data);
        setIsLoadingUsers(false);
      })).catch(({ error }) => {
        setIsLoadingUsers(false);
        setErrMsg("We had problems fetching your data. Please try again.");
        console.log(error);
      });
    }

    if (projectsAreFetching) {
      setIsLoadingProjects(true);
      await api.getProjectsDiff().then((data => {
        setProjects(data);
        setIsLoadingProjects(false);
      })).catch(({ error }) => {
        setIsLoadingProjects(false);
        setErrMsg("We had problems fetching your data. Please try again.");
        console.log(error);
      });
    }
  };

  useEffect(() => {
    fetchData(true, true);
  }, []);

  useEffect(() => {
    fetchData(updateUser, updateProjects);
  }, [updateUser, updateProjects])


  return (
    <Container className="app" fixed>
      <Box data-testid="app-box" m={2}>
        <Table updateState={setUpdateUser} data={users} loading={isLoadingUsers} errMsg={errMsg} />
        <Table updateState={setUpdateProjects} data={projects} loading={isLoadingProjects} errMsg={errMsg} />
      </Box>
    </Container>
  );
};

export default App;
