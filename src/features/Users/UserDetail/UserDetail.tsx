import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import '@pathofdev/react-tag-input/build/index.css';
import ContactService from 'services/ContactService';
import IContactView from 'models/contact/IContactView';
import Grid from '@material-ui/core/Grid';
import { IUser } from 'models/IUser';
import UserService from 'services/UserService';

interface RouterProps {
  id: string;
}

type Props = RouteComponentProps<RouterProps>;

const UserDetail: React.FC<Props> = (props: Props) => {
  const initialUserState = {
    id: '',
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    phoneNumber: '',
    roles: [],
  };
  const [currentUser, setCurrentUser] = useState<IUser>(initialUserState);

  const getUser = (id: string) => {
    UserService.getUserId(id)
      .then((response: any) => {
        setCurrentUser(response.data);
      })
      .catch((e: Error) => {});
  };

  useEffect(() => {
    const id = props.match.params.id.toString();
    getUser(id);
  }, [props.match.params.id]);

  return (
    <>
      <Grid container alignItems="center">
        <Grid item sm={12}>
          <h2>User Detail</h2>
        </Grid>
      </Grid>
      <div className="card-body">
        <div className="row" style={{ padding: 0 }}>
          <div className="col-md-8">
            <div className="row" style={{ padding: 0 }}>
              <div className="col-md-3">Full Name:</div>
              <div className="col-md-6">{currentUser.lastName + currentUser.firstName}</div>
            </div>
            <div className="row" style={{ padding: 0 }}>
              <div className="col-md-3">phoneNumber:</div>
              <div className="col-md-6">{currentUser.phoneNumber}</div>
            </div>
            <div className="row" style={{ padding: 0 }}>
              <div className="col-md-3">userName:</div>
              <div className="col-md-6">{currentUser.userName}</div>
            </div>
            <div className="row" style={{ padding: 0 }}>
              <div className="col-md-3">email:</div>
              <div className="col-md-6">{currentUser.email}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetail;
