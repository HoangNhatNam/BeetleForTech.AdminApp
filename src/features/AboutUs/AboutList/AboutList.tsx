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
import AboutUsService from 'services/AboutUsService';
import IAboutView from 'models/about/IAboutView';

// atomic
import PaginationBase from 'components/molecules/PaginationBase';

// configs
import { PATH_NAME, HttpConfig } from 'configs';

// helpers
import { canAction } from 'helpers';

// hooks
import usePagination from 'hooks/usePagination';

function AboutList() {
  const history = useHistory();
  const { page, perPage, _changePage, _changePerPage } = usePagination();
  const [aboutus, setAboutus] = useState<Array<IAboutView>>([]);

  useEffect(() => {
    retrieveAboutUs();
  }, []);

  const retrieveAboutUs = () => {
    AboutUsService.getAll()
      .then((response: any) => {
        setAboutus(response.data);
      })
      .catch((e: Error) => {});
  };

  const refreshAboutList = () => {
    AboutUsService.getAll()
      .then((response: any) => {
        setAboutus(response.data);
      })
      .catch((e: Error) => {});
  };

  const onDelete = (id: number) => {
    if (window.confirm('Are you sure to delete this record?')) {
      AboutUsService.remove(id)
        .then((response: any) => {
          refreshAboutList();
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
              <TableCell>Title</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Content</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {aboutus.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell>
                  <img src={HttpConfig.BaseURL + row.imagePath} style={{ height: '150px' }} alt="" />
                </TableCell>
                <TableCell>
                  <div dangerouslySetInnerHTML={{ __html: row.content }} />
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    aria-label=""
                    component="span"
                    onClick={() => history.push(`/aboutus/edit/${row.id}`)}
                  >
                    <EditIcon />
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

export default AboutList;
