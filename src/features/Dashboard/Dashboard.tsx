import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { IUser } from 'models/IUser';
import UserService from 'services/UserService';
import ICategoryView from 'models/ICategoryView';
import CategoryService from 'services/CategoryService';

function Dashboard() {
  const [users, setUsers] = useState<Array<IUser>>([]);
  const [categories, setCategories] = useState<Array<ICategoryView>>([]);

  useEffect(() => {
    retrieve();
  }, []);

  const retrieve = () => {
    UserService.getAll()
      .then((response: any) => {
        setUsers(response.data);
      })
      .catch((e: Error) => {});

    CategoryService.getAll()
      .then((response: any) => {
        setCategories(response.data);
      })
      .catch((e: Error) => {});
  };

  const labels: string[] = [];
  const series: number[] = [];
  categories.forEach((x) => {
    labels.push(x.name);
    series.push(x.countPost);
  });

  const options: ApexOptions = {
    chart: {
      type: 'pie',
    },
    labels: labels,
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Paper>
            <Box m={2}>
              <Grid container item xs={12}>
                <h2>Posts</h2>
              </Grid>
              <Grid container justify="space-between">
                <Grid item xs={12} sm={12} md={4}>
                  <TableContainer>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Category</TableCell>
                          <TableCell align="right" />
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {categories.map((row, idx) => (
                          <TableRow key={idx}>
                            <TableCell component="th" scope="row">
                              {row.name}
                            </TableCell>
                            <TableCell align="right">{row.countPost}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid container justify="center" item xs={12} sm={12} md={6}>
                  <div>
                    <Chart options={options} series={series} type="pie" width={500} />
                  </div>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12}>
          <Paper>
            <Box m={2}>
              <Grid container item xs={12}>
                <h2>Users</h2>
              </Grid>
              <TableContainer>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>User Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Full Name</TableCell>
                      <TableCell>Role</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{user.userName}</TableCell>
                        <TableCell component="th" scope="row">
                          {user.email}
                        </TableCell>
                        <TableCell>{user.lastName + user.firstName}</TableCell>
                        <TableCell>{`${user.roles} ,`}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
