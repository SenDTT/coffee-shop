export interface Product {
  _id: string;
  name: string;
  price: number;
  sku: string;
  description: string;
  category: Category;
  stock: number;
  images: string[];
  active: number;
  createdAt: string;
  updatedAt: string;
  material: string;
  __v?: number;
}

export interface Category {
  _id: string;
  name: string;
  description: string;
}

export type AdminFormProps = {
  fields: AdminFormFieldWithValue[];
  submitText: string;
  cancelText?: string;
  cancelUrl: string;
  className?: string;
  loading?: boolean;
  error?: string;
  setErrors?: (e: Record<string, string>) => void;
  success?: string;
  successMessage?: string;
  errorMessage?: string;
  isShowButton?: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export type AdminFormField = {
  name: string;
  label: string;
  type: string;
  prefix?: string;
  placeholder?: string;
  required?: boolean;
  options?: SelectOption[];
};

export type SelectOption = { value: string; label: string };

export type InputEvent =
  | React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  | { target: { name: string; value: string | string[] | any | any[] } };

export type AdminFormFieldWithValue = AdminFormField & {
  value: string | number | string[] | Date | boolean;
  onChange: (e: InputEvent) => void;
  fetchOptionsAPI?: (
    search: string,
    page: number
  ) => Promise<FetchOptionsResponse>;
  error?: string;
  success?: string;
  touched?: boolean;
  onBlur?: (e: InputEvent) => void;
  disabled?: boolean;
  multiple?: boolean;
  accept?: string;
  maxLength?: number;
  min?: number;
  max?: number;
  step?: number;
  pattern?: string;
  className?: string;
  autoComplete?: string;
  rows?: number;
  cols?: number;
  readOnly?: boolean;
  autoFocus?: boolean;
  onSelect?: (e: SelectOption) => void;
  validate?: (value: string | number | string[] | Date | boolean) => string;
  images?: string,
  setDeletedImagePaths?: (paths: string[]) => void
};

export type FetchOptionsResponse = {
  data: SelectOption[];
  nextPage: number | null;
};

export interface GetListParams {
  limit: number;
  skip: number;
  search?: string;
}

export interface CategoryParams extends GetListParams {
  type: "product" | "blog" | "ingredient";
}

export type AdminTableProps<T extends object> = {
  columns: string[]; // supports dot notation like "category.name"
  rows: T[];
  headers: string[];
  showCheckbox?: boolean;
  hasActionsCol?: boolean;
  deleteHandle?: (id: string) => void;
  editHandle?: (id: string) => void;
  viewHandle?: (id: string) => void;
  totalRecords: number;
  currentPage: number;
  pageSize?: number; // default: 10
  onPageChange: (newPage: number) => void; // handler to trigger new fetch
  onShowDeleteMultipleHandle?: (value: boolean) => void;
  loading: boolean;
  selectedIds: Set<string>;
  setSelectedIds: (ids: Set<string>) => void;
  activeHandle?: (id: string) => void
};
