import React, { useState, ChangeEvent, useEffect } from 'react';

import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '@pathofdev/react-tag-input/build/index.css';
import ManagerService from 'services/ManagerService';
import IManagerCreate from 'models/manager/IManagerCreate';
import { useHistory } from 'react-router-dom';
import { PATH_NAME } from 'configs';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Typography } from '@material-ui/core';

function ManaAdd() {
  const initManaState = {
    fullName: '',
    role: '',
    email: '',
    phone: '',
    description: '',
  };
  const history = useHistory();
  const [manager, setManager] = useState<IManagerCreate>(initManaState);
  const [fileSelected, setFileSelected] = useState<File>();

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('FullName is required'),
    role: Yup.string().required('Role is required'),
    phone: Yup.string().required('Phone is required'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
    description: Yup.string().required('Description is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setManager({ ...manager, [e.target.name]: e.target.value });
  };

  const handleFileInput = (e: any) => {
    setFileSelected(e.target.files[0]);
  };

  const saveManager = () => {
    const formData = new FormData();
    formData.append('fullName', manager.fullName);
    formData.append('role', manager.role);
    formData.append('email', manager.email);
    formData.append('phone', manager.phone);
    formData.append('description', manager.description);
    if (fileSelected) {
      formData.append('imageManager', fileSelected);
    }

    ManagerService.create(formData)
      .then((response: any) => {
        history.push(PATH_NAME.MANAGER_LIST);
      })
      .catch((e: Error) => {});
  };

  return (
    <>
      <Grid container alignItems="center">
        <Grid item sm={12}>
          <h2>Add Manager</h2>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <h4>Full Name</h4>
          <TextField
            required
            label="Full Name"
            fullWidth
            variant="outlined"
            margin="dense"
            value={manager.fullName}
            {...register('fullName')}
            onChange={handleChange}
            name="fullName"
            error={!!errors.fullName}
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.fullName?.message}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={12}>
          <h4>Role</h4>
          <TextField
            required
            label="Role"
            fullWidth
            variant="outlined"
            margin="dense"
            value={manager.role}
            {...register('role')}
            onChange={handleChange}
            name="role"
            error={!!errors.role}
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.role?.message}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={12}>
          <h4>Email</h4>
          <TextField
            required
            label="Email"
            fullWidth
            variant="outlined"
            margin="dense"
            value={manager.email}
            {...register('email')}
            onChange={handleChange}
            name="email"
            error={!!errors.email}
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.email?.message}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={12}>
          <h4>Phone</h4>
          <TextField
            required
            label="Phone"
            fullWidth
            variant="outlined"
            margin="dense"
            value={manager.phone}
            {...register('phone')}
            onChange={handleChange}
            name="phone"
            error={!!errors.phone}
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.phone?.message}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={12}>
          <h4>Description</h4>
          <TextField
            required
            label="Description"
            fullWidth
            variant="outlined"
            margin="dense"
            value={manager.description}
            {...register('description')}
            onChange={handleChange}
            name="description"
            error={!!errors.description}
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.description?.message}
          </Typography>
        </Grid>

        <Grid item xs={12} md={12}>
          <h4>Image Manager</h4>
          <input type="file" onChange={handleFileInput} accept="image/*" />
        </Grid>
      </Grid>
      <br />
      <br />
      <Grid container spacing={2}>
        <br />
        <Grid container item sm={12} md={12} justify="flex-end">
          <Button variant="outlined" color="primary" className="mr-20" onClick={() => history.push('/managers/list/')}>
            Cancel
          </Button>
          <Button color="primary" variant="contained" onClick={handleSubmit(saveManager)}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default ManaAdd;
