import React from "react"
import { Link } from "gatsby"
import styled, { css } from "styled-components"
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"

import Icon from "../components/Icon"

const hoverLine = css`
	height: 2px;
	width: 0;
	background: #6b6b6b;
	position: absolute;
	bottom: 0;
	left: 50%;
	transition: 0.3s all;
`

const PreNextNav = styled.nav`
  margin: 0 auto;
	padding: 24px 56px;
	width: 100%;
	max-width: 1140px;
	li{
		line-height: 32px;
	}
	@media (max-width: 576px) {
    padding: 0 30px 30px 30px;
		li {
			&:nth-child(1) {
				margin-bottom: 8px;
			}
		}
  }
`

const UnordLists = styled.ul`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	list-style: none;
	padding: 0;
	li {
		.fa-layers{
			font-size: 16px;
		}
		&:nth-child(1){
			padding: 0 8px 0 0;
			&::before{
				content: "";
				${hoverLine}
			}
		}
		&:nth-child(2){
			padding: 0 0 0 8px;
			&::before{
				content: "";
				${hoverLine}
			}
		}
		&:hover, &:active{
			color: #6b6b6b;
			a {
				color: inherit;
			}
			&:nth-child(1){
				&::before{
					width: 100%;
					transform: translateX(-50%);
				}
			}
			&:nth-child(2){
				&::before{
					width: 100%;
					transform: translateX(-50%);
				}
			}
		}
	}
	@media (max-width: 576px) {
    li {
			flex: 1;
			line-height: 1em;
			a {
				display: flex;
				.title{
					flex: 1;
				}
			}
			&:nth-child(1){
				&::before{
					content: none;
				}
			}
			&:nth-child(2){
				text-align: right;
				&::before{
					content: none;
				}
			}
		}
  }
`

interface PageContext {
  fields: {
    slug: string
  }
  frontmatter: {
    title: string
  }
}

interface Props {
	previous: PageContext
	next: PageContext
}

const FooterNav: React.FC<Props> = ({
	previous,
	next
}) => (
	<PreNextNav>
		<UnordLists>
			<li>
				{next && (
					<Link to={next.fields.slug} rel="next">
						<Icon icon={faChevronLeft} />
						<span className="title">{next.frontmatter.title}</span>
					</Link>
				) || 
					<Link to="/" rel="home">
						<Icon icon={faChevronLeft} />
						<span className="title">Home</span>
					</Link>
				}
			</li>
			<li>
				{previous && (
					<Link to={previous.fields.slug} rel="prev">
						<span className="title">{previous.frontmatter.title}</span>
						<Icon icon={faChevronRight} />
					</Link>
				) || 
				<Link to="/" rel="home">
					<span className="title">Home</span>
					<Icon icon={faChevronRight} />
				</Link>
				}
			</li>
		</UnordLists>
	</PreNextNav>
)

export default FooterNav