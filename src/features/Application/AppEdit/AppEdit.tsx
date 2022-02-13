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
import ApplicationService from 'services/ApplicationService';
import IApplicationUpdate from 'models/application/IApplicationUpdate';

interface RouterProps {
  id: string;
}

type Props = RouteComponentProps<RouterProps>;

const AppEdit: React.FC<Props> = (props: Props) => {
  const initAppState = {
    id: 0,
    title: '',
    content: '',
  };
  const history = useHistory();
  const [application, setApplication] = useState<IApplicationUpdate>(initAppState);
  const [fileSelected, setFileSelected] = useState<File>();

  const getApplication = (id: string) => {
    ApplicationService.getUpdate(id)
      .then((response: any) => {
        application.id = response.data.id;
        application.title = response.data.title;
        application.content = response.data.content;
        console.log(application);
      })
      .catch((e: Error) => {});
  };

  useEffect(() => {
    getApplication(props.match.params.id);
  }, [props.match.params.id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setApplication({ ...application, [e.target.name]: e.target.value });
  };

  const handleFileInput = (e: any) => {
    setFileSelected(e.target.files[0]);
  };

  const handleContentChange = (event: any) => {
    setApplication({ ...application, content: event });
  };

  const updateApp = () => {
    const formData = new FormData();
    formData.append('id', JSON.stringify(application.id));
    formData.append('title', application.title);
    formData.append('content', application.content);
    if (fileSelected) {
      formData.append('thumbnailImage', fileSelected);
    }

    ApplicationService.update(formData)
      .then((response: any) => {
        history.push(PATH_NAME.APPLICATION_LIST);
      })
      .catch((e: Error) => {});
  };

  return (
    <>
      <Grid container alignItems="center">
        <Grid item sm={12}>
          <h2>Edit Application</h2>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <h4>Title</h4>
          <TextField fullWidth variant="outlined" label="Title" value={application.title} onChange={handleChange} name="title" />
        </Grid>

        <Grid item xs={12} md={12}>
          <h4>Content</h4>
          <ReactQuill value={application.content} onChange={handleContentChange} />
        </Grid>

        <Grid item xs={12} md={12}>
          <h4>Thumbnail Image</h4>
          <input type="file" onChange={handleFileInput} accept="image/*" />
        </Grid>
      </Grid>
      <br />
      <br />
      <Grid container spacing={2}>
        <br />
        <Grid container item sm={12} md={12} justify="flex-end">
          <Button variant="outlined" color="primary" className="mr-20" onClick={() => history.push('/applications/list/')}>
            Cancel
          </Button>
          <Button color="primary" variant="contained" onClick={updateApp}>
            Update
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default AppEdit;
