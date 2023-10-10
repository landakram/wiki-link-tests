// ejs-test.js
import {unified} from 'unified';
import markdown from 'remark-parse';
import {visit} from 'unist-util-visit';
import wikiLinkPlugin from 'remark-wiki-link';

async function testEjsImport() {
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

    console.log('EJS: Wiki link exists:', node.data.exists);
    console.log('EJS: Wiki link permalink:', node.data.permalink);
  });
}

testEjsImport();

