import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// material core
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import { IUser } from 'models/IUser';
import UserService from 'services/UserService';

// atomic
import PaginationBase from 'components/molecules/PaginationBase';

// configs
import { PATH_NAME } from 'configs';

// helpers
import { canAction } from 'helpers';

// hooks
import usePagination from 'hooks/usePagination';

function UserList() {
  const history = useHistory();
  const { page, perPage, _changePage, _changePerPage } = usePagination();
  const [users, setUsers] = useState<Array<IUser>>([]);

  useEffect(() => {
    retrieveUser();
  }, []);

  const retrieveUser = () => {
    UserService.getAll()
      .then((response: any) => {
        setUsers(response.data);
      })
      .catch((e: Error) => {});
  };

  const refreshUserList = () => {
    UserService.getAll()
      .then((response: any) => {
        setUsers(response.data);
      })
      .catch((e: Error) => {});
  };

  const onDelete = (id: any) => {
    if (window.confirm('Are you sure to delete this record?')) {
      UserService.remove(id)
        .then((response: any) => {
          refreshUserList();
        })
        .catch((e: Error) => {});
    }
  };

  return (
    <div>
      {canAction('create', 'user') ? (
        <Grid container justify="flex-end">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => history.push(PATH_NAME.USERS_ADD)}
          >
            Add User
          </Button>
        </Grid>
      ) : null}
      <br />
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.userName}
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>
                  <IconButton color="primary" aria-label="" onClick={() => onDelete(row.id)} component="span">
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    aria-label=""
                    onClick={() => history.push(`/demo/detail/${row.id}`)}
                    component="span"
                  >
                    <InfoIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PaginationBase pageIndex={page} perPage={perPage} totalPage={50} changePage={_changePage} changePerPage={_changePerPage} />
    </div>
  );
}

export default UserList;
