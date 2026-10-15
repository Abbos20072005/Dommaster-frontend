/** schema.org markup, rendered on the server: the crawler gets it in the HTML. */
export const JsonLd = ({ data }: { data: object | object[] }) => (
  <script
    type='application/ld+json'
    // `<` is escaped so that a name cannot close the script tag
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
  />
);
