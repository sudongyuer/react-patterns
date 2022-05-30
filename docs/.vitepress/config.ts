import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'en-US',
  title: 'React Patterns 🥶',
  description: 'Vite & Vue powered static site generator.',
  lastUpdated: true,
  base:"/react-patterns/",

  themeConfig: {
    repo: 'sudongyuer/react-patterns',
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
    },
    {
      text: '容器/演示模式',
      link:"/ContainerPresentationPattern/ContainerPresentationalPattern"
    },
    {
      text: '轻量级模式',
      link:"/FlyweightPattern/FlyweightPattern"
    },
    {
      text: '原型模式',
      link:"/HOCPattern/HOCPatten"
    },
    {
      text: 'Hooks模式',
      link:"/HooksPattern/HooksPattern"
    },
    {
      text: '中介模式/中间件模式',
      link:"/CompoundPattern/CompoundPattern"
    },
    {
      text: '混合模式',
      link:"/CompoundPattern/CompoundPattern"
    },
    {
      text: '观察者模式👀',
      link:"/ObserverPattern/ObserverPattern"
    },
    {
      text: '提供者模式',
      link:"/ProviderPattern/ProviderPattern"
    },
    {
      text: '代理模式',
      link:"/Proxy/Proxy"
    },
    {
      text: '渲染属性模式',
      link:"/RenderPropsPattern/RenderPropsPattern"
    },
    {
      text: '单例模式',
      link:"/SingletonPattern/SingletonPattern"
    },
   
  ]
}
