import {
	useSendTransaction,
	useAccount,
	useBalance,
	useWaitForTransaction,
} from "wagmi";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import {
	Container,
	Header,
	Form,
	SubmitButton,
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
		data: transactionData,
		isLoading: sendTransactionLoading,
		isSuccess: transactionSuccess,
		sendTransaction,
		sendTransactionAsync,
	} = useSendTransaction({
		onSuccess() {
			toast("Transaction sent")
		}
	});
	const {
		data: waitTransactionData,
		isError,
		isLoading: waitTransactionLoading,
	} = useWaitForTransaction({
		hash,
		onSuccess(data) {
			toast(data.status)
			// console.log("Success", data);
		},
	});

	const onSubmit = async (data) => {
	try {
		const checkSum = ethers.getAddress(data.address);
		const transaction = await sendTransactionAsync({
			to: data.address,
			value: ethers.parseEther(data.amount.toString()),
		});
		setHash(transaction.hash);
	} catch (error) {
		if (error.message.slice(0, 26)) toast("User rejected the request.");
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

	const formik = useFormik({
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
						style={{ marginTop: 20, marginLeft: "auto", marginRight: "auto" }}
					>
						<span style={{ color: "yellow" }}>
							Waiting for transaction complete...
						</span>
					</div>
				)}
				{sendTransactionLoading && (
					<div
						style={{ marginTop: 20, marginLeft: "auto", marginRight: "auto" }}
					>
						<span style={{ color: "yellow" }}>
							Please, confirm your transaction in MetaMask...
						</span>
					</div>
				)}
			</Form>
		</Container>
	);
};

