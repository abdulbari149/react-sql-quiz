import React, { PropsWithChildren } from "react";
import { ModalBody } from "react-bootstrap";
import { MdClose } from "react-icons/md";
import Modal, { Styles } from "react-modal";

const customStyles: Styles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		background: "#fefefe",
		width: "500px",
	},
	overlay: {
		backgroundColor: "#5c78905c",
	},
};

const buttonStyle: React.CSSProperties = {
	position: "absolute",
	top: 0,
	right: 0,
	border: "none",
	background: "none",
	cursor: "pointer",
	margin: "0 auto",
	display: 'grid'
};

const titleStyles: React.CSSProperties = {
	fontSize: 18,
	padding: 30,
	color: "black",
	width: "350px",
	textAlign: "center",
	margin: "0 auto",
};

Modal.setAppElement("#root");

export interface AppModalProps extends PropsWithChildren {
	open: boolean;
	text: string;
	handleClose: () => void;
}

const CustomModal: React.FunctionComponent<AppModalProps> = ({
	open,
	text,
	handleClose,
	children,
}) => {
	return (
		<div>
			<Modal isOpen={open} onRequestClose={handleClose} style={customStyles}>
				<ModalBody className="w-100% mx-auto">
					<p style={titleStyles}>{text}</p>
					<button onClick={handleClose} style={buttonStyle}>
						<MdClose
							fontSize={16}
							color="black"
							style={{ cursor: "pointer" }}
						/>
					</button>
					{children}
				</ModalBody>
			</Modal>
		</div>
	);
};

export default CustomModal;
