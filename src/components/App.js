import React, { useState, useEffect } from 'react';
import api from '../lib/api';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Table from './Table';

export const App = () => {
  const [users, setUsers] = useState({
    fetchedData: null,
    errMSg: null,
    isLoading: false
  });
  const [projects, setProjects] = useState({
    fetchedData: null,
    errMSg: null,
    isLoading: false
  });

  const [updateUsers, setUpdateUsers] = useState(false);
  const [updateProjects, setUpdateProjects] = useState(false);

  // const fetchData = async (usersAreFetching, projectsAreFetching) => {
  //   console.log(usersAreFetching, projectsAreFetching);

  //   if (usersAreFetching) {
  //     setUsers(prev => ({
  //       ...prev,
  //       isLoading: true
  //     }))
  //     await api.getUsersDiff().then((data => {
  //       setUsers(prev => ({
  //         ...prev,
  //         fetchedData: data,
  //         isLoading: false
  //       }));
  //     })).catch(({ error }) => {
  //       setUsers(prev => ({
  //         ...prev,
  //         isLoading: false,
  //         errMSg: error,
  //       }));
  //       console.log(error);
  //     });
  //   }

  //   if (projectsAreFetching) {
  //     setProjects(prev => ({
  //       ...prev,
  //       isLoading: true
  //     }))
  //     await api.getProjectsDiff().then((data => {
  //       setProjects(prev => ({
  //         ...prev,
  //         fetchedData: data,
  //         isLoading: false
  //       }));
  //     })).catch(({ error }) => {
  //       setProjects(prev => ({
  //         ...prev,
  //         isLoading: false,
  //         errMSg: error,
  //       }));
  //       console.log(error);
  //     });
  //   }
  // };

  const fetchUsers = async () => {
    setUsers(prev => ({
      ...prev,
      isLoading: true
    }))
    await api.getUsersDiff().then((data => {
      setUsers(prev => ({
        ...prev,
        fetchedData: data,
        isLoading: false
      }));
    })).catch(({ error }) => {
      setUsers(prev => ({
        ...prev,
        isLoading: false,
        errMSg: "We had problems fetching your data. Please try again",
      }));
      console.log(error);
    });
  }

  const fetchProjects = async () => {
    setProjects(prev => ({
      ...prev,
      isLoading: true
    }))
    await api.getProjectsDiff().then((data => {
      setProjects(prev => ({
        ...prev,
        fetchedData: data,
        isLoading: false
      }));
    })).catch(({ error }) => {
      setProjects(prev => ({
        ...prev,
        isLoading: false,
        errMSg: "We had problems fetching your data. Please try again",
      }));
      console.log(error);
    });
  }

  useEffect(() => {
    fetchUsers();
    fetchProjects();
  }, [])

  useEffect(() => {
    if (updateUsers) {
      fetchUsers();
      setUpdateUsers(false);
    };
  }, [updateUsers])

  useEffect(() => {
    if (updateProjects) {
      fetchProjects();
      setUpdateProjects(false);
    };
  }, [updateProjects])


  return (
    <Container className="app" fixed>
      <Box data-testid="app-box" m={2}>
        <Table data={users} updateState={setUpdateUsers} errMsg={users.errMSg} />
        <Table data={projects} updateState={setUpdateProjects} errMsg={projects.errMSg} />
      </Box>
    </Container>
  );
};

export default App;
