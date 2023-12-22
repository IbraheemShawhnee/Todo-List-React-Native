import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
const TaskPopup = ({ visible, onClose, onConfirmDelete }) => {
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={visible}
			onRequestClose={onClose}
		>
			<View style={styles.popupContainer}>
				<View style={styles.popupContent}>
					<TouchableOpacity onPress={onClose}>
						<Text style={styles.closeButton}>Close</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={onConfirmDelete}>
						<Text style={styles.deleteButton}>Delete</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	popupContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	popupContent: {
		backgroundColor: "#FFF",
		padding: 20,
		borderRadius: 10,
		alignItems: "center",
	},
	closeButton: {
		fontSize: 16,
		color: "#0e9beb",
		marginBottom: 10,
	},
	deleteButton: {
		fontSize: 16,
		color: "red",
	},
});

export default TaskPopup;
