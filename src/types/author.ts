export interface IAuthorState {
  selected: IAuthor;
  list: IAuthor[];
}

export interface IAuthor {
  id: number;
  name: string;
}
