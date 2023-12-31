import styled from "styled-components";

export const Button = styled.button`
	width: fit-content;
	height: 45px;
	border-radius: 6px;
	background-color: #8baa36;
	color: #fafafa;
	border: none;
	padding: 10px 15px;
	margin-left: auto;
	cursor: pointer;

	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: 1.12;

	&:hover {
		transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1) 0s;
		color: #22252a;
	}
`;

export const Balance = styled.span`
	margin-right: 10px;
`;

export const Account = styled.span`
`