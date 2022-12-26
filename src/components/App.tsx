import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { fetchUsers } from '../store/actionsCreator/fetchUsers';
import { useAppDispatch } from '../hooks';

export const App = () => {
  const dispatch = useAppDispatch();

  const onClick = async () => {
    dispatch(fetchUsers())
  }

  return (
    <Container className="app" fixed>
      <Box data-testid="app-box" m={2}>
        <Typography>Your app should show up here.</Typography>
        <Button variant="contained" color="primary" onClick={(e) => onClick()}>
          Test data fetch
        </Button>
      </Box>
    </Container>
  );
};

export default App;
