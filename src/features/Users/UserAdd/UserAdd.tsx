import React, { useState, ChangeEvent } from 'react';

import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '@pathofdev/react-tag-input/build/index.css';
import { useHistory } from 'react-router-dom';
import { PATH_NAME } from 'configs';
import UserService from 'services/UserService';
import IUserCreate from 'models/user/IUserCreate';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Typography } from '@material-ui/core';

function UserAdd() {
  const initUserState = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    userName: '',
    password: '',
  };
  const history = useHistory();
  const [user, setUser] = useState<IUserCreate>(initUserState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('FirstName is required'),
    lastName: Yup.string().required('LastName is required'),
    phoneNumber: Yup.string().required('PhoneNumber is required'),
    userName: Yup.string().required('UserName is required'),
    // lastName: Yup.string()
    //   .required('Username is required')
    //   .min(6, 'Username must be at least 6 characters')
    //   .max(20, 'Username must not exceed 20 characters'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const saveUser = () => {
    const formData = new FormData();
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('email', user.email);
    formData.append('phoneNumber', user.phoneNumber);
    formData.append('userName', user.userName);
    formData.append('password', user.password);

    UserService.create(formData)
      .then((response: any) => {
        history.push(PATH_NAME.USERS);
      })
      .catch((e: Error) => {});
  };

  return (
    <>
      <Grid container alignItems="center">
        <Grid item sm={12}>
          <h2>Add User</h2>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <h4>User Name</h4>
          <TextField
            required
            label="UserName"
            fullWidth
            variant="outlined"
            margin="dense"
            value={user.userName}
            {...register('userName')}
            onChange={handleChange}
            name="userName"
            error={!!errors.userName}
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.userName?.message}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <h4>First Name</h4>
          <TextField
            required
            id="firstName"
            label="FirstName"
            value={user.firstName}
            fullWidth
            variant="outlined"
            margin="dense"
            {...register('firstName')}
            error={!!errors.firstName}
            onChange={handleChange}
            name="firstName"
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.firstName?.message}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <h4>Last Name</h4>
          <TextField
            required
            id="lastName"
            label="LastName"
            value={user.lastName}
            fullWidth
            variant="outlined"
            margin="dense"
            {...register('lastName')}
            error={!!errors.lastName}
            onChange={handleChange}
            name="lastName"
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.lastName?.message}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={12}>
          <h4>Email</h4>
          <TextField
            required
            id="email"
            label="Email"
            value={user.email}
            fullWidth
            variant="outlined"
            margin="dense"
            {...register('email')}
            error={!!errors.email}
            onChange={handleChange}
            name="email"
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.email?.message}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={12}>
          <h4>Phone Number</h4>
          <TextField
            required
            id="phoneNumber"
            label="PhoneNumber"
            value={user.phoneNumber}
            fullWidth
            variant="outlined"
            margin="dense"
            {...register('phoneNumber')}
            error={!!errors.phoneNumber}
            onChange={handleChange}
            name="phoneNumber"
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.phoneNumber?.message}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={12}>
          <h4>Password</h4>
          <TextField
            required
            id="password"
            label="Password"
            value={user.password}
            fullWidth
            variant="outlined"
            margin="dense"
            {...register('password')}
            error={!!errors.password}
            onChange={handleChange}
            name="password"
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.password?.message}
          </Typography>
        </Grid>
      </Grid>
      <br />
      <br />
      <Grid container spacing={2}>
        <br />
        <Grid container item sm={12} md={12} justify="flex-end">
          <Button variant="outlined" color="primary" className="mr-20" onClick={() => history.push('/users')}>
            Cancel
          </Button>
          <Button color="primary" variant="contained" onClick={handleSubmit(saveUser)}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default UserAdd;
