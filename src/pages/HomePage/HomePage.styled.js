import styled from "styled-components";
import { media } from "../../utils/media";

export const Container = styled.div`
	display: flex;
	flex-direction: column;

	width: 100vw;
	min-height: 100vh;

	padding: 20px;
	/* padding-top: 20px;
	padding-left: 20px;
	padding-right: 20px; */
	background-color: #fafafa;
	box-sizing: border-box;

	@media ${media.tablet} {
		/* padding-top: 30px;
		padding-left: 40px;
		padding-right: 40px; */
		padding: 30px;
	}
`;

export const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const Logo = styled.img`
width: 60px;
height: 60px;
`

export const MainHeding = styled.h1`
	font-size: 24px;
	text-align: center;
	margin: 50px auto 0;
	color: black;

	@media ${media.tablet} {
		font-size: 36px;
	}
`;
export const SecondaryHeading = styled.h2`
	font-size: 12px;
	text-align: center;
	margin: 20px auto 0;
	color: black;

	@media ${media.tablet} {
		font-size: 24px;
	}
`;

export const RepoLink = styled.a`
margin: auto auto 0;
text-decoration: underline;
`