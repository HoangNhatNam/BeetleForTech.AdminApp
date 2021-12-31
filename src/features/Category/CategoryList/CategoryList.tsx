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
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CategoryService from 'services/CategoryService';
import ICategoryView from 'models/ICategoryView';

// atomic
import PaginationBase from 'components/molecules/PaginationBase';

// configs
import { PATH_NAME } from 'configs';

// helpers
import { canAction } from 'helpers';

// hooks
import usePagination from 'hooks/usePagination';

function CategoryList() {
  const history = useHistory();
  const { page, perPage, _changePage, _changePerPage } = usePagination();
  const [categories, setCategories] = useState<Array<ICategoryView>>([]);

  const retrieveCategory = () => {
    CategoryService.getAll()
      .then((response: any) => {
        setCategories(response.data);
      })
      .catch((e: Error) => {});
  };

  useEffect(() => {
    retrieveCategory();
  }, []);

  const refreshToolsManaList = () => {
    CategoryService.getAll()
      .then((response: any) => {
        setCategories(response.data);
      })
      .catch((e: Error) => {});
  };

  const onDelete = (id: number) => {
    if (window.confirm('Are you sure to delete this record?')) {
      CategoryService.remove(id)
        .then((response: any) => {
          refreshToolsManaList();
        })
        .catch((e: Error) => {});
    }
  };

  return (
    <div>
      {canAction('create', 'product') ? (
        <Grid container justify="flex-end">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => history.push(PATH_NAME.CATEGORY_ADD)}
          >
            Add Category
          </Button>
        </Grid>
      ) : null}
      <br />
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    aria-label=""
                    component="span"
                    onClick={() => history.push(`/category/edit/${row.id}`)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton color="primary" aria-label="" onClick={() => onDelete(row.id)} component="span">
                    <DeleteIcon />
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

export default CategoryList;
