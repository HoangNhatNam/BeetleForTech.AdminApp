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
import IAboutUpdate from 'models/about/IAboutUpdate';
import AboutUsService from 'services/AboutUsService';

interface RouterProps {
  id: string;
}

type Props = RouteComponentProps<RouterProps>;

const AboutUsEdit: React.FC<Props> = (props: Props) => {
  const initAboutUsState = {
    id: 0,
    title: '',
    content: '',
  };
  const history = useHistory();
  const [aboutUs, setAboutUs] = useState<IAboutUpdate>(initAboutUsState);
  const [fileSelected, setFileSelected] = useState<File>();

  const getAboutUs = (id: string) => {
    AboutUsService.get(id)
      .then((response: any) => {
        aboutUs.id = response.data.id;
        aboutUs.title = response.data.title;
        aboutUs.content = response.data.content;
      })
      .catch((e: Error) => {});
  };

  useEffect(() => {
    getAboutUs(props.match.params.id);
  }, [props.match.params.id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAboutUs({ ...aboutUs, [e.target.name]: e.target.value });
  };

  const handleFileInput = (e: any) => {
    setFileSelected(e.target.files[0]);
  };

  const handleContentChange = (event: any) => {
    setAboutUs({ ...aboutUs, content: event });
  };

  const updateAboutUs = () => {
    const formData = new FormData();
    formData.append('id', JSON.stringify(aboutUs.id));
    formData.append('title', aboutUs.title);
    formData.append('content', aboutUs.content);
    if (fileSelected) {
      formData.append('imageAboutUs', fileSelected);
    }

    AboutUsService.update(formData)
      .then((response: any) => {
        history.push(PATH_NAME.ABOUTUS_LIST);
      })
      .catch((e: Error) => {});
  };

  return (
    <>
      <Grid container alignItems="center">
        <Grid item sm={12}>
          <h2>Edit About Us</h2>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <h4>Title</h4>
          <TextField fullWidth variant="outlined" label="Title" value={aboutUs.title} onChange={handleChange} name="title" />
        </Grid>

        <Grid item xs={12} md={12}>
          <h4>Content</h4>
          <ReactQuill value={aboutUs.content} onChange={handleContentChange} />
        </Grid>

        <Grid item xs={12} md={12}>
          <h4>About Us Image</h4>
          <input type="file" onChange={handleFileInput} accept="image/*" />
        </Grid>
      </Grid>
      <br />
      <br />
      <Grid container spacing={2}>
        <br />
        <Grid container item sm={12} md={12} justify="flex-end">
          <Button variant="outlined" color="primary" className="mr-20" onClick={() => history.push('/aboutus/list/')}>
            Cancel
          </Button>
          <Button color="primary" variant="contained" onClick={updateAboutUs}>
            Update
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default AboutUsEdit;
