export interface DrawerData {
  name: string;
  value: string;
  type: DrawerDataType;
}

export enum DrawerDataType {
  TEXT,
  IMAGE
}