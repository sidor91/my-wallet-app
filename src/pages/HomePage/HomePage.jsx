import { UserButton } from "../../components/UserButton/UserButton";
import { TransactionForm } from "../../components/TransactionForm/TransactionForm";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount } from "wagmi";
import { Container } from "./HomePage.styled";

export const HomePage = () => {
	const { isOpen } = useWeb3Modal();
	const { isConnected } = useAccount();

	return (
		<Container>
			<UserButton />
			{!isOpen && isConnected && <TransactionForm />}
		</Container>
	);
};
