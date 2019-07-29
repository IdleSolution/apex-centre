import React from 'react';
import Layout from '../components/Layout/Layout';
import Link from 'gatsby-link';
import { graphql } from 'gatsby';
import Button from './../components/UI/Button/Button'
import { Helmet } from 'react-helmet';
import Aux from './../hoc/_Aux'
import Img from "gatsby-image";
import './all-news.scss'

const NavLink = props => {
    if (!props.test) {
      return <Link to={props.url}><Button>{props.text}</Button></Link>
    } else {
      return <span></span>
    }
  }

const allNews = ({ data, pageContext }) => {
    const { group, index, first, last } = pageContext
    const previousUrl = index - 1 === 1 ? '' : (index - 1).toString()
    const nextUrl = (index + 1).toString()
    let image;
    
    let news = group.map(post => {
        data.allMarkdownRemark.edges.forEach((img) => {
            if(img.node.frontmatter.path === post.node.frontmatter.path) {
                return image = img.node.frontmatter.image.childImageSharp.fluid
            }
        })
        return (
            <section className='all-news-single-container'>   
                <div className='all-news-img'><Link to={post.node.frontmatter.path}><Img style={{height: '100%', width: '100%'}} fluid={image}/></Link></div>
                <div className='all-news-single-info'>
                    <Link to={post.node.frontmatter.path}><h2 className='all-news-single-heading'>{post.node.frontmatter.title}</h2></Link>
                    <div className='all-news-single-date-container'>
                        <i className="fas fa-calendar-week all-news-single-icon"></i>
                        <p className='all-news-single-date'>{post.node.frontmatter.date}</p>
                    </div>
                    <p className='all-news-single-desc'>{post.node.frontmatter.description}</p>
                </div>
            </section>

        )
    })

    return (
        <Aux>
            <Helmet>
                <title>Apex Centre - All News</title>
                <meta name="description" content="Check out every recent Apex Legends news we have provided! Most fresh and quality content on the internet!"/>
                <link rel="canonical" href="https://www.apex-centre.com/all/news"/>
            </Helmet>
            <Layout>
                <h1 className='all-news__heading'>ALL NEWS</h1>
                <main className='all-news__container'>
                    {news}
                </main>

                <div className='all-news__btn-container'>
                    <NavLink test={first} url={`all/news/${previousUrl}`} text="Previous" />
                    <NavLink test={last} url={`all/news/${nextUrl}`} text="Next" />
                </div>

            </Layout>
        </Aux>
    )
}

export const pageQuery = graphql`
query ImageQuery {
        allMarkdownRemark {
            edges {
                node {
                    id
                    frontmatter {
                        image {
                            childImageSharp {
                                fluid(maxWidth: 1000) {
                                  ...GatsbyImageSharpFluid
                                }
                            }
                        }
                        path
                    }
                }
        }
    }
}
`

export default allNews;