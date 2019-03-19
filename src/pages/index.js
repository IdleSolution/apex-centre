import React, { Component } from 'react'
import Layout from './../components/Layout/Layout';
import Header from './../components/Header/Header';
import NewsPreviewsContainer from './../components/News/NewsPreviewsContainer/NewsPreviewsContainer';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import Aux from './../hoc/Aux'
import icon from './../../static/img/favicon.ico'

class Home extends Component {

    render() {
        console.log(this.props.data.allNews)
        return (
            <Aux>
                <Helmet>
                    <html lang="en" />
                    <title>Apex Centre - Your #1 Source of Apex Legends Info</title>
                    <meta name="description" content="The best website dedicated to Apex Legends! Find the most recent and important information about the game | News | Guides | Game Knowledge"/>
                    <meta name="og:title" content="Apex Centre"/>
                    <meta name="keywords" content="apex, news, centre, legends, tracker, stats"/>
                    <meta property="og:image" content="https://pbs.twimg.com/media/DzP4GgXUUAAWi8Q.jpg:large"/>
                    <meta property="og:description" content="The best website dedicated to Apex Legends! Find the most recent and important information about the game" />
                    <link rel="shortcut icon" type="image/x-icon" href={icon}/>
                    <link rel="canonical" href="https://www.apex-centre.com/"/>

                </Helmet>
                <Layout>
                    <Header
                        news1={this.props.data.singleNews.frontmatter} 
                        news2={this.props.data.allNews.edges[0].node.frontmatter} 
                        news3={this.props.data.allNews.edges[1].node.frontmatter}
                    />
                    
                    <NewsPreviewsContainer news={this.props.data.allNews.edges} />
                </Layout>
            </Aux>
        )
    }


}

  export const pageQuery = graphql`
  query NewsIndexQuery {
          allNews: allMarkdownRemark(limit: 8 
            sort: {
                fields: [frontmatter___timePosted]
                order: DESC
              }
        ) {
              edges {
                  node {
                      id
                      frontmatter {
                          title
                          description
                          image {
                              childImageSharp {
                                  fluid(maxWidth: 1800) {
                                    ...GatsbyImageSharpFluid
                                  }
                              }
                          }
                          date
                          path
                      }
                  }
          }
      }

        singleNews: markdownRemark(
            frontmatter: {
              path: {
                eq: "news/check-your-stats"
              }
            }
        
          ) {
            frontmatter {
              title
              description
              path
              image {
                  childImageSharp {
                      fluid(maxWidth: 1800) {
                          ...GatsbyImageSharpFluid
                      }
                  }
              }
            }
          }
  }
`

export default Home;