import { Command as CommandPrimitive } from 'cmdk';
import { Check } from 'lucide-react';
import React, { useMemo, useState } from 'react';

import { useOutsideClick } from '@/hooks';
import { cn } from '@/lib/utils';

import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from './command';
import { Input } from './input';
import { Skeleton } from './skeleton';

interface Props<T extends string> {
  emptyMessage?: string;
  isLoading?: boolean;
  items: { value: T; label: string }[];
  placeholder?: string;
  searchValue: string;
  selectedValue: T;
  onSearchValueChange: (value: string) => void;
  onSelectedValueChange: (value: T) => void;
}

export const AutoComplete = <T extends string>({
  selectedValue,
  onSelectedValueChange,
  searchValue,
  onSearchValueChange,
  items,
  isLoading,
  emptyMessage = 'No items.',
  placeholder = 'Search...'
}: Props<T>) => {
  const [open, setOpen] = useState(false);
  const containerRef = useOutsideClick(() => setOpen(false));
  const searchRef = React.useRef<HTMLInputElement>(null);

  const labels = useMemo(
    () =>
      items.reduce(
        (acc, item) => {
          acc[item.value] = item.label;
          return acc;
        },
        {} as Record<string, string>
      ),
    [items]
  );

  const reset = () => {
    onSelectedValueChange('' as T);
    onSearchValueChange('');
  };

  const onSelectItem = (inputValue: string) => {
    if (inputValue === selectedValue) {
      reset();
    } else {
      onSelectedValueChange(inputValue as T);
      onSearchValueChange(labels[inputValue] ?? '');
    }
    setOpen(false);
  };

  return (
    <div ref={containerRef} className='relative flex-1'>
      <Input
        ref={searchRef}
        value={searchValue}
        onChange={(e) => onSearchValueChange(e.target.value)}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
      />
      <div
        className={cn(
          'bg-background invisible absolute inset-x-0 top-full z-50 mt-1 w-full scale-96 rounded-md border-none p-0 opacity-0 shadow-lg transition-all',
          { 'visible scale-100 opacity-100': open }
        )}
      >
        <Command shouldFilter={false}>
          <CommandList>
            {isLoading && (
              <CommandPrimitive.Loading>
                <div className='p-1'>
                  <Skeleton className='h-6 w-full' />
                </div>
              </CommandPrimitive.Loading>
            )}
            {items.length > 0 && !isLoading ? (
              <CommandGroup>
                {items.map((option, index) => (
                  <CommandItem
                    key={index}
                    value={option.value}
                    onMouseDown={(e) => e.preventDefault()}
                    onSelect={onSelectItem}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        selectedValue === option.value ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : null}
            {!isLoading ? <CommandEmpty>{emptyMessage}</CommandEmpty> : null}
          </CommandList>
        </Command>
      </div>
    </div>
  );
};
