import { UserButton } from "../../components/UserButton/UserButton";
import { TransactionForm } from "../../components/TransactionForm/TransactionForm";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount } from "wagmi";
import { Container } from "./HomePage.styled";
// import { useState } from "react";
// import { InfinitySpin } from "react-loader-spinner";

export const HomePage = () => {
	// const [isAppConnected, setIsAppConnected] = useState(false);
	const { isOpen } = useWeb3Modal();
	const { isConnected } = useAccount();

	return (
		<Container>
			<UserButton />
			{!isOpen && isConnected && <TransactionForm />}
		</Container>
	);

	// <InfinitySpin width="200" color="#4fa94d" />
};
