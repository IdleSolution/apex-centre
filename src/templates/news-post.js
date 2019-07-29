import React from 'react'
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout/Layout';
import Img from "gatsby-image";
import { Helmet } from 'react-helmet';
import Aux from './../hoc/_Aux';
import { DiscussionEmbed } from "disqus-react";
import './news-post.scss'

const NewsPost = ({data}) => {
    const news = data.mainNews;
    console.log(news);
    const image = news.frontmatter.image.childImageSharp.fluid;

    const disqusShortname = "apex-centre";
    const disqusConfig = {
        url: `https://www.apex-centre.com/${news.frontmatter.path}`,
        identifier: news.id,
        title: news.frontmatter.title,
      };
      const canonicalLink = `https://www.apex-centre.com/${news.frontmatter.path}`

    return (
        <Aux>
            <Helmet>
                <title>Apex Centre - {news.frontmatter.title}</title>
                <meta name="description" content={news.frontmatter.description}/>
                <meta name='keywords' content={news.frontmatter.tags} />
                <meta name="og:title" content={news.frontmatter.title}/>
                <meta property="og:image" content={image.src}/>
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:site" content="@centre_apex" />
                <meta name="twitter:title" content={news.frontmatter.title} />
                <meta name="twitter:description" content={news.frontmatter.description} />
                <meta name="twitter:image" content={image.src} />
                <link rel="canonical" href={canonicalLink}/>
            </Helmet>
            <Layout>

                <main className='news__main'>
                    <article className='news__container'>
                        <div itemScope className='news__content'>
                                <div className='news__img-container'>
                                    <Img className='news__img' itemProp='image' fluid={image} alt="ApexLegends News Image"/>
                                </div>
                                <div className='news__info'>
                                    <h1 itemProp='name' className='news__heading'>{news.frontmatter.title}</h1>
                                    <div className='news__date-container'>
                                        <i className="fas fa-calendar-week news__date-icon"></i>
                                        <p itemProp='datePublished'>{news.frontmatter.date}</p>
                                    </div>
                                    <div className='news__text' dangerouslySetInnerHTML={{__html: news.html}}></div>
                                </div>

                        </div>

                        <div className='disqus-container'>
                            <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
                        </div>
                    </article>
                    <aside className='recommended__container'>
                        <div className='recommended__line'></div>
                        <h2 className='recommended__heading'>Trending</h2>
                        <div className='recommended__news'>
                            {data.asideNews.edges.map((news) => (
                                <Link to={news.node.frontmatter.path}><div className='recommended__single-news'>
                                    <div className='recommended__single-news-img'>
                                        <Img style={{height: '100%'}} fluid={news.node.frontmatter.image.childImageSharp.fluid} alt='Newest Apex News'/>
                                    </div>
                                    <div className='recommended__single-news-heading-container'>
                                        <h3 className='recommended__single-news-heading'>{news.node.frontmatter.title}</h3>
                                    </div>
                                </div></Link>
                            ))}
                        </div>
                    </aside>
                </main>

            </Layout>
        </Aux>


    )
}

export const newsQuery = graphql` query newPostByPath($currentPath: String!){
    mainNews: markdownRemark(frontmatter: { path: {eq: $currentPath} } ) {
        html
        id
        frontmatter {
            path
            description
            tags
            title
            date
            image {
                childImageSharp {
                    fluid(maxWidth: 1000) {
                      ...GatsbyImageSharpFluid
                    }
                }
            }
        }
    }
    asideNews: allMarkdownRemark(limit: 4 sort: {
        fields: [frontmatter___timePosted]
        order: DESC
      }) {
        edges {
            node {
                frontmatter {
                    path
                    title
                    image {
                        childImageSharp {
                            fluid(maxWidth: 300) {
                                ...GatsbyImageSharpFluid
                            }
                        }
                    }
                }
            }
        }
        
    }
}`



export default NewsPost;


