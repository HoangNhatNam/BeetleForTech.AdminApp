import React, { useState, ChangeEvent, useEffect } from 'react';

import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '@pathofdev/react-tag-input/build/index.css';
import CategoryService from 'services/CategoryService';
import ICategoryUpdate from 'models/category/ICategoryUpdate';
import { useHistory, RouteComponentProps } from 'react-router-dom';
import { PATH_NAME } from 'configs';

interface RouterProps {
  id: string;
}

type Props = RouteComponentProps<RouterProps>;

const UserEdit: React.FC<Props> = (props: Props) => {
  const initCategoryState = {
    id: 0,
    name: '',
  };
  const history = useHistory();
  const [category, setCategory] = useState<ICategoryUpdate>(initCategoryState);

  const getCategory = (id: string) => {
    CategoryService.get(id)
      .then((response: any) => {
        setCategory(response.data);
      })
      .catch((e: Error) => {});
  };

  useEffect(() => {
    getCategory(props.match.params.id);
  }, [props.match.params.id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const updateCategory = () => {
    const formData = new FormData();
    formData.append('id', JSON.stringify(category.id));
    formData.append('name', category.name);

    CategoryService.update(formData)
      .then((response: any) => {
        history.push(PATH_NAME.CATEGORY_LIST);
      })
      .catch((e: Error) => {});
  };

  return (
    <>
      <Grid container alignItems="center">
        <Grid item sm={12}>
          <h2>Edit Category</h2>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <h4>Name</h4>
          <TextField fullWidth variant="outlined" label="Title" value={category.name} onChange={handleChange} name="name" />
        </Grid>
      </Grid>
      <br />
      <br />
      <Grid container spacing={2}>
        <br />
        <Grid container item sm={12} md={12} justify="flex-end">
          <Button variant="outlined" color="primary" className="mr-20" onClick={() => history.push('/category/list/')}>
            Cancel
          </Button>
          <Button color="primary" variant="contained" onClick={updateCategory}>
            Update
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default UserEdit;
