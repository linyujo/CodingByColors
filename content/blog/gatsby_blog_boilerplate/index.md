---
id: 20201028A
slug: /gatsby_blog_boilerplate
subject: Gatsby
title: 建立Gatsby網誌搭配TypeScript
date: 2020-10-28T09:35:55Z
description: Gatsby生態系對於用markdown寫部落格非常友善，官方有提供boilerplate讓大家快速架站。但若要搭配Typescript，則需要對boilerplate作進一步設定
tags:
 - React
 - Gatsby
 - TypeScript
headerImage: "https://imgur.com/PxVjyg0.jpg"
templateKey: blog-post
---
> Photo by [Steve Johnson](https://unsplash.com/@steve_j?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/fix?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText)

## 建立專案
請先確認nodejs版本在v10以上。

先global安裝gatsby-cli
```bash
$ yarn global add gatsby-cli
```

若是成功安裝gatsby-cli，在終端機輸入`gatsby --version`，會出現Gatsby CLI version，例如：
```bash
$ Gatsby CLI version: 2.12.63
```
接著複製以下指令：
```bash
$ gatsby new my-blog-starter https://github.com/gatsbyjs/gatsby-starter-blog
```
其中*my-blog-starter*為專案名稱，你可以改成自己喜歡的名字。
後面的網址為gatsby官方提供的部落格環境懶人包。

下載完成後，先將專案跑起來看看：
```bash
$ cd my-blog-starter
$ gatsby develop
```
若是看到以下畫面，代表專案成功運行：
![](https://i.imgur.com/NMYWDpa.png)
![](https://i.imgur.com/2RqyVVX.png)


## 建立Typescript環境
首先，先下載幾個必要的dependencies：
```bash
$ yarn add gatsby-plugin-typescript
$ yarn add typescript --dev
```
gatsby-plugin-typescript會將Gatsby環境中的`.js`編譯成`.tsx`檔。

打開`gatsby-config.js`，拉到`plugins: []`的最後一行，將`gatsby-plugin-typescript`添加到plugins裡面。

```javascript
// gatsby-config.js
module.exports = {
  plugins: [
    // default plugins...
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        jsxPragma: `jsx`, // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
  ],
}
```

接著，在根目錄的位置，新增兩個檔案，分別是`.eslintrc.js`與`tsconfig.json`。

`.eslintrc.js`是校正ts語法/格式的設定檔：

```javascript
// .eslintrc.js

module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  plugins: ["@typescript-eslint", "react"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
  },
  rules: {
    "react/prop-types": "off", // Disable prop-types as we use TypeScript for type checking
    "@typescript-eslint/explicit-function-return-type": "off",
  },
  overrides: [
    // Override some TypeScript rules just for .js files
    {
      files: ["*.js"],
      rules: {
        "@typescript-eslint/no-var-requires": "off", //
      },
    },
  ],
}
```
`tsconfig.json`是檢查typescript語法的設定檔：
```javascript
// tsconfig.json

{
  "compilerOptions": {
    "module": "commonjs",
    "target": "esnext",
    "jsx": "preserve",
    "lib": ["dom", "esnext"],
    "strict": true,
    "noEmit": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "noUnusedLocals": false,
    "allowJs": true
  },
  "exclude": ["node_modules", "public", ".cache"]
}
```

在`.eslintrc.js`中，我們會用到`@typescript-eslint`這個套件，因此還要下載dependencies：
```bash
$ yarn add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint
```
最後一件事，在package.json中，貼上一個指令，做全專案的typescript型別檢查：
```javascript
"scripts": {
    // ...
    "type-check": "tsc --noEmit"
}
```
到目前為止，環境設定就告一個段落。先commit，接下來會將所有`.js`檔修改成`.tsx`。

## 改寫成typescript

### src/components/bio.js
將副檔名改成`.tsx`。

### src/components/layout.js
將副檔名改成`.tsx`。

將`const Layout = ({ location, title, children }) => `改成，以typescript的語法宣告

```jsx
interface Props {
  location: Location
  title: string
}

const Layout: React.FC<Props> = ({ location, title, children }) => {
    const rootPath: string = `${__PATH_PREFIX__}/`
}
```

其中，`const rootPath = '${__PATH_PREFIX__}/'`當中的`__PATH_PREFIX__`是Gatsby的global變數。雖然tslint有紅色底線的警告，但不影響程式運行。

### src/components/seo.js
將副檔名改成`.tsx`。

改成tsx後，`import { Helmet } from "react-helmet"`隨即出現了紅色底線毛毛蟲。
![](https://i.imgur.com/GAcozqO.png)

由於不是所有套件都有使用typescript，所以我們要在專案的**根目錄**新增一個檔案`node_modules.d.ts`。並貼上下列程式碼：
```typescript
// node_modules.d.ts

declare module "react-helmet"
```
接著，繼續將宣告的語法改成typescript。
```jsx
interface Props {
  description?: string
  lang?: string
  meta?: []
  title: string
}

const SEO: React.FC<Props> = ({
  description = "",
  lang = "en",
  meta = [],
  title = "",
}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            social {
              twitter
            }
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.social.twitter,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta || [])}
    />
  )
}

// SEO.defaultProps = {
//   lang: `en`,
//   meta: [],
//   description: ``,
// }

// SEO.propTypes = {
//   description: PropTypes.string,
//   lang: PropTypes.string,
//   meta: PropTypes.arrayOf(PropTypes.object),
//   title: PropTypes.string.isRequired,
// }

export default SEO
```
由於已經使用了Typescript，`defaultProps`和`propTypes`可以註解或刪除。

### src/pages/404.js
將副檔名改成`.tsx`。

在官方範例`using-typescript.tsx`當中，gatsby函式庫中的`PageProps`可取得`window.location`。
在改寫`404.tsx`時，會參考官方作法，將`PageProps`注入元件中。

而Component所需要的Props，則會被`PageProps`打包成`data`物件。
以`404.js`為例，要取得`site`，得從`data`物件中取得。

```jsx
import { graphql, PageProps } from "gatsby"

interface Props {
  site: {
    siteMetadata: {
      title: string
    }
  }
}

const NotFoundPage: React.FC<PageProps<Props>> = ({ data, location }) => {
  // get your props from data
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="404: Not Found" />
      <h1>Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  )
}

export default NotFoundPage
```

### src/pages/index.js
將副檔名改成`.tsx`。

參考`404.jsx`將`PageProps`注入元件中。

```jsx
interface Props {
  allMarkdownRemark: any
  site: {
    siteMetadata: {
      title: string
    }
  }
}

const BlogIndex: React.FC<PageProps<Props>> = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <article key={node.fields.slug}>
            <header>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </section>
          </article>
        )
      })}
    </Layout>
  )
}

export default BlogIndex
```

### src/templates/blog-post.js
將副檔名改成`.tsx`。

參考`index.jsx`將`PageProps`注入元件中。

其中在下方第38行的pageContext，是gatsby用來記錄網誌上一篇/下一篇的工具。

```jsx
interface PageContext {
  fields: {
    slug: string
  }
  frontmatter: {
    title: string
  }
}

interface Props {
  markdownRemark: any
  site: {
    siteMetadata: {
      title: string
    }
  }
}

const BlogPostTemplate: React.FC<PageProps<Props>> = ({
  data,
  pageContext,
}) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const {
    previous,
    next,
  }: { previous?: PageContext; next?: PageContext } = pageContext

  return (
    <Layout location={window.location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article>
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
            }}
          >
            {post.frontmatter.title}
          </h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(1),
            }}
          >
            {post.frontmatter.date}
          </p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <footer>
          <Bio />
        </footer>
      </article>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate
```

### src/utils/typography.js
這裡沒有return虛擬DOM元件，所以副檔名改成`.ts`即可（不必是`.tsx`）。

要注意的是，`typography`與`typography-theme-wordpress-2016`這兩個套件在gatsby官方提供的懶人包當中，沒有typescript dependency。
就如同前面`seo.tsx`，當中的`react-helmet`一樣，我們要在`node_modules.d.ts`補上`typography`：
```typescript
// node_modules.d.ts
declare module "typography"
declare module "typography-theme-wordpress-2016"

declare module "react-helmet"
```

### /gatsby-node.js
最後，我們要到根目錄的`gatsby-node.js`，將部落格渲染的path，將副檔名從`.js`改成`.tsx`。
大約是在第7行的位置：
```javascript
const blogPost = path.resolve(`./src/templates/blog-post.tsx`)
```

費了一番功夫改成typescript，我們終於可以把localhost跑起來了！應該是可以成功運行的。
![](https://i.imgur.com/2RqyVVX.png)


