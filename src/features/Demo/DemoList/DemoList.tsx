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
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import DemoService from 'services/DemoService';
import IDemoView from 'models/demo/IDemoView';

// atomic
import PaginationBase from 'components/molecules/PaginationBase';

// configs
import { PATH_NAME } from 'configs';

// helpers
import { canAction } from 'helpers';

// hooks
import usePagination from 'hooks/usePagination';

function DemoList() {
  const history = useHistory();
  const { page, perPage, _changePage, _changePerPage } = usePagination();
  const [demos, setDemos] = useState<Array<IDemoView>>([]);

  useEffect(() => {
    retrieveDemo();
  }, []);

  const retrieveDemo = () => {
    DemoService.getAll()
      .then((response: any) => {
        setDemos(response.data);
      })
      .catch((e: Error) => {});
  };

  const refreshDemoList = () => {
    DemoService.getAll()
      .then((response: any) => {
        setDemos(response.data);
      })
      .catch((e: Error) => {});
  };

  const onDelete = (id: number) => {
    if (window.confirm('Are you sure to delete this record?')) {
      DemoService.remove(id)
        .then((response: any) => {
          refreshDemoList();
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
              <TableCell>Job Title</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Annual Spend</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {demos.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.jobTitle}
                </TableCell>
                <TableCell>{row.fullName}</TableCell>
                <TableCell>{row.annualSpend}</TableCell>
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

export default DemoList;
