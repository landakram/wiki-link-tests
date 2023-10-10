// cjs-test.cjs
async function testCjsImport() {
  const {unified} = (await import('unified'));
  const markdown = (await import('remark-parse')).default;
  const {visit} = (await import('unist-util-visit'));
  const wikiLinkPlugin = (await import('remark-wiki-link')).default;

  const processor = unified()
    .use(markdown)
    .use(wikiLinkPlugin, {
      permalinks: ['wiki_link'],
    });

  let ast = processor.parse('[[Wiki Link]]');
  ast = processor.runSync(ast);

  visit(ast, 'wikiLink', (node) => {
    if (!node.data || node.data.exists === undefined || node.data.permalink === undefined) {
      throw new Error('Not a wiki link');
    }

    console.log('CJS: Wiki link exists:', node.data.exists);
    console.log('CJS: Wiki link permalink:', node.data.permalink);
  });
}

testCjsImport();

