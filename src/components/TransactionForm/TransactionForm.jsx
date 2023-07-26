import {
	useSendTransaction,
	useAccount,
	useBalance,
	useWaitForTransaction,
} from "wagmi";
import { useState } from "react";
import { ethers } from "ethers";
import {
	Container,
	Header,
	Form,
	SubmitButton,
	CancelButton,
	WalletAddrInput,
	ValueInput,
	WalletAddrInputContainer,
	ValueInputContainer,
} from "./TransactionForm.styled";
import { useFormik } from "formik";
import * as Yup from "yup";
import { RotatingLines } from "react-loader-spinner";
import toast from "react-hot-toast";



export const TransactionForm = () => {
	const [checksumError, setChecksumError] = useState(null);
	const [hash, setHash] = useState('');
	const { address } = useAccount();
	const balanceData = useBalance({
		address,
	});

	const {
		// data: transactionData,
		isLoading: sendTransactionLoading,
		// isSuccess: transactionSuccess,
		sendTransactionAsync,
		reset,
	} = useSendTransaction({
		onSuccess() {
			toast.success("Transaction sent")
		}
	});

	const {
		// data: waitTransactionData,
		// isError,
		isLoading: waitTransactionLoading,
	} = useWaitForTransaction({
		hash,
		onSuccess() {
			toast.success("Transaction delivered successfully");
			formik.values.address = '';
			formik.values.amount = 0;
		},
	});

	const onSubmit = async (data) => {
	try {
		ethers.getAddress(data.address);
		const transaction = await sendTransactionAsync({
			to: data.address,
			value: ethers.parseEther(data.amount.toString()),
		});
		setHash(transaction.hash);
	} catch (error) {
		if (error.message.slice(0, 26)) toast.error("User rejected the request.");
		if (error.code === "INVALID_ARGUMENT")
		setChecksumError("The Checksum hasn't been passed");
	}
	};

	const initialValues = { address: '', amount: 0 };

		const validationSchema = Yup.object({
			address: Yup.string()
				.matches(/^0x[0-9A-Fa-f]{40}$/, "Invalid format")
				.required("Required"),
			amount: Yup.number()
				.min(0.000001, "The minimum amount is 0.000001")
				.max(
					Number(balanceData?.data.formatted),
					"The amount is above your balance"
				)
				.required("Required"),
		});

	var formik = useFormik({
		initialValues,
		onSubmit,
		validationSchema,
	});


	return (
		<Container>
			<Header>Make a transaction</Header>
			<Form onSubmit={formik.handleSubmit}>
				<WalletAddrInputContainer>
					<WalletAddrInput
						disabled={sendTransactionLoading || waitTransactionLoading}
						type="text"
						name="address"
						placeholder="Wallet address"
						onChange={(e) => {
							formik.handleChange(e);
							setChecksumError(null);
						}}
						value={formik.values.address}
						onBlur={formik.handleBlur}
					/>
					{formik.touched.address && formik.errors.address && (
						<div>{formik.errors.address}</div>
					)}
					{checksumError && <div>{checksumError}</div>}
				</WalletAddrInputContainer>
				<ValueInputContainer>
					<ValueInput
						disabled={sendTransactionLoading || waitTransactionLoading}
						name="amount"
						type="number"
						placeholder="Value"
						step="0.000001"
						onChange={formik.handleChange}
						value={formik.values.amount}
						onBlur={formik.handleBlur}
					/>
					{formik.touched.amount && formik.errors.amount && (
						<div>{formik.errors.amount}</div>
					)}
				</ValueInputContainer>
				<SubmitButton
					type="submit"
					disabled={sendTransactionLoading || waitTransactionLoading}
				>
					{sendTransactionLoading || waitTransactionLoading ? (
						<span style={{ marginRight: 10 }}>Loading...</span>
					) : (
						"Send"
					)}
					<RotatingLines
						strokeColor="grey"
						strokeWidth="5"
						animationDuration="0.75"
						width="30"
						visible={sendTransactionLoading || waitTransactionLoading}
					/>
				</SubmitButton>
				{waitTransactionLoading && (
					<div
						style={{
							marginTop: 20,
							marginLeft: "auto",
							marginRight: "auto",
							textAlign: "center",
						}}
					>
						<span style={{ color: "yellow" }}>
							Transaction complete is pending...Please wait
						</span>
					</div>
				)}
				{sendTransactionLoading && (
					<>
						<div
							style={{
								marginTop: 20,
								marginLeft: "auto",
								marginRight: "auto",
								textAlign: "center",
							}}
						>
							<span style={{ color: "yellow" }}>
								Please, confirm your transaction in MetaMask...
							</span>
						</div>
						<CancelButton type="button" onClick={() => reset()}>
							Cancel
						</CancelButton>
					</>
				)}
			</Form>
		</Container>
	);
};

