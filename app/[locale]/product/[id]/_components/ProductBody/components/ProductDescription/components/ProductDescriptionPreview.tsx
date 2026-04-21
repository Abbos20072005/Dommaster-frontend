import React from 'react';

interface Props {
  description: Product['description'];
}

export const ProductDescriptionPreview = ({ description }: Props) => {
  if (!description) return null;

  return (
    <div
      className='prose prose-sm max-w-max'
      dangerouslySetInnerHTML={{ __html: description }}
    />
  );
};
