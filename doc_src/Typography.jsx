import React from 'react';

function Typography() {
  return (
    <div>
      <h1>Typography</h1>
      <h2>Headers</h2>
      <h1>h1</h1>
      <h2>h2</h2>
      <h3>h3</h3>
      <h4>h4</h4>
      <h5>h5</h5>
      <h2>Paragraphs</h2>
      <p>This is the style of a paragraph. Its font size is 14px, and it uses the default weight of the Roboto font.</p>
      <p>In addition, this secont paragraph is 14px below the preceding paragraph. The top and bottom margins of paragraphs are 14px.</p>
      <h2>Lists</h2>
      <h3>Unordered Lists</h3>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
        <li>Item 4</li>
        <li>Item 5</li>
      </ul>
      <h3>Ordered Lists</h3>
      <ol>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
        <li>Item 4</li>
        <li>Item 5</li>
      </ol>
      <h3>Definition Lists</h3>
      <dl>
        <dt>Term</dt>
        <dd>Definition</dd>
      </dl>

      <h2>Links</h2>
      <a href="">Link</a><br/>
    </div>
  );
}

export default Typography;