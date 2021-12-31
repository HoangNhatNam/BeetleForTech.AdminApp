import IToolsManages from 'models/toolsManages/IToolsMana';

export default interface IDemoView {
  id: number;
  firstName: string;
  lastName: string;
  businessEmail: string;
  jobTitle: string;
  annualSpend: string;
  fullName: string;
  toolsManages: IToolsManages[];
}
