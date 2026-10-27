/** PRO customer: projects (a house, an office) and what was bought for each (BLD-295). */
type ProProjectStatus = 'active' | 'archived';

interface ProProject {
  id: number;
  name: string;
  address: string;
  comment: string;
  status: ProProjectStatus;
  archived_at: string | null;
  items_count: number;
  orders_count: number;
  created_at: string;
  updated_at: string;
}

interface ProProjectRequest {
  name: string;
  address?: string;
  comment?: string;
}

/** money comes as strings with 2 decimals */
interface ProTotals {
  goods: string;
  delivery: string;
  total: string;
  orders_count: number;
  items_count: number;
}

interface ProProjectSummary {
  project: ProProject;
  totals: ProTotals;
  categories: { id: number | null; name: string; goods: string }[];
}

interface ProDashboard {
  totals: ProTotals;
  projects: (Pick<ProProject, 'id' | 'name' | 'status'> & ProTotals)[];
  categories: { id: number | null; name: string; goods: string }[];
}

interface ProProjectItem {
  id: number;
  order_id: number;
  order_created_at: string;
  product: { id: number; name: string; image: string | null; slug?: string };
  category: { id: number; name: string } | null;
  quantity: number;
  unit_price: string;
  amount: string;
  discount: string;
  goods: string;
  delivery: string;
  total: string;
}

interface ProLinkRequest {
  project_id: number;
  /** no `item_ids` = every item of the order */
  item_ids?: number[];
  /** move the items that are already in another project */
  force?: boolean;
}

interface ProUnlinkRequest {
  item_ids?: number[];
}

interface ProLinkResult {
  id: number;
  order_items: {
    id: number;
    product_id: number;
    quantity: number;
    project: { id: number; name: string } | null;
  }[];
}

interface ProUnlinkedOrder {
  id: number;
  status: number;
  payment_status: number;
  total_price: number | string;
  created_at: string;
  items_count: number;
  unlinked_items_count: number;
}

type ProProjectsResponse = ApiResponse<ProProject[]>;
type ProProjectResponse = ApiResponse<ProProject>;
type ProProjectSummaryResponse = ApiResponse<ProProjectSummary>;
type ProProjectItemsResponse = ApiResponse<Pagination<ProProjectItem>>;
type ProDashboardResponse = ApiResponse<ProDashboard>;
type ProLinkResponse = ApiResponse<ProLinkResult>;
type ProUnlinkedOrdersResponse = ApiResponse<Pagination<ProUnlinkedOrder>>;
