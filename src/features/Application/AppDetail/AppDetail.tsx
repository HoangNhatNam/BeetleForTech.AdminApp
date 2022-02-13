import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import '@pathofdev/react-tag-input/build/index.css';
import ApplicationService from 'services/ApplicationService';
import IApplicationView from 'models/application/IApplicationView';
import { HttpConfig } from 'configs';

interface RouterProps {
  id: string;
}

type Props = RouteComponentProps<RouterProps>;

const AppDetail: React.FC<Props> = (props: Props) => {
  const initialAppState = {
    id: 0,
    title: '',
    content: '',
    dateCreated: new Date(),
    imagePath: '',
    fullName: '',
    email: '',
  };
  const [currentApp, setCurrentApp] = useState<IApplicationView>(initialAppState);

  const getPost = (id: number) => {
    ApplicationService.get(id)
      .then((response: any) => {
        setCurrentApp(response.data);
      })
      .catch((e: Error) => {});
  };

  useEffect(() => {
    const id = Number.parseInt(props.match.params.id, 10);
    getPost(id);
  }, [props.match.params.id]);

  return (
    <>
      <header className="header" style={{ backgroundImage: `url(${HttpConfig.BaseURL + currentApp.imagePath})` }}>
        <div className="container">
          <h1 className="hestia-title">{currentApp.title}</h1>
          <h4 className="author">
            Published by
            <strong>{` ${currentApp.fullName} `}</strong>
            on{' '}
            {new Intl.DateTimeFormat('en-GB', {
              month: 'long',
              day: '2-digit',
              year: 'numeric',
            }).format(new Date(currentApp.dateCreated))}
          </h4>
        </div>
        <div className="gradient" />
      </header>
      <div className="main-raised">
        <div className="container-post">
          <div className="row">
            <div className="col-md-8">
              <div className="single-post-wrap">
                <div dangerouslySetInnerHTML={{ __html: currentApp.content }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppDetail;
