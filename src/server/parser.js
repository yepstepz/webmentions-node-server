import { mf2 } from "microformats-parser";

const parsed = mf2(`
<article class="h-entry">
<div class="u-in-reply-to h-cite">
  <p class="p-author h-card">Hannah</p>
  <p class="p-content">I am eating a donut</p>
  <a class="u-url" href="permalink"><time class="dt-published">YYYY-MM-DD</time></a>
</div>
<h1 class="p-name">Microformats are amazing</h1>
  <p>Published by <a class="p-author h-card" href="http://example.com">W. Developer</a>
    on <time class="dt-published" datetime="2013-06-13 12:00:00">13<sup>th</sup> June 2013</time></p>
    updated <time class="dt-updated" datetime="2013-06-14 12:00:00">14<sup>th</sup> June 2013</time></p>
  
  <p class="p-summary">In which I extoll the virtues of using microformats.</p>

  <div class="e-content">
    <p>Blah blah blah</p>
  </div>
</article>

`, {
  baseUrl: "http://example.com/",
});

console.log(parsed.items[0].properties);