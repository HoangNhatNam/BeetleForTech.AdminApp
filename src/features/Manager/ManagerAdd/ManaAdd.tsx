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

function ManaAdd() {
  const initManaState = {
    fullName: '',
    role: '',
    email: '',
    phone: '',
  };
  const history = useHistory();
  const [manager, setManager] = useState<IManagerCreate>(initManaState);
  const [fileSelected, setFileSelected] = useState<File>();

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
        <Grid item xs={12} md={12}>
          <h4>Full Name</h4>
          <TextField
            fullWidth
            variant="outlined"
            label="Title"
            value={manager.fullName}
            onChange={handleChange}
            name="fullName"
          />
        </Grid>

        <Grid item xs={12} md={12}>
          <h4>Role</h4>
          <TextField fullWidth variant="outlined" label="Title" value={manager.role} onChange={handleChange} name="role" />
        </Grid>

        <Grid item xs={12} md={12}>
          <h4>Email</h4>
          <TextField fullWidth variant="outlined" label="Title" value={manager.email} onChange={handleChange} name="email" />
        </Grid>

        <Grid item xs={12} md={12}>
          <h4>Phone</h4>
          <TextField fullWidth variant="outlined" label="Title" value={manager.phone} onChange={handleChange} name="phone" />
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
          <Button color="primary" variant="contained" onClick={saveManager}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default ManaAdd;
