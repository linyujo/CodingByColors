module.exports = {
  siteMetadata: {
    title: `coding by colors`,
    author: {
      name: `Raine Lin`
    },
    description: `A personal technical blog about web front end development and visual art laboratory`,
    siteUrl: `https://codingbycolors.me`
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/tweets`,
        name: `tweets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
					`gatsby-remark-emoji`,
					`gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
		//`gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `coding by colors`,
        short_name: `cdbc`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/icon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    `gatsby-plugin-sass`,
		// Valine Comments Plugin
		{
			resolve: `gatsby-plugin-valine`,
			options: {
					appId: `YxKsvUIow3SlqL28pE2MuzxD-MdYXbMMI`,
					appKey: `IFfDKahJFaLoCsvYxuxXXrie`,
					avatar: `robohash`,
					lang: `en`
			},
		},
    // this (optional) plugin enables Progressive Webz App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
		// `gatsby-plugin-offline`,
		`gatsby-plugin-styled-components`,
  ],
}
