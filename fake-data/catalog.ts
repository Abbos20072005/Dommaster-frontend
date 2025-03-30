export const catalogData: Catalog[] = [
  {
    id: 1,
    title: 'Стройматериалы',
    breadcrumbs: [
      {
        id: 1,
        title: 'Стройматериалы',
        url: '/catalog/1'
      },
      {
        id: 12,
        title: 'Окна и комплектующие',
        url: '/catalog/12'
      }
    ],
    productQty: 10020,
    children: [
      {
        id: 12,
        title: 'Окна и комплектующие',
        productQty: 10,
        children: [
          {
            id: 100,
            title: 'Кирпич',
            children: [],
            productQty: 10
          },
          {
            id: 101,
            title: 'Электрика и свет',
            children: [],
            productQty: 14
          }
        ]
      },
      {
        id: 10,
        title: 'Стеновые и фасадные',
        productQty: 10,
        children: []
      },
      {
        id: 14,
        title: 'Стеновые и материалы',
        productQty: 10,
        children: [
          {
            id: 100,
            title: 'Кирпич',
            children: [],
            productQty: 10
          },
          {
            id: 102,
            title: 'Строительные блоки',
            children: [],
            productQty: 14
          }
        ]
      },
      {
        id: 15,
        title: 'Стеновые фасадные',
        productQty: 10,
        children: [
          {
            id: 100,
            title: 'Кирпич',
            children: [],
            productQty: 10
          },
          {
            id: 101,
            title: 'Строительные hello',
            children: [],
            productQty: 14
          },
          {
            id: 102,
            title: 'Строительные блоки',
            children: [],
            productQty: 14
          }
        ]
      },
      {
        id: 16,
        title: 'Стеновые и материалы',
        productQty: 10,
        children: [
          {
            id: 100,
            title: 'Кирпич',
            children: [],
            productQty: 10
          },
          {
            id: 101,
            title: 'Строительные блоки ello of course',
            children: [],
            productQty: 14
          },
          {
            id: 102,
            title: 'Строительные блоки',
            children: [],
            productQty: 14
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Инструмент',
    breadcrumbs: [
      {
        id: 1,
        title: 'Стройматериалы',
        url: '/catalog/1'
      },
      {
        id: 12,
        title: 'Окна и комплектующие',
        url: '/catalog/12'
      }
    ],
    productQty: 2000,
    children: [
      {
        id: 20,
        title: 'Ручной инструмент',
        productQty: 10,
        children: [
          {
            id: 200,
            title: 'Зажимные инструменты и устройства',
            children: [],
            productQty: 10
          },
          {
            id: 201,
            title: 'Строительные блоки',
            children: [],
            productQty: 14
          }
        ]
      }
    ]
  },
  {
    id: 21,
    title: 'Строительные блоки',
    breadcrumbs: [
      {
        id: 1,
        title: 'Стройматериалы',
        url: '/catalog/1'
      },
      {
        id: 12,
        title: 'Окна и комплектующие',
        url: '/catalog/12'
      }
    ],
    productQty: 2000,
    children: [
      {
        id: 20,
        title: 'Ручной инструмент',
        productQty: 10,
        children: [
          {
            id: 200,
            title: 'Зажимные инструменты и устройства',
            children: [],
            productQty: 10
          },
          {
            id: 201,
            title: 'Строительные блоки',
            children: [],
            productQty: 14
          }
        ]
      }
    ]
  }
];
