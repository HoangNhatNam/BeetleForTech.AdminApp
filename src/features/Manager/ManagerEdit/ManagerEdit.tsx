import React, { useState, ChangeEvent, useEffect } from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '@pathofdev/react-tag-input/build/index.css';
import { useHistory, RouteComponentProps } from 'react-router-dom';
import { PATH_NAME } from 'configs';
import IManagerUpdate from 'models/manager/IManagerUpdate';
import ManagerService from 'services/ManagerService';

interface RouterProps {
  id: string;
}

type Props = RouteComponentProps<RouterProps>;

const ManagerEdit: React.FC<Props> = (props: Props) => {
  const initManagerState = {
    id: 0,
    fullName: '',
    role: '',
    email: '',
    phone: '',
    description: '',
  };
  const history = useHistory();
  const [manager, setManager] = useState<IManagerUpdate>(initManagerState);
  const [fileSelected, setFileSelected] = useState<File>();

  const getManager = (id: string) => {
    ManagerService.get(id)
      .then((response: any) => {
        manager.id = response.data.id;
        manager.fullName = response.data.fullName;
        manager.role = response.data.role;
        manager.email = response.data.email;
        manager.phone = response.data.phone;
        manager.description = response.data.description;
      })
      .catch((e: Error) => {});
  };

  useEffect(() => {
    getManager(props.match.params.id);
  }, [props.match.params.id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setManager({ ...manager, [e.target.name]: e.target.value });
  };

  const handleFileInput = (e: any) => {
    setFileSelected(e.target.files[0]);
  };

  const updateManager = () => {
    const formData = new FormData();
    formData.append('id', JSON.stringify(manager.id));
    formData.append('fullName', manager.fullName);
    formData.append('role', manager.role);
    formData.append('email', manager.email);
    formData.append('phone', manager.phone);
    formData.append('description', manager.description);
    if (fileSelected) {
      formData.append('imageManager', fileSelected);
    }

    ManagerService.update(formData)
      .then((response: any) => {
        history.push(PATH_NAME.MANAGER_LIST);
      })
      .catch((e: Error) => {});
  };

  return (
    <>
      <Grid container alignItems="center">
        <Grid item sm={12}>
          <h2>Edit Manager</h2>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <h4>FullName</h4>
          <TextField
            fullWidth
            variant="outlined"
            label="FullName"
            value={manager.fullName}
            onChange={handleChange}
            name="fullName"
          />
        </Grid>

        <Grid item xs={12} md={12}>
          <h4>Role</h4>
          <TextField fullWidth variant="outlined" label="Role" value={manager.role} onChange={handleChange} name="role" />
        </Grid>

        <Grid item xs={12} md={12}>
          <h4>Email</h4>
          <TextField fullWidth variant="outlined" label="Email" value={manager.email} onChange={handleChange} name="email" />
        </Grid>

        <Grid item xs={12} md={12}>
          <h4>Phone</h4>
          <TextField fullWidth variant="outlined" label="Phone" value={manager.phone} onChange={handleChange} name="phone" />
        </Grid>

        <Grid item xs={12} md={12}>
          <h4>Description</h4>
          <TextField
            fullWidth
            variant="outlined"
            label="Description"
            value={manager.description}
            onChange={handleChange}
            name="description"
          />
        </Grid>

        <Grid item xs={12} md={12}>
          <h4>Manager Image</h4>
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
          <Button color="primary" variant="contained" onClick={updateManager}>
            Update
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ManagerEdit;
