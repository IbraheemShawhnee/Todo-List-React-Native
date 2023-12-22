import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Svg, { Path, LinearGradient, Stop, G, Defs } from "react-native-svg";

const TaskOptionsPopup = ({ onDelete, onEdit, onClose, position }) => {
	const popupStyle = {
		left: position.x + 270,
		top: position.y + 40,
	};
	return (
		<View style={[styles.popupContainer, popupStyle]}>
			<View style={styles.popupContent}>
				<TouchableOpacity onPress={onEdit}>
					<View style={styles.optionButton}>
						<Svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 30 30"
							width={30}
							height={30}
						>
							<Path
								fillRule="evenodd"
								d="M6.515 19.743a.5.5 0 0 0-.121.196l-1.768 5.303a.5.5 0 0 0 .632.632l5.303-1.768a.5.5 0 0 0 .196-.12L25.953 8.79c.79-.791.791-2.052.007-2.836L24.546 4.54a2.007 2.007 0 0 0-2.836.007L6.515 19.743zm18.731-11.66a.997.997 0 0 0 .007-1.422l-1.414-1.414a1.006 1.006 0 0 0-1.421.007L21.01 6.661 23.84 9.49l1.407-1.408zm-4.943-.715 2.829 2.829-12.728 12.728-2.829-2.829L20.303 7.368zM5.89 24.615l1.198-3.592 2.391 2.39-3.59 1.202z"
								fill="#55BCF6"
								className="color000 svgShape"
							/>
						</Svg>
						<Text style={styles.optionPopup}>Edit</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={onDelete}>
					<View style={styles.optionButton}>
						<Svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 30 30"
							width={30}
							height={30}
						>
							<Path
								fill="none"
								stroke="#55BCF6"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.2}
								d="M6 8h19M23 9v14a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3V9m5-1V5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3M13 13v7M18 13v7"
								className="colorStroke000 svgStroke"
							/>
						</Svg>
						<Text style={styles.optionPopup}>Delete</Text>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	popupContainer: {
		position: "absolute",

		width: 120,
		backgroundColor: "#FFF",
		borderRadius: 5,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.29,
		shadowRadius: 1.65,

		elevation: 1,
		zIndex: 1,
	},
	popupContent: {
		padding: 10,
	},
	optionButton: {
		alignItems: "center",
		flexDirection: "row",
		fontSize: 16,
		margin: 5,
		color: "#0e9beb",
	},
	optionPopup: {
		fontSize: 16,
		marginLeft: 4,
		fontWeight: "300",
		color: "black",
	},
	closeButton: {
		fontSize: 16,
		color: "#555",
	},
});

export default TaskOptionsPopup;
