export const filters: Filter[] = [
  {
    name: 'Цена',
    request_var: 'price',
    type: 'SLIDER',
    from: 0,
    to: 10000000,
    filter_items: [
      {
        label: '209~4094.99',
        count: 198,
        value: '209_4094.99',
        swatch_data: null
      }
    ]
  },
  {
    name: 'Категория',
    request_var: 'category',
    type: 'RADIO',
    from: null,
    to: null,
    filter_items: [
      {
        label: 'Напольные покрытия',
        count: 670,
        value: '4303',
        swatch_data: null
      },
      {
        label: 'Отопление дома',
        count: 50,
        value: '4600',
        swatch_data: null
      },
      {
        label: 'Окна и двери',
        count: 16,
        value: '5251',
        swatch_data: null
      },
      {
        label: 'Инструмент',
        count: 7,
        value: '5456',
        swatch_data: null
      },
      {
        label: 'Лакокрасочные материалы',
        count: 6,
        value: '5253',
        swatch_data: null
      },
      {
        label: 'Хозяйственные товары',
        count: 4,
        value: '5162',
        swatch_data: null
      }
    ]
  },
  {
    name: 'Бренд',
    request_var: 'brand',
    type: 'CHECKBOX',
    from: null,
    to: null,
    filter_items: [
      {
        label: 'EGGER',
        count: 43,
        value: 'EGGER',
        swatch_data: null
      },
      {
        label: 'KRONOSTAR',
        count: 23,
        value: 'KRONOSTAR',
        swatch_data: null
      },
      {
        label: 'Без бренда',
        count: 20,
        value: 'Без бренда',
        swatch_data: null
      },
      {
        label: 'Kronospan',
        count: 12,
        value: 'Kronospan',
        swatch_data: null
      },
      {
        label: 'Tarkett',
        count: 12,
        value: 'Tarkett',
        swatch_data: null
      },
      {
        label: 'ЛУКА',
        count: 12,
        value: 'ЛУКА',
        swatch_data: null
      },
      {
        label: 'Expert Choice',
        count: 11,
        value: 'Expert Choice',
        swatch_data: null
      },
      {
        label: 'Clic & Go',
        count: 10,
        value: 'Clic & Go',
        swatch_data: null
      },
      {
        label: 'CLIX',
        count: 8,
        value: 'CLIX',
        swatch_data: null
      },
      {
        label: 'Alpine Floor',
        count: 7,
        value: 'Alpine Floor',
        swatch_data: null
      },
      {
        label: 'Derby',
        count: 6,
        value: 'Derby',
        swatch_data: null
      },
      {
        label: 'Quick-Step',
        count: 6,
        value: 'Quick-Step',
        swatch_data: null
      },
      {
        label: 'MAXWOOD Dynamic',
        count: 4,
        value: 'MAXWOOD Dynamic',
        swatch_data: null
      },
      {
        label: 'Sunfloor',
        count: 4,
        value: 'Sunfloor',
        swatch_data: null
      },
      {
        label: 'WoodStyle',
        count: 4,
        value: 'WoodStyle',
        swatch_data: null
      },
      {
        label: 'Latat',
        count: 3,
        value: 'Latat',
        swatch_data: null
      },
      {
        label: 'ISODOM',
        count: 2,
        value: 'ISODOM',
        swatch_data: null
      },
      {
        label: 'PROFI',
        count: 2,
        value: 'PROFI',
        swatch_data: null
      },
      {
        label: 'Pergo',
        count: 2,
        value: 'Pergo',
        swatch_data: null
      },
      {
        label: 'SWISS KRONO',
        count: 2,
        value: 'SWISS KRONO',
        swatch_data: null
      },
      {
        label: 'Floorpan',
        count: 1,
        value: 'Floorpan',
        swatch_data: null
      },
      {
        label: 'Greenplanet®',
        count: 1,
        value: 'Greenplanet®',
        swatch_data: null
      },
      {
        label: 'HAUSMANN',
        count: 1,
        value: 'HAUSMANN',
        swatch_data: null
      },
      {
        label: 'Sanfor',
        count: 1,
        value: 'Sanfor',
        swatch_data: null
      },
      {
        label: 'Sinteros',
        count: 1,
        value: 'Sinteros',
        swatch_data: null
      }
    ]
  },
  {
    name: 'Основной цвет',
    request_var: 'color',
    type: 'RADIO',
    from: null,
    to: null,
    filter_items: [
      {
        label: 'серый',
        count: 60,
        value: 'серый',
        swatch_data: null
      },
      {
        label: 'коричневый',
        count: 48,
        value: 'коричневый',
        swatch_data: null
      },
      {
        label: 'бежевый',
        count: 43,
        value: 'бежевый',
        swatch_data: null
      },
      {
        label: 'бесцветный',
        count: 20,
        value: 'бесцветный',
        swatch_data: null
      },
      {
        label: 'белый',
        count: 16,
        value: 'белый',
        swatch_data: null
      },
      {
        label: 'оранжевый',
        count: 3,
        value: 'оранжевый',
        swatch_data: null
      },
      {
        label: 'зеленый',
        count: 2,
        value: 'зеленый',
        swatch_data: null
      },
      {
        label: 'бронзовый',
        count: 1,
        value: 'бронзовый',
        swatch_data: null
      },
      {
        label: 'желтый',
        count: 1,
        value: 'желтый',
        swatch_data: null
      },
      {
        label: 'медный',
        count: 1,
        value: 'медный',
        swatch_data: null
      },
      {
        label: 'многоцветный',
        count: 1,
        value: 'многоцветный',
        swatch_data: null
      },
      {
        label: 'розовый',
        count: 1,
        value: 'розовый',
        swatch_data: null
      },
      {
        label: 'серебристый',
        count: 1,
        value: 'серебристый',
        swatch_data: null
      }
    ]
  },
  {
    name: 'Тип',
    request_var: 'nastennye_i_potolochnye_svetilniki_tip',
    type: 'CHECKBOX',
    from: null,
    to: null,
    filter_items: [
      {
        label: 'порог',
        count: 12,
        value: 'порог',
        swatch_data: null
      },
      {
        label: 'бытовой',
        count: 2,
        value: 'бытовой',
        swatch_data: null
      },
      {
        label: 'полукоммерческий',
        count: 2,
        value: 'полукоммерческий',
        swatch_data: null
      },
      {
        label: 'средство для мытья',
        count: 2,
        value: 'средство для мытья',
        swatch_data: null
      },
      {
        label: 'средство для чистки',
        count: 1,
        value: 'средство для чистки',
        swatch_data: null
      }
    ]
  }
];
