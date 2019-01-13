const path = require('path')
const container = require('markdown-it-container')

module.exports = {
  dest: './docs/.vuepress/dist',
  base: '/docs/',
  lang: 'zh-CN',
  title: '组件库',
  description: '前端组件库',
  head: [
    ['link', {
      rel: 'icon',
      href: `/logo.png`
    }],
    ['link', {
      rel: 'manifest',
      href: '/manifest.json'
    }],
    ['meta', {
      name: 'theme-color',
      content: '#3eaf7c'
    }],
    ['meta', {
      name: 'apple-mobile-web-app-capable',
      content: 'yes'
    }],
    ['meta', {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black'
    }],
    ['link', {
      rel: 'apple-touch-icon',
      href: `/icons/apple-touch-icon-152x152.png`
    }],
    ['link', {
      rel: 'mask-icon',
      href: '/icons/safari-pinned-tab.svg',
      color: '#3eaf7c'
    }],
    ['meta', {
      name: 'msapplication-TileImage',
      content: '/icons/msapplication-icon-144x144.png'
    }],
    ['meta', {
      name: 'msapplication-TileColor',
      content: '#000000'
    }]
  ],
  // theme: '@vuepress/vue',
  themeConfig: {
    repo: 'jfe',
    editLinks: true,
    docsDir: 'docs',
    // #697 Provided by the official algolia team.
    /* algolia: ctx.isProd ? ({
      apiKey: '3a539aab83105f01761a137c61004d85',
      indexName: 'vuepress'
    }) : null, */
    editLinkText: '在 GitHub 上编辑此页',
    lastUpdated: '上次更新',
    nav: require('./nav/zh'),
    sidebar: {
      '/api/': getApiSidebar(),
      '/guide/': getGuideSidebar('指南', '深入'),
      '/plugin/': getPluginSidebar('插件', '介绍', '官方插件'),
      '/theme/': getThemeSidebar('主题', '介绍')
    }
  },
  plugins: [
    ['@vuepress/i18n-ui', false],
    ['@vuepress/back-to-top', true],
    ['@vuepress/pwa', {
      serviceWorker: true,
      updatePopup: true
    }],
    ['@vuepress/medium-zoom', true],
    ['@vuepress/notification', true],
    ['@vuepress/google-analytics', {
      ga: 'UA-128189152-1'
    }],
  ],
  clientRootMixin: path.resolve(__dirname, 'mixin.js'),
  extendMarkdown(md) {
    md.use(container, 'upgrade', {
      render: (tokens, idx) => tokens[idx].nesting === 1 ?
        `<UpgradePath title="${tokens[idx].info.trim().slice('upgrade'.length).trim()}">` :
        '</UpgradePath>'
    })
  },
}

function getGuideSidebar(groupA, groupB) {
  return [{
      title: groupA,
      collapsable: false,
      children: [
        '',
        'getting-started',
        'directory-structure',
        'basic-config',
        'assets',
        'markdown',
        'using-vue',
        'i18n',
        'deploy',
        'codepen'
      ]
    },
    {
      title: groupB,
      collapsable: false,
      children: [
        'frontmatter',
        'permalinks',
        'markdown-slot',
        'global-computed'
      ]
    }
  ]
}

function getPluginSidebar(pluginTitle, pluginIntro, officialPluginTitle) {
  return [{
      title: pluginTitle,
      collapsable: false,
      children: [
        ['', pluginIntro],
        'using-a-plugin',
        'writing-a-plugin',
        'life-cycle',
        'option-api',
        'context-api'
      ]
    },
    {
      title: officialPluginTitle,
      collapsable: false,
      children: [
        'official/plugin-search',
        'official/plugin-active-header-links',
        'official/plugin-pwa',
        'official/plugin-blog',
        'official/plugin-pagination',
        'official/plugin-google-analytics',
        'official/plugin-i18n-ui',
        'official/plugin-last-updated',
        'official/plugin-medium-zoom',
        'official/plugin-back-to-top',
        'official/plugin-register-components',
      ]
    }
  ]
}

function getThemeSidebar(groupA, introductionA) {
  return [{
    title: groupA,
    collapsable: false,
    children: [
      ['', introductionA],
      'using-a-theme',
      'writing-a-theme',
      'option-api',
      'default-theme-config'
    ]
  }, ]
}

function getApiSidebar() {
  return [{
    title: 'API',
    collapsable: false,
    children: [
      '',
      'util-array'
    ]
  },]
}