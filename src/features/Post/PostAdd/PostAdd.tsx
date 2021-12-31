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
import IPostCreate from 'models/post/IPostCreate';
import PostService from 'services/PostService';
import ICategoryView from 'models/ICategoryView';
import CategoryService from 'services/CategoryService';
import { IUser } from 'models/IUser';
import UserService from 'services/UserService';
import { useHistory } from 'react-router-dom';
import { PATH_NAME } from 'configs';

function PostAdd() {
  const initPostState = {
    title: '',
    content: '',
    userId: '',
    categoryId: 0,
    name: [],
  };
  const history = useHistory();
  const [post, setPost] = useState<IPostCreate>(initPostState);
  const [categories, setCategories] = useState<Array<ICategoryView>>([]);
  const [fileSelected, setFileSelected] = useState<File>();

  useEffect(() => {
    retrieveCategories();
  }, []);

  const retrieveCategories = () => {
    CategoryService.getAll()
      .then((response: any) => {
        setCategories(response.data);
      })
      .catch((e: Error) => {});
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPost({ ...post, categoryId: event.target.value as number });
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
    formData.append('categoryId', JSON.stringify(post.categoryId));
    post.name.forEach((item) => formData.append('name[]', item));
    if (fileSelected) {
      formData.append('thumbnailImage', fileSelected);
    }

    PostService.create(formData)
      .then((response: any) => {
        history.push(PATH_NAME.POST_LIST);
      })
      .catch((e: Error) => {});
  };

  return (
    <>
      <Grid container alignItems="center">
        <Grid item sm={12}>
          <h2>Add Post</h2>
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

        <Grid item xs={12} md={4}>
          <h4>Category</h4>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="District"
              defaultValue=""
              fullWidth
              name="categoryId"
              onChange={handleCategoryChange}
              value={post.categoryId}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {categories.map((row, idx) => (
                <MenuItem value={row.id} key={idx}>
                  {row.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={12}>
          <h4>Thumbnail Image</h4>
          <input type="file" onChange={handleFileInput} accept="image/*" />
        </Grid>

        <Grid item xs={12} md={12}>
          <h4>Tag</h4>
          <ReactTagInput onChange={(x) => setPost({ ...post, name: x })} tags={post.name} />
        </Grid>
      </Grid>
      <br />
      <br />
      <Grid container spacing={2}>
        <br />
        <Grid container item sm={12} md={12} justify="flex-end">
          <Button variant="outlined" color="primary" className="mr-20" onClick={() => history.push('/product/list/')}>
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

export default PostAdd;
