import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import '@pathofdev/react-tag-input/build/index.css';
import ContactService from 'services/ContactService';
import IContactView from 'models/contact/IContactView';
import Grid from '@material-ui/core/Grid';

interface RouterProps {
  id: string;
}

type Props = RouteComponentProps<RouterProps>;

const ContactDetail: React.FC<Props> = (props: Props) => {
  const initialContactState = {
    id: 0,
    companyName: '',
    firstName: '',
    lastName: '',
    businessEmail: '',
    jobTitle: '',
    message: '',
    status: 0,
    fullName: '',
  };
  const [currentContact, setCurrentContact] = useState<IContactView>(initialContactState);

  const getContact = (id: number) => {
    ContactService.get(id)
      .then((response: any) => {
        setCurrentContact(response.data);
      })
      .catch((e: Error) => {});
  };

  useEffect(() => {
    const id = Number.parseInt(props.match.params.id, 10);
    getContact(id);
  }, [props.match.params.id]);

  return (
    <>
      <Grid container alignItems="center">
        <Grid item sm={12}>
          <h2>Contact Detail</h2>
        </Grid>
      </Grid>
      <div className="card-body">
        <div className="row" style={{ padding: 0 }}>
          <div className="col-md-8">
            <div className="row" style={{ padding: 0 }}>
              <div className="col-md-3">Full Name:</div>
              <div className="col-md-6">{currentContact.fullName}</div>
            </div>
            <div className="row" style={{ padding: 0 }}>
              <div className="col-md-3">Last Name:</div>
              <div className="col-md-6">{currentContact.lastName}</div>
            </div>
            <div className="row" style={{ padding: 0 }}>
              <div className="col-md-3">First Name:</div>
              <div className="col-md-6">{currentContact.firstName}</div>
            </div>
            <div className="row" style={{ padding: 0 }}>
              <div className="col-md-3">Company Name:</div>
              <div className="col-md-6">{currentContact.companyName}</div>
            </div>
            <div className="row" style={{ padding: 0 }}>
              <div className="col-md-3">Business Email:</div>
              <div className="col-md-6">{currentContact.businessEmail}</div>
            </div>
            <div className="row" style={{ padding: 0 }}>
              <div className="col-md-3">Job Title:</div>
              <div className="col-md-6">{currentContact.jobTitle}</div>
            </div>
            <div className="row" style={{ padding: 0 }}>
              <div className="col-md-3">Message:</div>
              <div className="col-md-6">{currentContact.message}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactDetail;
