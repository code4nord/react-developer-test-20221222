import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { fetchUsers } from '../store/actionsCreator/fetchUsers';
import { fetchProjects } from '../store/actionsCreator/fetchProjects';
import { userSorting } from '../store/actionsCreator/sort'
import { useAppDispatch, useAppSelector } from '../hooks';
import Table from './Table';

export const App = () => {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);
  const projectState = useAppSelector((state) => state.project);
  const [userSort, setUserSort] = useState<boolean>(true);
  const [projectSort, setProjectSort] = useState<boolean>(true);

  const fetchUsersTable = async () => {
    dispatch(fetchUsers());
  }

  const fetchProjectsTable = async () => {
    dispatch(fetchProjects());
  }

  const updateUserSort = async () => {
    setUserSort(!userSort);
    dispatch(userSorting(userSort))
  }

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchProjects());
  }, [dispatch]);

  return (
    <Container className="app" fixed>
      <Box data-testid="app-box" m={2}>
        <Table fetchData={fetchUsersTable} state={userState} sortData={updateUserSort} sort={userSort} />
        <Table fetchData={fetchProjectsTable} state={projectState} sortData={() => setProjectSort(!projectSort)} sort={projectSort} />
      </Box>
    </Container>
  );
};

export default App;
