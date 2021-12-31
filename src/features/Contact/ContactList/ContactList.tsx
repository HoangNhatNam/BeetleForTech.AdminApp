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
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import ContactService from 'services/ContactService';
import IContactView from 'models/contact/IContactView';

// atomic
import PaginationBase from 'components/molecules/PaginationBase';

// configs
import { PATH_NAME } from 'configs';

// helpers
import { canAction } from 'helpers';

// hooks
import usePagination from 'hooks/usePagination';

function ContactList() {
  const history = useHistory();
  const { page, perPage, _changePage, _changePerPage } = usePagination();
  const [contacts, setContacts] = useState<Array<IContactView>>([]);

  useEffect(() => {
    retrieveContact();
  }, []);

  const retrieveContact = () => {
    ContactService.getAll()
      .then((response: any) => {
        setContacts(response.data);
      })
      .catch((e: Error) => {});
  };

  const refreshPostList = () => {
    ContactService.getAll()
      .then((response: any) => {
        setContacts(response.data);
      })
      .catch((e: Error) => {});
  };

  const onDelete = (id: number) => {
    if (window.confirm('Are you sure to delete this record?')) {
      ContactService.remove(id)
        .then((response: any) => {
          refreshPostList();
        })
        .catch((e: Error) => {});
    }
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Company Name</TableCell>
              <TableCell>Job Title</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.companyName}
                </TableCell>
                <TableCell>{row.jobTitle}</TableCell>
                <TableCell>{row.fullName}</TableCell>
                <TableCell>
                  <IconButton color="primary" aria-label="" onClick={() => onDelete(row.id)} component="span">
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    aria-label=""
                    onClick={() => history.push(`/contact/detail/${row.id}`)}
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

export default ContactList;
