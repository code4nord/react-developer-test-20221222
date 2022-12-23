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

  const fetchUsers = async (sort) => {
    setUsers(prev => ({
      ...prev,
      isLoading: true
    }))
    await api.getUsersDiff().then((resp => {
      resp.data.sort((a, b) => {
        return b.timestamp - a.timestamp
      });

      setUsers(prev => ({
        ...prev,
        fetchedData: resp,
        isLoading: false,
        errMSg: null
      }));
    })).catch(() => {
      setUsers(prev => ({
        ...prev,
        isLoading: false,
        errMSg: "We had problems fetching your data. Please try again",
      }));
    });
  }

  const fetchProjects = async () => {
    setProjects(prev => ({
      ...prev,
      isLoading: true
    }))
    await api.getProjectsDiff().then((data => {
      setProjects(prev => {
        return {
          ...prev,
          fetchedData: data,
          isLoading: false,
          errMSg: null
        }
      });
    })).catch(() => {
      setProjects(prev => {
        return {
          ...prev,
          isLoading: false,
          errMSg: "We had problems fetching your data. Please try again",
        }
      });
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
        <Table data={users} updateState={setUpdateUsers} errMsg={users.errMSg} sortByDate />
        <Table data={projects} updateState={setUpdateProjects} errMsg={projects.errMSg} />
      </Box>
    </Container>
  );
};

export default App;
