import ITag from './tag/ITag';

export default interface IPostView {
  id: number;
  title: string;
  content: string;
  dateCreated: Date;
  imagePath: string;
  fullName: string;
  email: string;
  name: string;
  tags: ITag[];
}
