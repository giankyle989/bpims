export type RecordsRow = {
  name: string;
  email: string;
  role: string;
};

export type TableCols<T> = {
  key: keyof T;
  label: string;
};
