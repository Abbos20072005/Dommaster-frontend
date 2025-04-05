export const categoryData: Category[] = Array.from({ length: 10 }, (_, i) => {
  const parentId = i + 1;
  return {
    id: parentId,
    title: `Category ${parentId}`,
    productQty: Math.floor(Math.random() * 100),
    image: `https://picsum.photos/seed/${parentId}/200/200`,
    breadcrumbs: [
      {
        id: parentId,
        title: `Category ${parentId}`,
        url: null
      }
    ],
    children: Array.from({ length: 10 }, (_, j) => {
      const childId = parentId * 10 + j + 1;
      return {
        id: childId,
        title: `Subcategory ${childId}`,
        productQty: Math.floor(Math.random() * 50),
        image: `https://picsum.photos/seed/${childId}/200/200`,
        breadcrumbs: [
          {
            id: parentId,
            title: `Category ${parentId}`,
            url: `/category/${parentId}`
          },
          {
            id: childId,
            title: `Subcategory ${childId}`,
            url: null
          }
        ],
        children: Array.from({ length: 10 }, (_, k) => {
          const subChildId = childId * 10 + k + 1;
          return {
            id: subChildId,
            title: `Sub-Subcategory ${subChildId}`,
            productQty: Math.floor(Math.random() * 20),
            image: `https://picsum.photos/seed/${subChildId}/200/200`,
            breadcrumbs: [
              {
                id: parentId,
                title: `Category ${parentId}`,
                url: `/category/${parentId}`
              },
              {
                id: childId,
                title: `Subcategory ${childId}`,
                url: `/category/${childId}`
              },
              {
                id: subChildId,
                title: `Sub-Subcategory ${subChildId}`,
                url: null
              }
            ],
            children: []
          };
        })
      };
    })
  };
});
