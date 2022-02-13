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
import PostService from 'services/PostService';
import IPostView from 'models/IPostView';

// atomic
import PaginationBase from 'components/molecules/PaginationBase';

// configs
import { PATH_NAME, HttpConfig } from 'configs';

// helpers
import { canAction } from 'helpers';

// hooks
import usePagination from 'hooks/usePagination';

function PostList() {
  const history = useHistory();
  const { page, perPage, _changePage, _changePerPage } = usePagination();
  const [posts, setPosts] = useState<Array<IPostView>>([]);

  useEffect(() => {
    retrieveTutorials();
  }, []);

  const retrieveTutorials = () => {
    PostService.getAll()
      .then((response: any) => {
        setPosts(response.data);
      })
      .catch((e: Error) => {});
  };

  const refreshPostList = () => {
    PostService.getAll()
      .then((response: any) => {
        setPosts(response.data);
      })
      .catch((e: Error) => {});
  };

  const onDelete = (id: number) => {
    if (window.confirm('Are you sure to delete this record?')) {
      PostService.remove(id)
        .then((response: any) => {
          refreshPostList();
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
            onClick={() => history.push(PATH_NAME.POST_ADD)}
          >
            Add Post
          </Button>
        </Grid>
      ) : null}
      <br />
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Thumbnail</TableCell>
              <TableCell>Date Created</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((row) => (
              <TableRow key={row.title}>
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell>
                  <img src={HttpConfig.BaseURL + row.imagePath} style={{ height: '150px' }} alt="" />
                </TableCell>
                <TableCell>
                  {new Intl.DateTimeFormat('en-GB', {
                    month: 'long',
                    day: '2-digit',
                    year: 'numeric',
                  }).format(new Date(row.dateCreated))}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    aria-label=""
                    component="span"
                    onClick={() => history.push(`/product/edit/${row.id}`)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton color="primary" aria-label="" onClick={() => onDelete(row.id)} component="span">
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    aria-label=""
                    onClick={() => history.push(`/product/detail/${row.id}`)}
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

export default PostList;
