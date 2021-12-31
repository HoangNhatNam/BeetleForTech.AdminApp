import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import '@pathofdev/react-tag-input/build/index.css';
import DemoService from 'services/DemoService';
import IDemoView from 'models/demo/IDemoView';
import Grid from '@material-ui/core/Grid';

interface RouterProps {
  id: string;
}

type Props = RouteComponentProps<RouterProps>;

const DemoDetail: React.FC<Props> = (props: Props) => {
  const initialDemoState = {
    id: 0,
    firstName: '',
    lastName: '',
    businessEmail: '',
    jobTitle: '',
    annualSpend: '',
    fullName: '',
    toolsManages: [],
  };
  const [currentDemo, setCurrenDemo] = useState<IDemoView>(initialDemoState);

  const getDemo = (id: number) => {
    DemoService.get(id)
      .then((response: any) => {
        setCurrenDemo(response.data);
      })
      .catch((e: Error) => {});
  };

  useEffect(() => {
    const id = Number.parseInt(props.match.params.id, 10);
    getDemo(id);
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
              <div className="col-md-6">{currentDemo.fullName}</div>
            </div>
            <div className="row" style={{ padding: 0 }}>
              <div className="col-md-3">Last Name:</div>
              <div className="col-md-6">{currentDemo.lastName}</div>
            </div>
            <div className="row" style={{ padding: 0 }}>
              <div className="col-md-3">First Name:</div>
              <div className="col-md-6">{currentDemo.firstName}</div>
            </div>
            <div className="row" style={{ padding: 0 }}>
              <div className="col-md-3">Business Email:</div>
              <div className="col-md-6">{currentDemo.businessEmail}</div>
            </div>
            <div className="row" style={{ padding: 0 }}>
              <div className="col-md-3">Job Title:</div>
              <div className="col-md-6">{currentDemo.jobTitle}</div>
            </div>
            <div className="row" style={{ padding: 0 }}>
              <div className="col-md-3">Annual Spend:</div>
              <div className="col-md-6">{currentDemo.annualSpend}</div>
            </div>
            <div className="row" style={{ padding: 0 }}>
              <div className="col-md-3">Tools Manages:</div>
              <div className="col-md-6">
                {currentDemo.toolsManages.map((item, idx) => (
                  <div key={idx}>{item.title}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DemoDetail;
