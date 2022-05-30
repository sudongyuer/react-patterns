import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'en-US',
  title: 'JavaScript 🧬 Patterns',
  description: 'Vite & Vue powered static site generator.',
  lastUpdated: true,
  base:"/js-patterns/",

  themeConfig: {
    repo: 'sudongyuer/js-patterns',
    docsDir: 'docs',
    docsBranch: 'main',
    editLinks: false,
    editLinkText: 'Edit this page on GitHub',
    lastUpdated: 'Last Updated',

    algolia: {
      appId: '8J64VVRP8K',
      apiKey: 'a18e2f4cc5665f6602c5631fd868adfd',
      indexName: 'vitepress'
    },

    nav: [
      { text: 'Start', link: '/', activeMatch: '^/$|^/guide/' },
      {
        text: 'About ME',
        link: 'https://github.com/sudongyuer'
      }
    ],
    // @ts-ignore
    sidebar: {
      '/': getArraySidebar()
    }
  }
})

function getArraySidebar() {
  return [
    {text: '开始探索前端的设计模式之旅吧🌈',},
    {
      text: '工厂模式',
      link:"/FactoryPattern/FactoryPattern"
    },
    {
      text: '命令模式',
      link:"/CommandPattern/CommandPattern"
    },
    {
      text: '复合模式',
      link:"/CompoundPattern/CompoundPattern"
    }
  ]
}
