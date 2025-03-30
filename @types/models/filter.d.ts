type FilterType = 'CHECKBOX' | 'RADIO' | 'SLIDER';

interface Filter {
  filter_items: FilterItem[];
  has_swatch: boolean;
  is_boolean: boolean;
  max: number | null;
  min: number | null;
  name: string;
  position: number;
  request_var: string;
  type: FilterType;
}

interface FilterItem {
  count: number;
  hruValue: null;
  label: string;
  swatch_data: null;
  value_string: string;
}
