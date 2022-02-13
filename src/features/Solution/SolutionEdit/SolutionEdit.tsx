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
import SolutionService from 'services/SolutionService';
import { useHistory, RouteComponentProps } from 'react-router-dom';
import { PATH_NAME } from 'configs';
import ISolutionUpdate from 'models/solution/ISolutionUpdate';

interface RouterProps {
  id: string;
}

type Props = RouteComponentProps<RouterProps>;

const SolutionEdit: React.FC<Props> = (props: Props) => {
  const initSolutionState = {
    id: 0,
    title: '',
    content: '',
    type: '',
  };
  const history = useHistory();
  const [solution, setSolution] = useState<ISolutionUpdate>(initSolutionState);
  const [fileSelected, setFileSelected] = useState<File>();

  const getSolution = (id: string) => {
    SolutionService.get(id)
      .then((response: any) => {
        solution.id = response.data.id;
        solution.title = response.data.title;
        solution.content = response.data.content;
        solution.type = response.data.type;
      })
      .catch((e: Error) => {});
  };

  useEffect(() => {
    getSolution(props.match.params.id);
  }, [props.match.params.id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSolution({ ...solution, [e.target.name]: e.target.value });
  };

  const handleFileInput = (e: any) => {
    setFileSelected(e.target.files[0]);
  };

  const handleContentChange = (event: any) => {
    setSolution({ ...solution, content: event });
  };

  const updateSolution = () => {
    const formData = new FormData();
    formData.append('id', JSON.stringify(solution.id));
    formData.append('title', solution.title);
    formData.append('content', solution.content);
    formData.append('type', solution.type);
    if (fileSelected) {
      formData.append('imageSolution', fileSelected);
    }

    SolutionService.update(formData)
      .then((response: any) => {
        history.push(PATH_NAME.SOLUTION_LIST);
      })
      .catch((e: Error) => {});
  };

  return (
    <>
      <Grid container alignItems="center">
        <Grid item sm={12}>
          <h2>Edit Solution</h2>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <h4>Title</h4>
          <TextField fullWidth variant="outlined" label="Title" value={solution.title} onChange={handleChange} name="title" />
        </Grid>

        <Grid item xs={12} md={12}>
          <h4>Content</h4>
          <ReactQuill value={solution.content} onChange={handleContentChange} />
        </Grid>

        <Grid item xs={12} md={12}>
          <h4>Type</h4>
          <TextField fullWidth variant="outlined" label="Type" value={solution.type} onChange={handleChange} name="type" />
        </Grid>

        <Grid item xs={12} md={12}>
          <h4>Solution Image</h4>
          <input type="file" onChange={handleFileInput} accept="image/*" />
        </Grid>
      </Grid>
      <br />
      <br />
      <Grid container spacing={2}>
        <br />
        <Grid container item sm={12} md={12} justify="flex-end">
          <Button variant="outlined" color="primary" className="mr-20" onClick={() => history.push('/solutions/list/')}>
            Cancel
          </Button>
          <Button color="primary" variant="contained" onClick={updateSolution}>
            Update
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default SolutionEdit;
