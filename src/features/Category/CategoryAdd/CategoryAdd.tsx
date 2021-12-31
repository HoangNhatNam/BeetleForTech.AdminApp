import React, { useState, ChangeEvent } from 'react';

import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '@pathofdev/react-tag-input/build/index.css';
import { useHistory } from 'react-router-dom';
import { PATH_NAME } from 'configs';
import CategoryService from 'services/CategoryService';
import ICategoryCreate from 'models/category/ICategoryCreate';

function CategoryAdd() {
  const initCategoryState = {
    name: '',
  };
  const history = useHistory();
  const [category, setCategory] = useState<ICategoryCreate>(initCategoryState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const saveToolsManages = () => {
    const formData = new FormData();
    formData.append('name', category.name);

    CategoryService.create(formData)
      .then((response: any) => {
        history.push(PATH_NAME.CATEGORY_LIST);
      })
      .catch((e: Error) => {});
  };

  return (
    <>
      <Grid container alignItems="center">
        <Grid item sm={12}>
          <h2>Add Category</h2>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <h4>Title</h4>
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
          <Button color="primary" variant="contained" onClick={saveToolsManages}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default CategoryAdd;
