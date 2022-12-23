import React, { useState, useEffect } from 'react';
import api from '../lib/api';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Table from './Table';

export const App = () => {
  const [users, setUsers] = useState({
    fetchedData: null,
    errMSg: null,
    isLoading: false,
  });
  const [projects, setProjects] = useState({
    fetchedData: null,
    errMSg: null,
    isLoading: false,
  });

  const [usersOrder, setUsersOrder] = useState(true);
  const [projectsOrder, setProjectsOrder] = useState(true);

  const [updateUsers, setUpdateUsers] = useState(false);
  const [updateProjects, setUpdateProjects] = useState(false);

  const fetchUsers = async () => {
    setUsers(prev => ({
      ...prev,
      isLoading: true
    }))

    await api.getUsersDiff().then((data => {
      setUsers(prev => {
        if (usersOrder) {
          const sorted = [...data.data].sort((a, b) => a.timestamp - b.timestamp);
          return {
            ...prev,
            fetchedData: sorted,
            isLoading: false,
            errMSg: null
          }
        } else {
          const sorted = [...data.data].sort((a, b) => b.timestamp - a.timestamp);
          return {
            ...prev,
            fetchedData: sorted,
            isLoading: false,
            errMSg: null
          }
        }
      });
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
        if (projectsOrder) {
          const sorted = [...data.data].sort((a, b) => a.timestamp - b.timestamp);
          return {
            ...prev,
            fetchedData: sorted,
            isLoading: false,
            errMSg: null
          }
        } else {
          const sorted = [...data.data].sort((a, b) => b.timestamp - a.timestamp);
          return {
            ...prev,
            fetchedData: sorted,
            isLoading: false,
            errMSg: null
          }
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
    console.log(users.isNewestFirst);
  }, [users.isNewestFirst])

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

  useEffect(() => {
    if (usersOrder) {
      if (users.fetchedData) {
        const sorted = [...users.fetchedData].sort((a, b) => a.timestamp - b.timestamp);
        setUsers((prev) => ({ ...prev, fetchedData: sorted }))
      }
    } else {
      if (users.fetchedData) {
        const sorted = [...users.fetchedData].sort((a, b) => b.timestamp - a.timestamp);
        setUsers((prev) => ({ ...prev, fetchedData: sorted }))
      }
    }
  }, [usersOrder])

  useEffect(() => {
    if (projectsOrder) {
      if (projects.fetchedData) {
        const sorted = [...projects.fetchedData].sort((a, b) => a.timestamp - b.timestamp);
        setProjects((prev) => ({ ...prev, fetchedData: sorted }))
      }
    } else {
      if (projects.fetchedData) {
        const sorted = [...projects.fetchedData].sort((a, b) => b.timestamp - a.timestamp);
        setProjects((prev) => ({ ...prev, fetchedData: sorted }))
      }
    }
  }, [projectsOrder])


  return (
    <Container className="app" fixed>
      <Box data-testid="app-box" m={2}>
        <Table data={users} updateState={setUpdateUsers} errMsg={users.errMSg} sortByDate={setUsersOrder} />
        <Table data={projects} updateState={setUpdateProjects} errMsg={projects.errMSg} sortByDate={setProjectsOrder} />
      </Box>
    </Container>
  );
};

export default App;
