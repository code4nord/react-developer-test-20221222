import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { fetchUsers } from '../store/actionsCreator/fetchUsers';
import { fetchProjects } from '../store/actionsCreator/fetchProjects';
import { userSorting, projectSorting } from '../store/actionsCreator/sort'
import { useAppDispatch, useAppSelector } from '../hooks';
import Table from './Table';

const App = () => {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);
  const projectState = useAppSelector((state) => state.project);
  const [sortedUserAsc, setUserSort] = useState<boolean>(true);
  const [sortedProjectAsc, setProjectSort] = useState<boolean>(true);

  const fetchUsersTable = async () => {
    dispatch(fetchUsers(sortedUserAsc));
  }

  const fetchProjectsTable = async () => {
    dispatch(fetchProjects(sortedProjectAsc));
  }

  useEffect(() => {
    const updateUserSort = (type: boolean) => {
      console.log(sortedUserAsc);
      dispatch(userSorting(type))
    }

    updateUserSort(sortedUserAsc);
  }, [sortedUserAsc, dispatch])

  useEffect(() => {
    const updateProjectSort = (type: boolean) => {
      dispatch(projectSorting(sortedProjectAsc));
    }

    updateProjectSort(sortedProjectAsc);
  }, [sortedProjectAsc, dispatch])

  useEffect(() => {
    dispatch(fetchUsers(true));
    dispatch(fetchProjects(true));
  }, [dispatch]);

  return (
    <Container className="app" fixed>
      <Box data-testid="app-box" m={2}>
        <Table fetchData={fetchUsersTable} state={userState} sort={sortedUserAsc} sortData={setUserSort} />
        <Table fetchData={fetchProjectsTable} state={projectState} sort={sortedProjectAsc} sortData={setProjectSort} />
      </Box>
    </Container>
  );
};

export default App;
