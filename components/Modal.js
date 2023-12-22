import React from "react";
import {
	Modal,
	Pressable,
	StyleSheet,
	Text,
	TouchableHighlight,
	TouchableOpacity,
	View,
} from "react-native";
import Svg, { Path } from "react-native-svg";

const EmptyInputModal = ({ isVisible, onClose }) => {
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={isVisible}
			onRequestClose={onClose}
		>
			<View style={styles.modalContainer}>
				<View style={styles.modalContent}>
					<Svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						width={50}
						height={50}
					>
						<Path
							d="M12,2a10.05,10.05,0,0,0,0,20.1A10.05,10.05,0,0,0,12,2Zm.71,16.68a1,1,0,0,1-1.09.21,1,1,0,0,1-.33-.21,1,1,0,0,1-.21-1.09,1,1,0,0,1,.21-.33,1,1,0,0,1,1.42,0,1,1,0,0,1,.21.33,1,1,0,0,1-.21,1.09ZM13,15.06a1,1,0,0,1-2,0V7a1,1,0,1,1,2,0Z"
							data-name="sign"
							fill="#ff0000"
							className="color000 svgShape"
						/>
					</Svg>
					<Text style={styles.modalText}>Input cannot be empty!</Text>
					<TouchableOpacity onPress={onClose}>
						<Text style={styles.modalButton}>Ok</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};
const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	modalContent: {
		backgroundColor: "#FFF",
		padding: 20,
		borderRadius: 10,
		alignItems: "center",
	},
	modalText: {
		fontSize: 18,
		marginBottom: 10,
	},
	modalButton: {
		fontSize: 16,
		color: "#0e9beb",
	},
});

export default EmptyInputModal;
