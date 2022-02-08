import React, { useState, ChangeEvent, useEffect } from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import ReactTagInput from '@pathofdev/react-tag-input';
import '@pathofdev/react-tag-input/build/index.css';
import { useHistory } from 'react-router-dom';
import { PATH_NAME } from 'configs';
import IApplicationCreate from 'models/application/IApplicationCreate';
import ApplicationService from 'services/ApplicationService';

function AppAdd() {
  const initPostState = {
    title: '',
    content: '',
    userId: '',
  };
  const history = useHistory();
  const [post, setPost] = useState<IApplicationCreate>(initPostState);
  const [fileSelected, setFileSelected] = useState<File>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleFileInput = (e: any) => {
    setFileSelected(e.target.files[0]);
  };

  const handleContentChange = (event: any) => {
    setPost({ ...post, content: event });
  };

  const savePost = () => {
    const formData = new FormData();
    formData.append('title', post.title);
    formData.append('content', post.content);
    formData.append('userId', '69bd714f-9576-45ba-b5b7-f00649be00de');
    if (fileSelected) {
      formData.append('thumbnailImage', fileSelected);
    }
    ApplicationService.create(formData)
      .then((response: any) => {
        history.push(PATH_NAME.APPLICATION_LIST);
      })
      .catch((e: Error) => {});
  };

  return (
    <>
      <Grid container alignItems="center">
        <Grid item sm={12}>
          <h2>Add Application</h2>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <h4>Title</h4>
          <TextField fullWidth variant="outlined" label="Title" value={post.title} onChange={handleChange} name="title" />
        </Grid>

        <Grid item xs={12} md={12}>
          <h4>Content</h4>
          <ReactQuill value={post.content} onChange={handleContentChange} />
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
          <Button color="primary" variant="contained" onClick={savePost}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default AppAdd;
