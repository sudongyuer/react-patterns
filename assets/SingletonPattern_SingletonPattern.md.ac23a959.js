import{_ as n,c as s,o as a,a as t}from"./app.ae9771e3.js";const m='{"title":"\u5355\u4F8B\u6A21\u5F0F","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u7B80\u4ECB","slug":"\u7B80\u4ECB"},{"level":2,"title":"\u5B9E\u73B0","slug":"\u5B9E\u73B0"},{"level":2,"title":"\u4F18\u70B9","slug":"\u4F18\u70B9"},{"level":2,"title":"\u7F3A\u70B9","slug":"\u7F3A\u70B9"},{"level":2,"title":"React \u4E2D\u7684\u72B6\u6001\u7BA1\u7406","slug":"react-\u4E2D\u7684\u72B6\u6001\u7BA1\u7406"}],"relativePath":"SingletonPattern/SingletonPattern.md","lastUpdated":1653887615000}',e={},p=t(`<h1 id="\u5355\u4F8B\u6A21\u5F0F" tabindex="-1">\u5355\u4F8B\u6A21\u5F0F <a class="header-anchor" href="#\u5355\u4F8B\u6A21\u5F0F" aria-hidden="true">#</a></h1><blockquote><p>\u5728\u6211\u4EEC\u7684\u5E94\u7528\u7A0B\u5E8F\u4E2D\u5171\u4EAB\u4E00\u4E2A\u5168\u5C40\u5B9E\u4F8B</p></blockquote><h2 id="\u7B80\u4ECB" tabindex="-1">\u7B80\u4ECB <a class="header-anchor" href="#\u7B80\u4ECB" aria-hidden="true">#</a></h2><p>\u5355\u4F8B\u662F\u53EF\u4EE5\u5B9E\u4F8B\u5316\u4E00\u6B21\u7684\u7C7B\uFF0C\u5E76\u4E14\u53EF\u4EE5\u5168\u5C40\u8BBF\u95EE\u3002\u8FD9\u4E2A\u5355\u4E00\u5B9E\u4F8B\u53EF\u4EE5\u5728\u6211\u4EEC\u7684\u5E94\u7528\u7A0B\u5E8F\u4E2D\u5171\u4EAB\uFF0C\u8FD9\u4F7F\u5F97\u5355\u4F8B\u975E\u5E38\u9002\u5408\u7BA1\u7406\u5E94\u7528\u7A0B\u5E8F\u4E2D\u7684\u5168\u5C40\u72B6\u6001\u3002</p><h2 id="\u5B9E\u73B0" tabindex="-1">\u5B9E\u73B0 <a class="header-anchor" href="#\u5B9E\u73B0" aria-hidden="true">#</a></h2><div class="language-js"><pre><code><span class="token comment">//power by sudngyu</span>
<span class="token keyword">let</span> counter <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> instance
<span class="token keyword">class</span> <span class="token class-name">Counter</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>instance<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&quot;You can only create one instance!&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    instance <span class="token operator">=</span> <span class="token keyword">this</span>
  <span class="token punctuation">}</span>

  <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">getCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> counter<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">increment</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">++</span>counter<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">decrement</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">--</span>counter<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> counter1 <span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">Counter</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> counter2 <span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">Counter</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// Error: You can only create one instance!</span>
<span class="token comment">//\u5982\u679C\u60F3\u8BA9\u8FD9\u4E2A\u5168\u5C40\u5BF9\u8C61\u4E0D\u88AB\u968F\u610F\u8986\u76D6\u6389</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> Object<span class="token punctuation">.</span><span class="token function">freeze</span><span class="token punctuation">(</span>counter1<span class="token punctuation">)</span>

</code></pre></div><h2 id="\u4F18\u70B9" tabindex="-1">\u4F18\u70B9 <a class="header-anchor" href="#\u4F18\u70B9" aria-hidden="true">#</a></h2><p>\u6574\u4E2A\u5E94\u7528\u7A0B\u5E8F\u53EA\u751F\u6210\u4E00\u4E2A\u5B9E\u4F8B\uFF0C\u8282\u7EA6\u4E86\u5185\u5B58</p><h2 id="\u7F3A\u70B9" tabindex="-1">\u7F3A\u70B9 <a class="header-anchor" href="#\u7F3A\u70B9" aria-hidden="true">#</a></h2><p>\u5728javascript\u4E2D\uFF0C\u4F7F\u7528\u7C7B\u6765\u5B9E\u73B0\u5355\u4F8B\u6A21\u5F0F\u4F18\u70B9\u77EB\u6789\u8FC7\u6B63</p><p>\u6211\u4EEC\u53EF\u4EE5\u4F7F\u7528\u5E38\u89C4\u7684\u5BF9\u8C61\u5C31\u80FD\u5B9E\u73B0\u5355\u4F8B\uFF0C\u800C\u4E0D\u9700\u8981\u518D\u53BB\u5199\u4E00\u4E2A\u7C7B</p><p>\u8BE5\u5BF9\u8C61\u4F5C\u4E3A\u516C\u5171\u5BF9\u8C61\u88AB\u591A\u5904\u4F7F\u7528\uFF0C\u5BFC\u81F4\u72B6\u6001\u5F88\u53EF\u80FD\u4E0D\u7B26\u5408\u9884\u671F</p><div class="language-js"><pre><code><span class="token comment">//\u521B\u5EFA\u5168\u5C40\u5BF9\u8C61\u540C\u6837\u80FD\u5B9E\u73B0\u5355\u4F8B\u5B50\u6A21\u5F0F</span>
<span class="token keyword">let</span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> counter<span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">increment</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">++</span>count
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">decrement</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">--</span>count
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
Object<span class="token punctuation">.</span><span class="token function">freeze</span><span class="token punctuation">(</span>counter<span class="token punctuation">)</span>

<span class="token keyword">export</span> <span class="token punctuation">{</span>counter<span class="token punctuation">}</span>

</code></pre></div><h2 id="react-\u4E2D\u7684\u72B6\u6001\u7BA1\u7406" tabindex="-1">React \u4E2D\u7684\u72B6\u6001\u7BA1\u7406 <a class="header-anchor" href="#react-\u4E2D\u7684\u72B6\u6001\u7BA1\u7406" aria-hidden="true">#</a></h2><p><strong>\u5728 React \u4E2D\uFF0C\u6211\u4EEC\u7ECF\u5E38\u901A\u8FC7Redux</strong>\u6216<strong>React Context</strong>\u7B49\u72B6\u6001\u7BA1\u7406\u5DE5\u5177\u6765\u4F9D\u8D56\u5168\u5C40\u72B6\u6001\uFF0C\u800C\u4E0D\u662F\u4F7F\u7528 Singletons\u3002\u5C3D\u7BA1\u5B83\u4EEC\u7684\u5168\u5C40\u72B6\u6001\u884C\u4E3A\u53EF\u80FD\u770B\u8D77\u6765\u7C7B\u4F3C\u4E8E\u5355\u4F8B\uFF0C\u4F46\u8FD9\u4E9B\u5DE5\u5177\u63D0\u4F9B\u4E86<strong>\u53EA\u8BFB\u72B6\u6001</strong>\u800C\u4E0D\u662F\u5355\u4F8B\u7684<em>\u53EF\u53D8</em>\u72B6\u6001\u3002\u4F7F\u7528 Redux \u65F6\uFF0C\u53EA\u6709\u7EAF\u51FD\u6570<em>reducer</em>\u53EF\u4EE5\u5728\u7EC4\u4EF6\u901A\u8FC7<em>dispatcher\u53D1\u9001**\u64CD\u4F5C</em>\u540E\u66F4\u65B0\u72B6\u6001\u3002</p><p>\u5C3D\u7BA1\u4F7F\u7528\u8FD9\u4E9B\u5DE5\u5177\u4E0D\u4F1A\u795E\u5947\u5730\u6D88\u9664\u5168\u5C40\u72B6\u6001\u7684\u7F3A\u70B9\uFF0C\u4F46\u6211\u4EEC\u81F3\u5C11\u53EF\u4EE5\u786E\u4FDD\u5168\u5C40\u72B6\u6001\u6309\u7167\u6211\u4EEC\u60F3\u8981\u7684\u65B9\u5F0F\u53D1\u751F\u53D8\u5316\uFF0C\u56E0\u4E3A\u7EC4\u4EF6\u4E0D\u80FD\u76F4\u63A5\u66F4\u65B0\u72B6\u6001\u3002</p>`,16),o=[p];function c(u,l,r,k,i,d){return a(),s("div",null,o)}var w=n(e,[["render",c]]);export{m as __pageData,w as default};
