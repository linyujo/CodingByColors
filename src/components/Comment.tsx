import React from "react"
import Valine from "gatsby-plugin-valine"
import styled from "styled-components"

const Wrapper = styled.div`
	margin-top: 4em;
`

const Comment: React.FC<{}> = () => (
	<Wrapper>
		<Valine appId="YxKsvUIow3SlqL28pE2MuzxD-MdYXbMMI" appKey="IFfDKahJFaLoCsvYxuxXXrie" />
	</Wrapper>
);

export default Comment