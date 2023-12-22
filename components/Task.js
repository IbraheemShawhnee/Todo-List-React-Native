import React, { useContext, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	TextInput,
	Button,
} from "react-native";
import Svg, { Rect, Path } from "react-native-svg";
import { TasksContext } from "./context";

const Task = ({ text, onEditTask, isEditing, setIsEditingTask, index }) => {
	const [editedText, setEditedText] = useState(text);
	const { taskItems, setTaskItems } = useContext(TasksContext);

	const handleEditDone = () => {
		setTaskItems((prevItems) => {
			const updatedItems = [...prevItems];
			updatedItems[index] = editedText;
			return updatedItems;
		});
		setIsEditingTask(false);
	};

	return (
		<View style={styles.item}>
			<View style={styles.itemLeft}>
				<TouchableOpacity style={styles.square}>
					<Svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						width={30}
						height={30}
					>
						<Rect
							width={18}
							height={18}
							x={3}
							y={4}
							fill="#55bcf6"
							rx={3}
							className="color55abff svgShape"
						/>
						<Path
							fill="#282c2e"
							d="M15 13H9a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2zM15 17H9a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2z"
							className="colordadde2 svgShape"
						/>
						<Path
							fill="#0098ee"
							d="M14,2H10a3,3,0,0,0,0,6h4a3,3,0,0,0,0-6Z"
							className="color0078ee svgShape"
						/>
					</Svg>
				</TouchableOpacity>
				{isEditing ? (
					<TextInput
						style={styles.editInput}
						value={editedText}
						onChangeText={(text) => setEditedText(text)}
					/>
				) : (
					<Text style={styles.itemText}>{text}</Text>
				)}
			</View>
			{isEditing ? (
				<TouchableOpacity
					style={styles.doneButton}
					onPress={() => handleEditDone(index)}
				>
					<Text style={styles.doneButtonText}>Done</Text>
				</TouchableOpacity>
			) : (
				<TouchableOpacity
					style={styles.circular}
					onPress={() => setIsEditing(true)}
				></TouchableOpacity>
			)}
		</View>
	);
};
const styles = StyleSheet.create({
	item: {
		backgroundColor: "#FFF",
		padding: 15,
		borderRadius: 10,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 20,
	},
	itemLeft: {
		flexDirection: "row",
		alignItems: "center",
		flexWrap: "wrap",
	},
	editInput: {
		maxWidth: "100%",
		width: "70%",
		color: "black",
		height: 30,
		backgroundColor: "#EBEAED",
	},

	doneButton: {
		backgroundColor: "#55BCF6",
		borderRadius: 5,
		padding: 8,
	},

	doneButtonText: {
		color: "#FFF",
		fontSize: 16,
	},
	square: {
		width: 28,
		height: 28,
		alignItems: "center",
		justifyContent: "center",
		opacity: 0.4,
		borderRadius: 5,
		marginRight: 15,
	},
	itemText: {
		maxWidth: "80%",
	},
	circular: {
		width: 12,
		height: 12,
		borderColor: "#55BCF6",
		borderWidth: 2,
		borderRadius: 5,
	},
});
export default Task;
