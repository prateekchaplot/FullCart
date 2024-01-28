export interface FormData {
  name: string;
  value: string;
  type: FormItemType;
}

export enum FormItemType {
  TEXT,
  IMAGE
}

export interface FormDialogData {
  title: string;
  btnLabel: string;
  formData: FormData[];
}