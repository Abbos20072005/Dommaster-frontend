import { useQuery } from '@tanstack/react-query';

import { Skeleton } from '@/components/ui/skeleton';
import { getCategoryById } from '@/utils/api/requests';

import { ItemCategories } from './ItemCategories';

interface Props {
  categoryId: number;
  onClose: () => void;
}

const COLUMN_COUNT = 3;
const SUB_CATEGORY_SKELETON_COUNT = 50;

const distributeSubCategories = (subCategories: SubCategory[], columnCount: number) => {
  return Array.from({ length: columnCount }).map((_, i) => {
    const start = Math.ceil((i * subCategories.length) / columnCount);
    const end = Math.ceil(((i + 1) * subCategories.length) / columnCount);
    return subCategories.slice(start, end);
  });
};

const SubCategoriesSkeleton = () => (
  <div className='grid h-fit w-full flex-1 grid-cols-2 grid-rows-1 gap-4 lg:grid-cols-3'>
    {Array.from({ length: COLUMN_COUNT }).map((_, columnIndex) => (
      <div key={columnIndex} className='h-fit space-y-4'>
        {Array.from({ length: Math.ceil(SUB_CATEGORY_SKELETON_COUNT / COLUMN_COUNT) }).map(
          (_, itemIndex) => (
            <div key={itemIndex} className='space-y-2'>
              <div className='flex items-center gap-2'>
                <Skeleton className='h-4 w-4' />
                <Skeleton className='h-4 flex-1' />
              </div>
            </div>
          )
        )}
      </div>
    ))}
  </div>
);

export const SubCategories = ({ categoryId, onClose }: Props) => {
  const getSubCategoriesQuery = useQuery({
    queryKey: ['categories', categoryId],
    queryFn: () => getCategoryById({ id: categoryId })
  });

  const category = getSubCategoriesQuery.data?.data.result;

  if (getSubCategoriesQuery.isPending) {
    return <SubCategoriesSkeleton />;
  }

  if (!category || !category.sub_categories?.length) {
    return null;
  }

  const distributedCategories = distributeSubCategories(category.sub_categories, COLUMN_COUNT);

  return (
    <div className='grid h-fit flex-1 grid-cols-2 grid-rows-1 gap-4 lg:grid-cols-3'>
      {distributedCategories.map((columnCategories, columnIndex) => (
        <div key={columnIndex} className='h-fit space-y-4'>
          {columnCategories.map((subCategory) => (
            <ItemCategories
              key={subCategory.id}
              categoryId={category.id}
              onClose={onClose}
              subCategory={subCategory}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
