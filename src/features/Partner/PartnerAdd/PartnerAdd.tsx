import React, { useState, ChangeEvent } from 'react';

import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '@pathofdev/react-tag-input/build/index.css';
import { useHistory } from 'react-router-dom';
import { PATH_NAME } from 'configs';
import PartnerService from 'services/PartnerService';
import IPartnerCreate from 'models/partner/IPartnerCreate';

function PartnerAdd() {
  const initPartnerState = {
    name: '',
    linkPartner: '',
  };
  const history = useHistory();
  const [partner, setPartner] = useState<IPartnerCreate>(initPartnerState);
  const [fileSelected, setFileSelected] = useState<File>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPartner({ ...partner, [e.target.name]: e.target.value });
  };

  const handleFileInput = (e: any) => {
    setFileSelected(e.target.files[0]);
  };

  const savePartner = () => {
    const formData = new FormData();
    formData.append('name', partner.name);
    formData.append('linkPartner', partner.linkPartner);
    if (fileSelected) {
      formData.append('imagePartner', fileSelected);
    }

    PartnerService.create(formData)
      .then((response: any) => {
        history.push(PATH_NAME.PARTNER_LIST);
      })
      .catch((e: Error) => {});
  };

  return (
    <>
      <Grid container alignItems="center">
        <Grid item sm={12}>
          <h2>Add Partner</h2>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <h4>Name</h4>
          <TextField fullWidth variant="outlined" label="Title" value={partner.name} onChange={handleChange} name="name" />
        </Grid>

        <Grid item xs={12} md={12}>
          <h4>Partner Image</h4>
          <input type="file" onChange={handleFileInput} accept="image/*" />
        </Grid>

        <Grid item xs={12} md={12}>
          <h4>Link Partner</h4>
          <TextField
            fullWidth
            variant="outlined"
            label="Link Partner"
            value={partner.linkPartner}
            onChange={handleChange}
            name="linkPartner"
          />
        </Grid>
      </Grid>
      <br />
      <br />
      <Grid container spacing={2}>
        <br />
        <Grid container item sm={12} md={12} justify="flex-end">
          <Button variant="outlined" color="primary" className="mr-20" onClick={() => history.push('/partner/list/')}>
            Cancel
          </Button>
          <Button color="primary" variant="contained" onClick={savePartner}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default PartnerAdd;
