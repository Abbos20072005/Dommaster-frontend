export const productsData: Product[] = [
  {
    id: 1,
    title: 'Мойка для кухни Granula Standard 50х42х19 см врезная кварц белая',
    price: 5000,
    discount_price: null,
    discount: null,
    product_count: 10,
    images: [
      'https://cs.p-static.ru/image/2125615/original-227x227-fit.jpg',
      'https://cs.p-static.ru/image/2023535/original-227x227-fit.jpg',
      'https://cs.p-static.ru/image/2023462/original-227x227-fit.jpg'
    ],
    isInFavorites: true,
    questions: [
      {
        id: 1,
        author: {
          id: 1,
          email: 'example@google.com',
          full_name: 'John',
          phone_number: '1234567890'
        },
        published_at: '2022-12-13T14:06:10.157+03:00',
        question: 'Какой размер мойки?'
      },
      {
        id: 1,
        author: {
          id: 1,
          email: 'example@google.com',
          full_name: 'John',
          phone_number: '1234567890'
        },
        published_at: '2022-12-13T14:06:10.157+03:00',
        question: 'Какой размер мойки?'
      }
    ],
    reviews: [
      {
        id: 1,
        rating: 4.5,
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, voluptates.',
        author: {
          id: 1,
          email: 'example@google.com',
          full_name: 'John',
          phone_number: '1234567890'
        },
        images: [
          'https://media.apltcdn.com/media_files/660a/82a7/a5ab/7500/14ff/5218/large.jpg?1711964838',
          'https://media.apltcdn.com/media_files/660a/82a7/a5ab/7500/14ff/5218/large.jpg?1711964838'
        ],
        published_at: '2022-12-13T14:06:10.157+03:00'
      },
      {
        id: 2,
        rating: 4,
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, voluptates.',
        author: {
          id: 2,
          email: 'example@google.com',
          full_name: 'John',
          phone_number: '1234567890'
        },
        images: [],
        published_at: '2022-12-13T14:06:10.157+03:00'
      }
    ],
    description: {
      description: 'Предназначена для подвесных унитазов.',
      properties: [
        {
          key: 'Преимущества',
          value: '',
          values: [
            'Стальная рама с антикоррозийным покрытием. ',
            'Расчетная нагрузка до 400 кг. ',
            'Ножки с регулировкой высоты. ',
            'Межосевое расстояние под крепежные шпильки унитаза 18 и 23 см. ',
            'Бачок с функцией шумоподавления. ',
            'Двухрежимная кнопка смыва, надежное гальваническое покрытие. ',
            'Эконом слив – 3 литра, полный слив настраивается от 5,5 до 8,5 литров. ',
            'Монтажный кнопочный узел, полный комплект патрубков, лекала для монтажа отверстий.'
          ]
        },
        {
          key: 'Комплектация',
          value: '',
          values: [
            'унитаз  – санфарфор, сиденье  – полипропилен микролифт;',
            'крепеж для унитаза;',
            'крепежи для рамы;',
            'подсоединения входящей и сливной труб;',
            'сливной патрубок (колено) с адаптером d90/110 мм.'
          ]
        }
      ]
    },
    extended_description: {
      description: 'Предназначена для подвесных унитазов.',
      properties: [
        {
          key: 'Преимущества',
          value: '',
          values: [
            'Стальная рама с антикоррозийным покрытием. ',
            'Расчетная нагрузка до 400 кг. ',
            'Ножки с регулировкой высоты. ',
            'Межосевое расстояние под крепежные шпильки унитаза 18 и 23 см. ',
            'Бачок с функцией шумоподавления. ',
            'Двухрежимная кнопка смыва, надежное гальваническое покрытие. ',
            'Эконом слив – 3 литра, полный слив настраивается от 5,5 до 8,5 литров. ',
            'Монтажный кнопочный узел, полный комплект патрубков, лекала для монтажа отверстий.'
          ]
        },
        {
          key: 'Комплектация',
          value: '',
          values: [
            'унитаз  – санфарфор, сиденье  – полипропилен микролифт;',
            'крепеж для унитаза;',
            'крепежи для рамы;',
            'подсоединения входящей и сливной труб;',
            'сливной патрубок (колено) с адаптером d90/110 мм.'
          ]
        }
      ]
    },
    rating: 4.5,
    reviews_count: 10,
    cover_image: 'https://cs.p-static.ru/image/2125615/original-227x227-fit.jpg',
    properties: [
      {
        title: 'Артикул',
        value: [{ title: '153.741', link: null }]
      },
      {
        title: 'Тип товара',
        value: [{ title: 'Штора', link: '/catalog/957453/?brend=decofest' }]
      },
      {
        title: 'Бренд',
        value: [{ title: 'Decofest', link: '/catalog/957453/?brend=decofest' }]
      },
      {
        title: 'Коллекция',
        value: [{ title: 'Сола', link: '/catalog/957453/?kollekciya=sola' }]
      },
      {
        title: 'Страна-производитель',
        value: [{ title: 'Китай', link: null }]
      },
      {
        title: 'Высота, cm',
        value: [{ title: '280', link: null }]
      }
    ],
    categories: [
      {
        id: 1,
        title: 'Category 1',
        productQty: 10,
        breadcrumbs: [],
        image: '',
        children: []
      }
    ],
    breadcrumbs: [
      {
        id: 1,
        url: 'https://example.com',
        title: 'Товары для дома'
      },
      {
        id: 2,
        url: 'https://example.com',
        title: 'Текстиль для дома'
      },
      {
        id: 3,
        url: 'https://example.com',
        title: 'Постельное белье'
      }
    ]
  },
  {
    id: 2,
    title: 'Мойка для кухни Granula Standard 50х42х19 см врезная кварц белая',
    price: 10000,
    discount_price: null,
    discount: null,
    isInFavorites: false,
    product_count: 10,
    images: [
      'https://cs.p-static.ru/image/2125615/original-227x227-fit.jpg',
      'https://cs.p-static.ru/image/2023535/original-227x227-fit.jpg',
      'https://cs.p-static.ru/image/2023462/original-227x227-fit.jpg'
    ],
    questions: [
      {
        id: 1,
        author: {
          id: 1,
          email: 'example@google.com',
          full_name: 'John',
          phone_number: '1234567890'
        },
        published_at: '2022-12-13T14:06:10.157+03:00',
        question: 'Какой размер мойки?'
      },
      {
        id: 1,
        author: {
          id: 1,
          email: 'example@google.com',
          full_name: 'John',
          phone_number: '1234567890'
        },
        published_at: '2022-12-13T14:06:10.157+03:00',
        question: 'Какой размер мойки?'
      }
    ],
    reviews: [
      {
        id: 1,
        rating: 4.5,
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, voluptates.',
        author: {
          id: 1,
          email: 'example@google.com',
          full_name: 'John',
          phone_number: '1234567890'
        },
        images: [
          'https://media.apltcdn.com/media_files/660a/82a7/a5ab/7500/14ff/5218/large.jpg?1711964838',
          'https://media.apltcdn.com/media_files/660a/82a7/a5ab/7500/14ff/5218/large.jpg?1711964838'
        ],
        published_at: '2022-12-13T14:06:10.157+03:00'
      },
      {
        id: 2,
        rating: 4,
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, voluptates.',
        author: {
          id: 2,
          email: 'example@google.com',
          full_name: 'John',
          phone_number: '1234567890'
        },
        images: [],
        published_at: '2022-12-13T14:06:10.157+03:00'
      }
    ],
    description: {
      description: 'Предназначена для подвесных унитазов.',
      properties: [
        {
          key: 'Преимущества',
          value: '',
          values: [
            'Стальная рама с антикоррозийным покрытием. ',
            'Расчетная нагрузка до 400 кг. ',
            'Ножки с регулировкой высоты. ',
            'Межосевое расстояние под крепежные шпильки унитаза 18 и 23 см. ',
            'Бачок с функцией шумоподавления. ',
            'Двухрежимная кнопка смыва, надежное гальваническое покрытие. ',
            'Эконом слив – 3 литра, полный слив настраивается от 5,5 до 8,5 литров. ',
            'Монтажный кнопочный узел, полный комплект патрубков, лекала для монтажа отверстий.'
          ]
        },
        {
          key: 'Комплектация',
          value: '',
          values: [
            'унитаз  – санфарфор, сиденье  – полипропилен микролифт;',
            'крепеж для унитаза;',
            'крепежи для рамы;',
            'подсоединения входящей и сливной труб;',
            'сливной патрубок (колено) с адаптером d90/110 мм.'
          ]
        }
      ]
    },
    extended_description: {
      description: 'Предназначена для подвесных унитазов.',
      properties: [
        {
          key: 'Преимущества',
          value: '',
          values: [
            'Стальная рама с антикоррозийным покрытием. ',
            'Расчетная нагрузка до 400 кг. ',
            'Ножки с регулировкой высоты. ',
            'Межосевое расстояние под крепежные шпильки унитаза 18 и 23 см. ',
            'Бачок с функцией шумоподавления. ',
            'Двухрежимная кнопка смыва, надежное гальваническое покрытие. ',
            'Эконом слив – 3 литра, полный слив настраивается от 5,5 до 8,5 литров. ',
            'Монтажный кнопочный узел, полный комплект патрубков, лекала для монтажа отверстий.'
          ]
        },
        {
          key: 'Комплектация',
          value: '',
          values: [
            'унитаз  – санфарфор, сиденье  – полипропилен микролифт;',
            'крепеж для унитаза;',
            'крепежи для рамы;',
            'подсоединения входящей и сливной труб;',
            'сливной патрубок (колено) с адаптером d90/110 мм.'
          ]
        }
      ]
    },
    rating: 4.5,
    reviews_count: 10,
    cover_image: 'https://cs.p-static.ru/image/2125615/original-227x227-fit.jpg',
    properties: [
      {
        title: 'Артикул',
        value: [{ title: '153.741', link: null }]
      },
      {
        title: 'Тип товара',
        value: [{ title: 'Штора', link: '/catalog/957453/?brend=decofest' }]
      },
      {
        title: 'Бренд',
        value: [{ title: 'Decofest', link: '/catalog/957453/?brend=decofest' }]
      },
      {
        title: 'Коллекция',
        value: [{ title: 'Сола', link: '/catalog/957453/?kollekciya=sola' }]
      },
      {
        title: 'Страна-производитель',
        value: [{ title: 'Китай', link: null }]
      },
      {
        title: 'Высота, cm',
        value: [{ title: '280', link: null }]
      }
    ],
    categories: [
      {
        id: 1,
        title: 'Category 1',
        productQty: 10,
        breadcrumbs: [],
        image: '',
        children: []
      }
    ],
    breadcrumbs: [
      {
        id: 1,
        url: 'https://example.com',
        title: 'Товары для дома'
      },
      {
        id: 2,
        url: 'https://example.com',
        title: 'Текстиль для дома'
      },
      {
        id: 3,
        url: 'https://example.com',
        title: 'Постельное белье'
      }
    ]
  },
  {
    id: 3,
    title: 'Мойка для кухни Granula Standard 50х42х19 см врезная кварц белая',
    price: 10000,
    discount_price: 8000,
    discount: 20,
    isInFavorites: false,
    product_count: 10,
    images: [
      'https://cs.p-static.ru/image/2125615/original-227x227-fit.jpg',
      'https://cs.p-static.ru/image/2023535/original-227x227-fit.jpg',
      'https://cs.p-static.ru/image/2023462/original-227x227-fit.jpg'
    ],
    questions: [
      {
        id: 1,
        author: {
          id: 1,
          email: 'example@google.com',
          full_name: 'John',
          phone_number: '1234567890'
        },
        published_at: '2022-12-13T14:06:10.157+03:00',
        question: 'Какой размер мойки?'
      },
      {
        id: 1,
        author: {
          id: 1,
          email: 'example@google.com',
          full_name: 'John',
          phone_number: '1234567890'
        },
        published_at: '2022-12-13T14:06:10.157+03:00',
        question: 'Какой размер мойки?'
      }
    ],
    reviews: [
      {
        id: 1,
        rating: 4.5,
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, voluptates.',
        author: {
          id: 1,
          email: 'example@google.com',
          full_name: 'John',
          phone_number: '1234567890'
        },
        images: [
          'https://media.apltcdn.com/media_files/660a/82a7/a5ab/7500/14ff/5218/large.jpg?1711964838',
          'https://media.apltcdn.com/media_files/660a/82a7/a5ab/7500/14ff/5218/large.jpg?1711964838'
        ],
        published_at: '2022-12-13T14:06:10.157+03:00'
      },
      {
        id: 2,
        rating: 4,
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, voluptates.',
        author: {
          id: 2,
          email: 'example@google.com',
          full_name: 'John',
          phone_number: '1234567890'
        },
        images: [],
        published_at: '2022-12-13T14:06:10.157+03:00'
      }
    ],
    description: {
      description: 'Предназначена для подвесных унитазов.',
      properties: [
        {
          key: 'Преимущества',
          value: '',
          values: [
            'Стальная рама с антикоррозийным покрытием. ',
            'Расчетная нагрузка до 400 кг. ',
            'Ножки с регулировкой высоты. ',
            'Межосевое расстояние под крепежные шпильки унитаза 18 и 23 см. ',
            'Бачок с функцией шумоподавления. ',
            'Двухрежимная кнопка смыва, надежное гальваническое покрытие. ',
            'Эконом слив – 3 литра, полный слив настраивается от 5,5 до 8,5 литров. ',
            'Монтажный кнопочный узел, полный комплект патрубков, лекала для монтажа отверстий.'
          ]
        },
        {
          key: 'Комплектация',
          value: '',
          values: [
            'унитаз  – санфарфор, сиденье  – полипропилен микролифт;',
            'крепеж для унитаза;',
            'крепежи для рамы;',
            'подсоединения входящей и сливной труб;',
            'сливной патрубок (колено) с адаптером d90/110 мм.'
          ]
        }
      ]
    },
    extended_description: {
      description: 'Предназначена для подвесных унитазов.',
      properties: [
        {
          key: 'Преимущества',
          value: '',
          values: [
            'Стальная рама с антикоррозийным покрытием. ',
            'Расчетная нагрузка до 400 кг. ',
            'Ножки с регулировкой высоты. ',
            'Межосевое расстояние под крепежные шпильки унитаза 18 и 23 см. ',
            'Бачок с функцией шумоподавления. ',
            'Двухрежимная кнопка смыва, надежное гальваническое покрытие. ',
            'Эконом слив – 3 литра, полный слив настраивается от 5,5 до 8,5 литров. ',
            'Монтажный кнопочный узел, полный комплект патрубков, лекала для монтажа отверстий.'
          ]
        },
        {
          key: 'Комплектация',
          value: '',
          values: [
            'унитаз  – санфарфор, сиденье  – полипропилен микролифт;',
            'крепеж для унитаза;',
            'крепежи для рамы;',
            'подсоединения входящей и сливной труб;',
            'сливной патрубок (колено) с адаптером d90/110 мм.'
          ]
        }
      ]
    },
    rating: 4.5,
    reviews_count: 10,
    cover_image: 'https://cs.p-static.ru/image/2125615/original-227x227-fit.jpg',
    properties: [
      {
        title: 'Артикул',
        value: [{ title: '153.741', link: null }]
      },
      {
        title: 'Тип товара',
        value: [{ title: 'Штора', link: '/catalog/957453/?brend=decofest' }]
      },
      {
        title: 'Бренд',
        value: [{ title: 'Decofest', link: '/catalog/957453/?brend=decofest' }]
      },
      {
        title: 'Коллекция',
        value: [{ title: 'Сола', link: '/catalog/957453/?kollekciya=sola' }]
      },
      {
        title: 'Страна-производитель',
        value: [{ title: 'Китай', link: null }]
      },
      {
        title: 'Высота, cm',
        value: [{ title: '280', link: null }]
      }
    ],
    categories: [
      {
        id: 1,
        title: 'Category 1',
        productQty: 10,
        breadcrumbs: [],
        image: '',
        children: []
      }
    ],
    breadcrumbs: [
      {
        id: 1,
        url: 'https://example.com',
        title: 'Товары для дома'
      },
      {
        id: 2,
        url: 'https://example.com',
        title: 'Текстиль для дома'
      },
      {
        id: 3,
        url: 'https://example.com',
        title: 'Постельное белье'
      }
    ]
  },
  {
    id: 4,
    title: 'Мойка для кухни Granula Standard 50х42х19 см врезная кварц белая',
    isInFavorites: false,
    price: 12000,
    discount_price: null,
    discount: null,
    product_count: 10,
    images: [
      'https://cs.p-static.ru/image/2125615/original-227x227-fit.jpg',
      'https://cs.p-static.ru/image/2023535/original-227x227-fit.jpg',
      'https://cs.p-static.ru/image/2023462/original-227x227-fit.jpg'
    ],
    questions: [
      {
        id: 1,
        author: {
          id: 1,
          email: 'example@google.com',
          full_name: 'John',
          phone_number: '1234567890'
        },
        published_at: '2022-12-13T14:06:10.157+03:00',
        question: 'Какой размер мойки?'
      },
      {
        id: 1,
        author: {
          id: 1,
          email: 'example@google.com',
          full_name: 'John',
          phone_number: '1234567890'
        },
        published_at: '2022-12-13T14:06:10.157+03:00',
        question: 'Какой размер мойки?'
      }
    ],
    reviews: [
      {
        id: 1,
        rating: 4.5,
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, voluptates.',
        author: {
          id: 1,
          email: 'example@google.com',
          full_name: 'John',
          phone_number: '1234567890'
        },
        images: [
          'https://media.apltcdn.com/media_files/660a/82a7/a5ab/7500/14ff/5218/large.jpg?1711964838',
          'https://media.apltcdn.com/media_files/660a/82a7/a5ab/7500/14ff/5218/large.jpg?1711964838'
        ],
        published_at: '2022-12-13T14:06:10.157+03:00'
      },
      {
        id: 2,
        rating: 4,
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, voluptates.',
        author: {
          id: 2,
          email: 'example@google.com',
          full_name: 'John',
          phone_number: '1234567890'
        },
        images: [],
        published_at: '2022-12-13T14:06:10.157+03:00'
      }
    ],
    description: {
      description: 'Предназначена для подвесных унитазов.',
      properties: [
        {
          key: 'Преимущества',
          value: '',
          values: [
            'Стальная рама с антикоррозийным покрытием. ',
            'Расчетная нагрузка до 400 кг. ',
            'Ножки с регулировкой высоты. ',
            'Межосевое расстояние под крепежные шпильки унитаза 18 и 23 см. ',
            'Бачок с функцией шумоподавления. ',
            'Двухрежимная кнопка смыва, надежное гальваническое покрытие. ',
            'Эконом слив – 3 литра, полный слив настраивается от 5,5 до 8,5 литров. ',
            'Монтажный кнопочный узел, полный комплект патрубков, лекала для монтажа отверстий.'
          ]
        },
        {
          key: 'Комплектация',
          value: '',
          values: [
            'унитаз  – санфарфор, сиденье  – полипропилен микролифт;',
            'крепеж для унитаза;',
            'крепежи для рамы;',
            'подсоединения входящей и сливной труб;',
            'сливной патрубок (колено) с адаптером d90/110 мм.'
          ]
        }
      ]
    },
    extended_description: {
      description: 'Предназначена для подвесных унитазов.',
      properties: [
        {
          key: 'Преимущества',
          value: '',
          values: [
            'Стальная рама с антикоррозийным покрытием. ',
            'Расчетная нагрузка до 400 кг. ',
            'Ножки с регулировкой высоты. ',
            'Межосевое расстояние под крепежные шпильки унитаза 18 и 23 см. ',
            'Бачок с функцией шумоподавления. ',
            'Двухрежимная кнопка смыва, надежное гальваническое покрытие. ',
            'Эконом слив – 3 литра, полный слив настраивается от 5,5 до 8,5 литров. ',
            'Монтажный кнопочный узел, полный комплект патрубков, лекала для монтажа отверстий.'
          ]
        },
        {
          key: 'Комплектация',
          value: '',
          values: [
            'унитаз  – санфарфор, сиденье  – полипропилен микролифт;',
            'крепеж для унитаза;',
            'крепежи для рамы;',
            'подсоединения входящей и сливной труб;',
            'сливной патрубок (колено) с адаптером d90/110 мм.'
          ]
        }
      ]
    },
    rating: 4.5,
    reviews_count: 10,
    cover_image: 'https://cs.p-static.ru/image/2125615/original-227x227-fit.jpg',
    properties: [
      {
        title: 'Артикул',
        value: [{ title: '153.741', link: null }]
      },
      {
        title: 'Тип товара',
        value: [{ title: 'Штора', link: '/catalog/957453/?brend=decofest' }]
      },
      {
        title: 'Бренд',
        value: [{ title: 'Decofest', link: '/catalog/957453/?brend=decofest' }]
      },
      {
        title: 'Коллекция',
        value: [{ title: 'Сола', link: '/catalog/957453/?kollekciya=sola' }]
      },
      {
        title: 'Страна-производитель',
        value: [{ title: 'Китай', link: null }]
      },
      {
        title: 'Высота, cm',
        value: [{ title: '280', link: null }]
      }
    ],
    categories: [
      {
        id: 1,
        title: 'Category 1',
        productQty: 10,
        breadcrumbs: [],
        image: '',
        children: []
      }
    ],
    breadcrumbs: [
      {
        id: 1,
        url: 'https://example.com',
        title: 'Товары для дома'
      },
      {
        id: 2,
        url: 'https://example.com',
        title: 'Текстиль для дома'
      },
      {
        id: 3,
        url: 'https://example.com',
        title: 'Постельное белье'
      }
    ]
  },
  {
    id: 5,
    title: 'Мойка для кухни Granula Standard 50х42х19 см врезная кварц белая',
    price: 12000,
    discount_price: 10020,
    discount: 20,
    product_count: 10,
    images: [
      'https://cs.p-static.ru/image/2125615/original-227x227-fit.jpg',
      'https://cs.p-static.ru/image/2023535/original-227x227-fit.jpg',
      'https://cs.p-static.ru/image/2023462/original-227x227-fit.jpg'
    ],
    isInFavorites: false,
    questions: [
      {
        id: 1,
        author: {
          id: 1,
          email: 'example@google.com',
          full_name: 'John',
          phone_number: '1234567890'
        },
        published_at: '2022-12-13T14:06:10.157+03:00',
        question: 'Какой размер мойки?'
      },
      {
        id: 1,
        author: {
          id: 1,
          email: 'example@google.com',
          full_name: 'John',
          phone_number: '1234567890'
        },
        published_at: '2022-12-13T14:06:10.157+03:00',
        question: 'Какой размер мойки?'
      }
    ],
    reviews: [
      {
        id: 1,
        rating: 4.5,
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, voluptates.',
        author: {
          id: 1,
          email: 'example@google.com',
          full_name: 'John',
          phone_number: '1234567890'
        },
        images: [
          'https://media.apltcdn.com/media_files/660a/82a7/a5ab/7500/14ff/5218/large.jpg?1711964838',
          'https://media.apltcdn.com/media_files/660a/82a7/a5ab/7500/14ff/5218/large.jpg?1711964838'
        ],
        published_at: '2022-12-13T14:06:10.157+03:00'
      },
      {
        id: 2,
        rating: 4,
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, voluptates.',
        author: {
          id: 2,
          email: 'example@google.com',
          full_name: 'John',
          phone_number: '1234567890'
        },
        images: [],
        published_at: '2022-12-13T14:06:10.157+03:00'
      }
    ],
    description: {
      description: 'Предназначена для подвесных унитазов.',
      properties: [
        {
          key: 'Преимущества',
          value: '',
          values: [
            'Стальная рама с антикоррозийным покрытием. ',
            'Расчетная нагрузка до 400 кг. ',
            'Ножки с регулировкой высоты. ',
            'Межосевое расстояние под крепежные шпильки унитаза 18 и 23 см. ',
            'Бачок с функцией шумоподавления. ',
            'Двухрежимная кнопка смыва, надежное гальваническое покрытие. ',
            'Эконом слив – 3 литра, полный слив настраивается от 5,5 до 8,5 литров. ',
            'Монтажный кнопочный узел, полный комплект патрубков, лекала для монтажа отверстий.'
          ]
        },
        {
          key: 'Комплектация',
          value: '',
          values: [
            'унитаз  – санфарфор, сиденье  – полипропилен микролифт;',
            'крепеж для унитаза;',
            'крепежи для рамы;',
            'подсоединения входящей и сливной труб;',
            'сливной патрубок (колено) с адаптером d90/110 мм.'
          ]
        }
      ]
    },
    extended_description: {
      description: 'Предназначена для подвесных унитазов.',
      properties: [
        {
          key: 'Преимущества',
          value: '',
          values: [
            'Стальная рама с антикоррозийным покрытием. ',
            'Расчетная нагрузка до 400 кг. ',
            'Ножки с регулировкой высоты. ',
            'Межосевое расстояние под крепежные шпильки унитаза 18 и 23 см. ',
            'Бачок с функцией шумоподавления. ',
            'Двухрежимная кнопка смыва, надежное гальваническое покрытие. ',
            'Эконом слив – 3 литра, полный слив настраивается от 5,5 до 8,5 литров. ',
            'Монтажный кнопочный узел, полный комплект патрубков, лекала для монтажа отверстий.'
          ]
        },
        {
          key: 'Комплектация',
          value: '',
          values: [
            'унитаз  – санфарфор, сиденье  – полипропилен микролифт;',
            'крепеж для унитаза;',
            'крепежи для рамы;',
            'подсоединения входящей и сливной труб;',
            'сливной патрубок (колено) с адаптером d90/110 мм.'
          ]
        }
      ]
    },
    rating: 4.5,
    reviews_count: 10,
    cover_image: 'https://cs.p-static.ru/image/2125615/original-227x227-fit.jpg',
    properties: [
      {
        title: 'Артикул',
        value: [{ title: '153.741', link: null }]
      },
      {
        title: 'Тип товара',
        value: [{ title: 'Штора', link: '/catalog/957453/?brend=decofest' }]
      },
      {
        title: 'Бренд',
        value: [{ title: 'Decofest', link: '/catalog/957453/?brend=decofest' }]
      },
      {
        title: 'Коллекция',
        value: [{ title: 'Сола', link: '/catalog/957453/?kollekciya=sola' }]
      },
      {
        title: 'Страна-производитель',
        value: [{ title: 'Китай', link: null }]
      },
      {
        title: 'Высота, cm',
        value: [{ title: '280', link: null }]
      }
    ],
    categories: [
      {
        id: 1,
        title: 'Category 1',
        productQty: 10,
        breadcrumbs: [],
        image: '',
        children: []
      }
    ],
    breadcrumbs: [
      {
        id: 1,
        url: 'https://example.com',
        title: 'Товары для дома'
      },
      {
        id: 2,
        url: 'https://example.com',
        title: 'Текстиль для дома'
      },
      {
        id: 3,
        url: 'https://example.com',
        title: 'Постельное белье'
      }
    ]
  },
  {
    id: 7,
    title: 'Мойка для кухни Granula Standard 50х42х19 см врезная кварц белая',
    price: 12000,
    discount_price: null,
    discount: null,
    product_count: 10,
    isInFavorites: false,
    images: [
      'https://cs.p-static.ru/image/2125615/original-227x227-fit.jpg',
      'https://cs.p-static.ru/image/2023535/original-227x227-fit.jpg',
      'https://cs.p-static.ru/image/2023462/original-227x227-fit.jpg'
    ],
    questions: [
      {
        id: 1,
        author: {
          id: 1,
          email: 'example@google.com',
          full_name: 'John',
          phone_number: '1234567890'
        },
        published_at: '2022-12-13T14:06:10.157+03:00',
        question: 'Какой размер мойки?'
      },
      {
        id: 1,
        author: {
          id: 1,
          email: 'example@google.com',
          full_name: 'John',
          phone_number: '1234567890'
        },
        published_at: '2022-12-13T14:06:10.157+03:00',
        question: 'Какой размер мойки?'
      }
    ],
    reviews: [
      {
        id: 1,
        rating: 4.5,
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, voluptates.',
        author: {
          id: 1,
          email: 'example@google.com',
          full_name: 'John',
          phone_number: '1234567890'
        },
        images: [
          'https://media.apltcdn.com/media_files/660a/82a7/a5ab/7500/14ff/5218/large.jpg?1711964838',
          'https://media.apltcdn.com/media_files/660a/82a7/a5ab/7500/14ff/5218/large.jpg?1711964838'
        ],
        published_at: '2022-12-13T14:06:10.157+03:00'
      },
      {
        id: 2,
        rating: 4,
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, voluptates.',
        author: {
          id: 2,
          email: 'example@google.com',
          full_name: 'John',
          phone_number: '1234567890'
        },
        images: [],
        published_at: '2022-12-13T14:06:10.157+03:00'
      }
    ],
    description: {
      description: 'Предназначена для подвесных унитазов.',
      properties: [
        {
          key: 'Преимущества',
          value: '',
          values: [
            'Стальная рама с антикоррозийным покрытием. ',
            'Расчетная нагрузка до 400 кг. ',
            'Ножки с регулировкой высоты. ',
            'Межосевое расстояние под крепежные шпильки унитаза 18 и 23 см. ',
            'Бачок с функцией шумоподавления. ',
            'Двухрежимная кнопка смыва, надежное гальваническое покрытие. ',
            'Эконом слив – 3 литра, полный слив настраивается от 5,5 до 8,5 литров. ',
            'Монтажный кнопочный узел, полный комплект патрубков, лекала для монтажа отверстий.'
          ]
        },
        {
          key: 'Комплектация',
          value: '',
          values: [
            'унитаз  – санфарфор, сиденье  – полипропилен микролифт;',
            'крепеж для унитаза;',
            'крепежи для рамы;',
            'подсоединения входящей и сливной труб;',
            'сливной патрубок (колено) с адаптером d90/110 мм.'
          ]
        }
      ]
    },
    extended_description: {
      description: 'Предназначена для подвесных унитазов.',
      properties: [
        {
          key: 'Преимущества',
          value: '',
          values: [
            'Стальная рама с антикоррозийным покрытием. ',
            'Расчетная нагрузка до 400 кг. ',
            'Ножки с регулировкой высоты. ',
            'Межосевое расстояние под крепежные шпильки унитаза 18 и 23 см. ',
            'Бачок с функцией шумоподавления. ',
            'Двухрежимная кнопка смыва, надежное гальваническое покрытие. ',
            'Эконом слив – 3 литра, полный слив настраивается от 5,5 до 8,5 литров. ',
            'Монтажный кнопочный узел, полный комплект патрубков, лекала для монтажа отверстий.'
          ]
        },
        {
          key: 'Комплектация',
          value: '',
          values: [
            'унитаз  – санфарфор, сиденье  – полипропилен микролифт;',
            'крепеж для унитаза;',
            'крепежи для рамы;',
            'подсоединения входящей и сливной труб;',
            'сливной патрубок (колено) с адаптером d90/110 мм.'
          ]
        }
      ]
    },
    rating: 4.5,
    reviews_count: 10,
    cover_image: 'https://cs.p-static.ru/image/2125615/original-227x227-fit.jpg',
    properties: [
      {
        title: 'Артикул',
        value: [{ title: '153.741', link: null }]
      },
      {
        title: 'Тип товара',
        value: [{ title: 'Штора', link: '/catalog/957453/?brend=decofest' }]
      },
      {
        title: 'Бренд',
        value: [{ title: 'Decofest', link: '/catalog/957453/?brend=decofest' }]
      },
      {
        title: 'Коллекция',
        value: [{ title: 'Сола', link: '/catalog/957453/?kollekciya=sola' }]
      },
      {
        title: 'Страна-производитель',
        value: [{ title: 'Китай', link: null }]
      },
      {
        title: 'Высота, cm',
        value: [{ title: '280', link: null }]
      }
    ],
    categories: [
      {
        id: 1,
        title: 'Category 1',
        productQty: 10,
        breadcrumbs: [],
        image: '',
        children: []
      }
    ],
    breadcrumbs: [
      {
        id: 1,
        url: 'https://example.com',
        title: 'Товары для дома'
      },
      {
        id: 2,
        url: 'https://example.com',
        title: 'Текстиль для дома'
      },
      {
        id: 3,
        url: 'https://example.com',
        title: 'Постельное белье'
      }
    ]
  },
  {
    id: 8,
    title: 'Мойка для кухни Granula Standard 50х42х19 см врезная кварц белая',
    price: 12000,
    discount_price: null,
    discount: null,
    isInFavorites: false,
    product_count: 10,
    images: [
      'https://cs.p-static.ru/image/2125615/original-227x227-fit.jpg',
      'https://cs.p-static.ru/image/2023535/original-227x227-fit.jpg',
      'https://cs.p-static.ru/image/2023462/original-227x227-fit.jpg'
    ],
    questions: [
      {
        id: 1,
        author: {
          id: 1,
          email: 'example@google.com',
          full_name: 'John',
          phone_number: '1234567890'
        },
        published_at: '2022-12-13T14:06:10.157+03:00',
        question: 'Какой размер мойки?'
      },
      {
        id: 1,
        author: {
          id: 1,
          email: 'example@google.com',
          full_name: 'John',
          phone_number: '1234567890'
        },
        published_at: '2022-12-13T14:06:10.157+03:00',
        question: 'Какой размер мойки?'
      }
    ],
    reviews: [
      {
        id: 1,
        rating: 4.5,
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, voluptates.',
        author: {
          id: 1,
          email: 'example@google.com',
          full_name: 'John',
          phone_number: '1234567890'
        },
        images: [
          'https://media.apltcdn.com/media_files/660a/82a7/a5ab/7500/14ff/5218/large.jpg?1711964838',
          'https://media.apltcdn.com/media_files/660a/82a7/a5ab/7500/14ff/5218/large.jpg?1711964838'
        ],
        published_at: '2022-12-13T14:06:10.157+03:00'
      },
      {
        id: 2,
        rating: 4,
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, voluptates.',
        author: {
          id: 2,
          email: 'example@google.com',
          full_name: 'John',
          phone_number: '1234567890'
        },
        images: [],
        published_at: '2022-12-13T14:06:10.157+03:00'
      }
    ],
    description: {
      description: 'Предназначена для подвесных унитазов.',
      properties: [
        {
          key: 'Преимущества',
          value: '',
          values: [
            'Стальная рама с антикоррозийным покрытием. ',
            'Расчетная нагрузка до 400 кг. ',
            'Ножки с регулировкой высоты. ',
            'Межосевое расстояние под крепежные шпильки унитаза 18 и 23 см. ',
            'Бачок с функцией шумоподавления. ',
            'Двухрежимная кнопка смыва, надежное гальваническое покрытие. ',
            'Эконом слив – 3 литра, полный слив настраивается от 5,5 до 8,5 литров. ',
            'Монтажный кнопочный узел, полный комплект патрубков, лекала для монтажа отверстий.'
          ]
        },
        {
          key: 'Комплектация',
          value: '',
          values: [
            'унитаз  – санфарфор, сиденье  – полипропилен микролифт;',
            'крепеж для унитаза;',
            'крепежи для рамы;',
            'подсоединения входящей и сливной труб;',
            'сливной патрубок (колено) с адаптером d90/110 мм.'
          ]
        }
      ]
    },
    extended_description: {
      description: 'Предназначена для подвесных унитазов.',
      properties: [
        {
          key: 'Преимущества',
          value: '',
          values: [
            'Стальная рама с антикоррозийным покрытием. ',
            'Расчетная нагрузка до 400 кг. ',
            'Ножки с регулировкой высоты. ',
            'Межосевое расстояние под крепежные шпильки унитаза 18 и 23 см. ',
            'Бачок с функцией шумоподавления. ',
            'Двухрежимная кнопка смыва, надежное гальваническое покрытие. ',
            'Эконом слив – 3 литра, полный слив настраивается от 5,5 до 8,5 литров. ',
            'Монтажный кнопочный узел, полный комплект патрубков, лекала для монтажа отверстий.'
          ]
        },
        {
          key: 'Комплектация',
          value: '',
          values: [
            'унитаз  – санфарфор, сиденье  – полипропилен микролифт;',
            'крепеж для унитаза;',
            'крепежи для рамы;',
            'подсоединения входящей и сливной труб;',
            'сливной патрубок (колено) с адаптером d90/110 мм.'
          ]
        }
      ]
    },
    rating: 4.5,
    reviews_count: 10,
    cover_image: 'https://cs.p-static.ru/image/2125615/original-227x227-fit.jpg',
    properties: [
      {
        title: 'Артикул',
        value: [{ title: '153.741', link: null }]
      },
      {
        title: 'Тип товара',
        value: [{ title: 'Штора', link: '/catalog/957453/?brend=decofest' }]
      },
      {
        title: 'Бренд',
        value: [{ title: 'Decofest', link: '/catalog/957453/?brend=decofest' }]
      },
      {
        title: 'Коллекция',
        value: [{ title: 'Сола', link: '/catalog/957453/?kollekciya=sola' }]
      },
      {
        title: 'Страна-производитель',
        value: [{ title: 'Китай', link: null }]
      },
      {
        title: 'Высота, cm',
        value: [{ title: '280', link: null }]
      }
    ],
    categories: [
      {
        id: 1,
        title: 'Category 1',
        productQty: 10,
        breadcrumbs: [],
        image: '',
        children: []
      }
    ],
    breadcrumbs: [
      {
        id: 1,
        url: 'https://example.com',
        title: 'Товары для дома'
      },
      {
        id: 2,
        url: 'https://example.com',
        title: 'Текстиль для дома'
      },
      {
        id: 3,
        url: 'https://example.com',
        title: 'Постельное белье'
      }
    ]
  }
];
