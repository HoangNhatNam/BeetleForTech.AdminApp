import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import '@pathofdev/react-tag-input/build/index.css';
import Grid from '@material-ui/core/Grid';
import ManagerService from 'services/ManagerService';
import IManagerView from 'models/manager/IManagerView';
import { HttpConfig } from 'configs';

interface RouterProps {
  id: string;
}

type Props = RouteComponentProps<RouterProps>;

const ManagerDetail: React.FC<Props> = (props: Props) => {
  const initialManagerState = {
    id: 0,
    fullName: '',
    role: '',
    email: '',
    phone: '',
    imagePath: '',
    description: '',
  };
  const [manager, setManager] = useState<IManagerView>(initialManagerState);

  const getManager = (id: number) => {
    ManagerService.get(id)
      .then((response: any) => {
        setManager(response.data);
      })
      .catch((e: Error) => {});
  };

  useEffect(() => {
    const id = Number.parseInt(props.match.params.id, 10);
    getManager(id);
  }, [props.match.params.id]);

  return (
    <>
      <Grid container alignItems="center">
        <Grid item sm={12}>
          <h2>Manager Detail</h2>
        </Grid>
      </Grid>
      <div className="card-body">
        <div className="row" style={{ padding: 0 }}>
          <div className="col-md-8">
            <div className="row" style={{ padding: 0 }}>
              <div className="col-md-3">
                <img src={HttpConfig.BaseURL + manager.imagePath} style={{ height: '150px' }} alt="" />
              </div>
            </div>

            <div className="row" style={{ padding: 0 }}>
              <div className="col-md-3">Full Name:</div>
              <div className="col-md-6">{manager.fullName}</div>
            </div>

            <div className="row" style={{ padding: 0 }}>
              <div className="col-md-3">Role:</div>
              <div className="col-md-6">{manager.role}</div>
            </div>

            <div className="row" style={{ padding: 0 }}>
              <div className="col-md-3">Email:</div>
              <div className="col-md-6">{manager.email}</div>
            </div>

            <div className="row" style={{ padding: 0 }}>
              <div className="col-md-3">Phone:</div>
              <div className="col-md-6">{manager.phone}</div>
            </div>

            <div className="row" style={{ padding: 0 }}>
              <div className="col-md-3">Description:</div>
              <div className="col-md-6">{manager.description}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagerDetail;
