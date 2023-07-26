import { UserButton } from "../../components/UserButton/UserButton";
import { TransactionForm } from "../../components/TransactionForm/TransactionForm";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount } from "wagmi";
import { Container } from "./HomePage.styled";
import logo from '../../assets/logo.svg';

export const HomePage = () => {
	const { isOpen } = useWeb3Modal();
	const { isConnected } = useAccount();

	return (
		<Container>
			<div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
				<img src={logo} width="60" height="60" />
				<UserButton />
			</div>
			{!isOpen && isConnected && <TransactionForm />}
		</Container>
	);
};
