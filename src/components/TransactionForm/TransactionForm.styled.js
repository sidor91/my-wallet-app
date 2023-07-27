import styled from "styled-components";
import { media } from "../../utils/media";

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: auto;
	margin-right: auto;
	margin-top: 100px;
	width: 100%;
	border-radius: 30px;
	box-sizing: border-box;
	padding: 32px 28px 40px;
	background-color: #2a2c36;
	box-shadow: 0px 4px 48px 0px rgba(0, 0, 0, 0.1);

	@media ${media.mobile} {
		width: 335px;
	}

	@media ${media.tablet} {
		width: 500px;
	}
`;

export const Header = styled.h1`
	color: #fafafa;
	font-size: 24px;
	font-style: normal;
	font-weight: 600;
	line-height: 28px;
	letter-spacing: -0.48px;

	font-size: 24px;
	font-style: normal;
	font-weight: 600;
	line-height: 1.16;
	letter-spacing: -0.48px;

	@media ${media.tablet} {
		font-size: 28px;
		line-height: 1.07;
		letter-spacing: -0.56px;
	}
`;

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	margin-top: 18px;
	align-items: center;
	justify-content: center;
`;

export const Input = styled.input`
	width: 100%;
	height: 45px;
	background: transparent;
	border: 1px solid #57575e;
	border-radius: 6px;
	padding: 13.5px 20px;
	color: #fafafa;
	box-sizing: border-box;
	padding-right: 40px;

	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	letter-spacing: -0.28px;

	@media ${media.tablet} {
		padding-right: 45px;
		height: 59px;
		font-size: 18px;
		letter-spacing: -0.36px;
	}

	&:hover {
		transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1) 0s;
		border-color: #fafafa;
		&::placeholder {
			transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1) 0s;
			color: #fafafa;
			opacity: 1;
		}
	}

	&::placeholder {
		color: #fff;
		opacity: 0.5;
	}
`;

export const WalletAddrInput = styled(Input)`
	
	border-color: ${(prop) => {
		if (prop.$haserror || prop.$checksumerror) {
			return "red";
		} else if (prop.$correct) {
			return "green";
		}
	}};

`;

export const ValueInput = styled(Input)`
	border-color: ${(prop) => {
		if (prop.$haserror) {
			return "red";
		} else if (prop.$correct) {
			return "green";
		}
	}};
`;

export const SubmitButton = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 45px;
	border-radius: 6px;
	background-color: #8baa36;
	color: #fafafa;
	border: none;
	padding-top: 14px;
	padding-bottom: 14px;
	margin-top: 16px;

	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: 1.12;

	&:hover {
		transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1) 0s;
		color: #22252a;
		cursor: pointer;
	}

	@media ${media.tablet} {
		margin-top: 28px;
		height: 59px;
	}
`;

export const CancelButton = styled(SubmitButton)`
	background-color: #fafafa;
	color: black;

	&:hover {
		transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1) 0s;
		color: #fafafa;
		background-color: #8baa36;
		cursor: pointer;
	}
`;

const InputContainer = styled.div`
	position: relative;
	margin-bottom: 12px;
	min-width: 100%;
	position: relative;
	color: #fff;

	@media ${media.tablet} {
		margin-bottom: 24px;
	}
`;

export const WalletAddrInputContainer = styled(InputContainer)`

`;

export const ValueInputContainer = styled(InputContainer)`
margin-bottom: 0;
`;

export const InputErrorContainer = styled.div`
	margin-top: 8px;
	color: red;
`;

export const InputWarningContainer = styled.div`
	margin-top: 20px;
	margin-left: auto;
	margin-right: auto;
	text-align: center;
`;

export const InputWarningText = styled.span`
	color: yellow;
`;

export const SuccessStatusIcon = styled.img`
	width: 18px;
	height: 18px;
	position: absolute;
	top: 13.5px;
	right: 14px;
	transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1) 0s;

	@media ${media.tablet} {
		top: 17.5px;
		right: 18px;
		width: 20px;
		height: 20px;
	}
`;