import type { SuggestResponseItem } from '@yandex/ymaps3-types';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import React from 'react';

import type { ComboboxOption } from '@/components/ui/combobox';
import type { MapLocation } from '@/modules/location/index';

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger
} from '@/components/ui/combobox';
import { useDebouncedValue } from '@/hooks/useDeboucedValue';
import { getGeocode } from '@/modules/maps/api/geocode';
import { getSuggest } from '@/modules/maps/api/suggest';

interface Props extends Omit<React.ComponentProps<typeof ComboboxTrigger>, 'value'> {
  placeholder?: string;
  value: MapLocation | null;
  onValueChange: (value: MapLocation) => void;
}

export const LocationSelectCombobox = ({ value, placeholder, onValueChange, ...props }: Props) => {
  const t = useTranslations();
  const [searchQuery, setSearchQuery] = React.useState(value?.location_name || '');
  const debouncedSearch = useDebouncedValue(searchQuery, 300);

  React.useEffect(() => {
    setSearchQuery(value?.location_name || '');
  }, [value?.location_name]);

  const getSuggestQuery = useQuery({
    queryKey: ['geo-suggest', debouncedSearch],
    enabled: !!debouncedSearch,
    queryFn: () =>
      getSuggest({
        params: {
          text: debouncedSearch
        }
      })
  });

  const suggestions = getSuggestQuery.data?.data.results || [];

  const handleComboboxValueChange = async (option: ComboboxOption | null) => {
    if (!option) return;

    try {
      const res = await getGeocode({
        params: { geocode: option.value, results: 1 }
      });
      const [lng, lat] =
        res.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ');

      const address =
        res.data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty
          .GeocoderMetaData.text;

      onValueChange({
        latitude: +lat,
        longitude: +lng,
        location_name: address
      });
      setSearchQuery('');
    } catch (error) {
      console.error('Error geocoding address:', error);
    }
  };

  const transformToLongAddress = (suggestion: SuggestResponseItem) => {
    return suggestion.title.text + (suggestion.subtitle ? `, ${suggestion.subtitle.text}` : '');
  };

  return (
    <Combobox
      data={suggestions.map((item) => ({
        value: transformToLongAddress(item),
        label: transformToLongAddress(item)
      }))}
      value={
        value
          ? {
              value: value.location_name,
              label: value.location_name
            }
          : null
      }
      onValueChange={handleComboboxValueChange}
      placeholder={placeholder}
    >
      <ComboboxTrigger {...props} />
      <ComboboxContent>
        <ComboboxInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder || t('Search')}
        />
        <ComboboxEmpty>{t('No results')}</ComboboxEmpty>
        <ComboboxList>
          {suggestions.map((item, index) => (
            <ComboboxItem key={item.title.text + index} value={transformToLongAddress(item)}>
              <div>
                <p>{item.title.text}</p>
                {item.subtitle && (
                  <p className='text-muted-foreground text-xs'>{item.subtitle.text}</p>
                )}
              </div>
            </ComboboxItem>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};
