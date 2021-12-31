import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import PostService from 'services/PostService';
import IPostView from 'models/IPostView';
import '@pathofdev/react-tag-input/build/index.css';
import ICategoryView from 'models/ICategoryView';
import CategoryService from 'services/CategoryService';

interface RouterProps {
  id: string;
}

type Props = RouteComponentProps<RouterProps>;

const PostDetail: React.FC<Props> = (props: Props) => {
  const initialPostState = {
    id: 0,
    title: '',
    content: '',
    dateCreated: new Date(),
    imagePath: '',
    fullName: '',
    email: '',
    name: '',
    tags: [],
  };
  const [currentPost, setCurrentPost] = useState<IPostView>(initialPostState);
  const [categories, setCategories] = useState<Array<ICategoryView>>([]);

  const getPost = (id: number) => {
    PostService.get(id)
      .then((response: any) => {
        setCurrentPost(response.data);
      })
      .catch((e: Error) => {});
  };

  useEffect(() => {
    const id = Number.parseInt(props.match.params.id, 10);
    getPost(id);
    retrieve();
  }, [props.match.params.id]);

  const retrieve = () => {
    CategoryService.getAll()
      .then((response: any) => {
        setCategories(response.data);
      })
      .catch((e: Error) => {});
  };

  return (
    <>
      <header className="header" style={{ backgroundImage: `url(https://localhost:44311/${currentPost.imagePath})` }}>
        <div className="container">
          <h1 className="hestia-title">{currentPost.title}</h1>
          <h4 className="author">
            Published by
            <strong>{` ${currentPost.fullName} `}</strong>
            on{' '}
            {new Intl.DateTimeFormat('en-GB', {
              month: 'long',
              day: '2-digit',
              year: 'numeric',
            }).format(new Date(currentPost.dateCreated))}
          </h4>
        </div>
        <div className="gradient" />
      </header>
      <div className="main-raised">
        <div className="container-post">
          <div className="row">
            <div className="col-md-8">
              <div className="single-post-wrap">
                <div dangerouslySetInnerHTML={{ __html: currentPost.content }} />
              </div>
              <div className="section-post-info">
                <div className="row-post-info">
                  <div className="col-md-8">
                    <div className="entry-categories">
                      Categories:
                      <span>{currentPost.name}</span>
                    </div>
                    <div className="entry-tags">
                      Tags:
                      {currentPost.tags.map((row, idx) => (
                        <span key={idx}>{row.name}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            </div>
            <div className="col-md-3">
              <aside>
                <h5>Category</h5>
                <ul>
                  {categories.map((row, idx) => (
                    <li key={idx}>
                      <a>{row.name}</a>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetail;
