import { UserButton } from "../../components/UserButton/UserButton";
import { TransactionForm } from "../../components/TransactionForm/TransactionForm";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount } from "wagmi";
import {
	Container,
	MainHeding,
	SecondaryHeading,
	Header,
	Logo,
	RepoLink,
} from "./HomePage.styled";
import logo from "../../assets/logo.svg";

export const HomePage = () => {
	const { isOpen } = useWeb3Modal();
	const { isConnected } = useAccount();

	return (
		<Container>
			<Header>
				<Logo src={logo} />
				<UserButton />
			</Header>
			{!isConnected ? (
				<>
					<MainHeding>Welcome to My Wallet APP!</MainHeding>
					<SecondaryHeading>
						Please connect your wallet to start transfering
					</SecondaryHeading>
				</>
			) : null}
			{!isOpen && isConnected && <TransactionForm />}
			<RepoLink href="https://github.com/sidor91/my-wallet-app">
				Repo Link
			</RepoLink>
		</Container>
	);
};
