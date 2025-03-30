import Image from 'next/image';

import { BaseLayout } from '@/components/layout';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@/i18n/navigation';

export const EcosystemDesktop = () => {
  return (
    <BaseLayout className='hidden lg:block'>
      <div className='grid grid-cols-5 gap-3'>
        <div className='col-span-2 grid grid-cols-2 gap-3'>
          <Card className='hover:bg-background relative col-span-2 transition-all hover:shadow-md'>
            <Link href='#'>
              <CardHeader>
                <CardTitle className='text-3xl'>
                  Помощники по <br />
                  дизайну
                </CardTitle>
                <CardDescription>
                  Бесплатно подберем материалы, <br />
                  отрисуем планировку и визуализируем <br />
                  помещение
                </CardDescription>
                <Image
                  alt='img'
                  className='absolute right-0 bottom-0 h-[182px] w-auto'
                  height={182}
                  src='https://cs.petrovich.ru/content/images/1143/design_projects__1_.png'
                  width={150}
                />
              </CardHeader>
            </Link>
          </Card>
          <Card className='hover:bg-background transition-all hover:shadow-md'>
            <Link href='#'>
              <CardHeader>
                <Image
                  alt='img'
                  className='size-14'
                  height={56}
                  src='https://cs.petrovich.ru/content/images/2768/Property_1_56_px.svg'
                  width={56}
                />
                <CardTitle>Аренда инструмента</CardTitle>
                <CardDescription>Ваш помощник в решении задач</CardDescription>
              </CardHeader>
            </Link>
          </Card>
          <Card className='hover:bg-background transition-all hover:shadow-md'>
            <Link href='#'>
              <CardHeader>
                <Image
                  alt='img'
                  className='size-14'
                  height={56}
                  src='https://cs.petrovich.ru/content/images/2768/Property_1_56_px.svg'
                  width={56}
                />
                <CardTitle>Аренда инструмента</CardTitle>
                <CardDescription>Ваш помощник в решении задач</CardDescription>
              </CardHeader>
            </Link>
          </Card>
        </div>
        <div className='col-span-3 grid grid-cols-6 gap-3'>
          <Card className='hover:bg-background col-span-2 transition-all hover:shadow-md'>
            <Link href='#'>
              <CardHeader>
                <Image
                  alt='img'
                  className='size-14'
                  height={56}
                  src='https://cs.petrovich.ru/content/images/2768/Property_1_56_px.svg'
                  width={56}
                />
                <CardTitle>Аренда инструмента</CardTitle>
                <CardDescription>Ваш помощник в решении задач</CardDescription>
              </CardHeader>
            </Link>
          </Card>
          <Card className='hover:bg-background col-span-2 transition-all hover:shadow-md'>
            <Link href='#'>
              <CardHeader>
                <Image
                  alt='img'
                  className='size-14'
                  height={56}
                  src='https://cs.petrovich.ru/content/images/2768/Property_1_56_px.svg'
                  width={150}
                />
                <CardTitle>Аренда инструмента</CardTitle>
                <CardDescription>Ваш помощник в решении задач</CardDescription>
              </CardHeader>
            </Link>
          </Card>
          <Card className='hover:bg-background col-span-2 transition-all hover:shadow-md'>
            <Link href='#'>
              <CardHeader>
                <Image
                  alt='img'
                  className='size-14'
                  height={56}
                  src='https://cs.petrovich.ru/content/images/2768/Property_1_56_px.svg'
                  width={150}
                />
                <CardTitle>Аренда инструмента</CardTitle>
                <CardDescription>Ваш помощник в решении задач</CardDescription>
              </CardHeader>
            </Link>
          </Card>
          <Card className='hover:bg-background col-span-3 transition-all hover:shadow-md'>
            <Link href='#'>
              <CardHeader>
                <Image
                  alt='img'
                  className='size-[76px]'
                  height={76}
                  src='https://cs.petrovich.ru/content/images/2768/Property_1_56_px.svg'
                  width={76}
                />
                <CardTitle className='text-xl'>Аренда инструмента</CardTitle>
                <CardDescription>
                  Сервисы для создания идеального дизайна и оценки стоимости его воплощения
                </CardDescription>
              </CardHeader>
            </Link>
          </Card>
          <Card className='hover:bg-background col-span-3 transition-all hover:shadow-md'>
            <Link href='#'>
              <CardHeader>
                <Image
                  alt='img'
                  className='size-[76px]'
                  height={76}
                  src='https://cs.petrovich.ru/content/images/2768/Property_1_56_px.svg'
                  width={76}
                />
                <CardTitle className='text-xl'>Аренда инструмента</CardTitle>
                <CardDescription>Поможем быстро посчитать материалы и работы</CardDescription>
              </CardHeader>
            </Link>
          </Card>
        </div>
      </div>
    </BaseLayout>
  );
};
