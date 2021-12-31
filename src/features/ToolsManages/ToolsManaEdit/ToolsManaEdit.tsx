import React, { useState, ChangeEvent, useEffect } from 'react';

import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '@pathofdev/react-tag-input/build/index.css';
import ToolsManaService from 'services/ToolsManaService';
import IToolsManages from 'models/toolsManages/IToolsMana';
import { useHistory, RouteComponentProps } from 'react-router-dom';
import { PATH_NAME } from 'configs';

interface RouterProps {
  id: string;
}

type Props = RouteComponentProps<RouterProps>;

const ToolsManaEdit: React.FC<Props> = (props: Props) => {
  const initToolsManaState = {
    id: 0,
    title: '',
  };
  const history = useHistory();
  const [toolsmana, setToolsMana] = useState<IToolsManages>(initToolsManaState);

  const getToolMana = (id: string) => {
    ToolsManaService.get(id)
      .then((response: any) => {
        setToolsMana(response.data);
      })
      .catch((e: Error) => {});
  };

  useEffect(() => {
    getToolMana(props.match.params.id);
  }, [props.match.params.id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setToolsMana({ ...toolsmana, [e.target.name]: e.target.value });
  };

  const updateToolsMana = () => {
    const formData = new FormData();
    formData.append('id', JSON.stringify(toolsmana.id));
    formData.append('title', toolsmana.title);

    ToolsManaService.update(formData)
      .then((response: any) => {
        history.push(PATH_NAME.TOOLSMANAGES_LIST);
      })
      .catch((e: Error) => {});
  };

  return (
    <>
      <Grid container alignItems="center">
        <Grid item sm={12}>
          <h2>Edit Tools Manages {toolsmana.title}</h2>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <h4>Title</h4>
          <TextField fullWidth variant="outlined" label="Title" value={toolsmana.title} onChange={handleChange} name="title" />
        </Grid>
      </Grid>
      <br />
      <br />
      <Grid container spacing={2}>
        <br />
        <Grid container item sm={12} md={12} justify="flex-end">
          <Button variant="outlined" color="primary" className="mr-20" onClick={() => history.push('/toolsmanages/list/')}>
            Cancel
          </Button>
          <Button color="primary" variant="contained" onClick={updateToolsMana}>
            Update
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ToolsManaEdit;
