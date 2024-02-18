export interface Form {
  id: number;
  name: string;
  tags: Tag[];
}

export interface CreateNewFormRequest {
  name: string;
  tags: Tag[];
}

export interface Tag {
  name: string;
  choices: string[];
}

export interface Data {
  id: number;
  formId: number;
  date: string;
  tags: Tags;
  value: number;
}

export interface Tags {
  Type: string;
  Zone: string;
}

export enum ButtonType {
  Edit = "Edit",
  Delete = "Delete",
  Add = "Add",
}
