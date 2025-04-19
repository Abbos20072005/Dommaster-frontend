type FilterType = 'CHECKBOX' | 'RADIO' | 'SLIDER';

interface Filter {
  filter_items: FilterItem[];
  from?: number | null;
  name: string;
  request_var: string;
  to?: number | null;
  type: FilterType;
}

interface FilterItem {
  count?: number;
  label: string;
  swatch_data?: null;
  value: string;
}
