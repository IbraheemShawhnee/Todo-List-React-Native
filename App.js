import React, { useEffect, useRef, useState } from "react";
import {
	FlatList,
	Keyboard,
	KeyboardAvoidingView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import Svg, { G, Path, Defs, LinearGradient, Stop } from "react-native-svg";
import Task from "./components/Task";
import EmptyInputModal from "./components/Modal";
import TaskOptionsPopup from "./components/TaskOptionsPopup";
import { TasksContext } from "./components/context";

export default function App() {
	const [task, setTask] = useState(null);
	const [modal, setModal] = useState(false);
	let [taskItems, setTaskItems] = useState([]);
	const [taskOptionsVisible, setTaskOptionsVisible] = useState(false);
	const [selectedTaskPosition, setSelectedTaskPosition] = useState({
		x: 0,
		y: 0,
	});
	const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
	const taskRefs = useRef([]);
	const [isEditingTask, setIsEditingTask] = useState(false);

	const handleAddTask = (text) => {
		if (task === null) {
			setModal(true);
			return;
		}
		Keyboard.dismiss();
		setTaskItems([...taskItems, text]);
		setTask(null);
	};

	const completeTask = (index) => {
		setSelectedTaskIndex(index);
		setModal(true);
	};

	const handleConfirmDelete = () => {
		if (selectedTaskIndex !== null) {
			let copyItems = [...taskItems];
			copyItems.splice(selectedTaskIndex, 1);
			setTaskItems(copyItems);
			setSelectedTaskIndex(null);
			setModal(false);
		}
	};

	const handleTaskPress = (index) => {
		taskRefs.current[index]?.measure((x, y, width, height, pageX, pageY) => {
			setSelectedTaskPosition({ x: pageX, y: pageY });
			setTaskOptionsVisible(true);
		});
		setSelectedTaskIndex(index);
	};

	const handleDeleteTask = () => {
		if (selectedTaskIndex !== null) {
			let copyItems = [...taskItems];
			copyItems.splice(selectedTaskIndex, 1);
			setTaskItems(copyItems);
			setSelectedTaskIndex(null);
			setTaskOptionsVisible(false);
		}
	};

	const handleEditTask = () => {
		setIsEditingTask(true);
		setTaskOptionsVisible(false);
	};

	const handleTaskUpdate = (editedText) => {
		if (selectedTaskIndex !== null) {
			let copyItems = [...taskItems];
			copyItems[selectedTaskIndex] = editedText;
			setTaskItems(copyItems);
			setSelectedTaskIndex(null);
			setIsEditingTask(false);
		}
	};
	const handleCloseTaskOptions = () => {
		setSelectedTaskIndex(null);
		setTaskOptionsVisible(false);
	};
	useEffect(() => {
		console.log(taskItems);
	}, [taskItems]);

	return (
		<TasksContext.Provider value={{ taskItems, setTaskItems }}>
			<TouchableWithoutFeedback onPress={() => handleCloseTaskOptions()}>
				<View style={styles.container}>
					<View style={styles.tasksWrapper}>
						<Text style={styles.sectionTitle}>Today's Tasks</Text>
						<View style={styles.items}>
							<FlatList
								data={taskItems}
								renderItem={({ item, index }) => (
									<TouchableOpacity
										onPress={() => {
											handleTaskPress(index);
											setIsEditingTask(false);
										}}
										ref={(ref) => (taskRefs.current[index] = ref)}
									>
										<Task
											text={item}
											onEditText={(editedText) => handleTaskUpdate(editedText)}
											isEditing={isEditingTask && selectedTaskIndex === index}
											setIsEditingTask={setIsEditingTask}
											index={index}
										/>
									</TouchableOpacity>
								)}
								keyExtractor={(item, index) => index.toString()}
								contentContainerStyle={{ paddingBottom: 200 }}
							/>
						</View>
					</View>
					<KeyboardAvoidingView
						behavior={Platform.OS === "ios" ? "padding" : "height"}
						style={styles.writeTaskWrapper}
					>
						<TextInput
							style={styles.input}
							placeholder="Write a task"
							value={task}
							onChangeText={(text) => setTask(text)}
						/>
						<TouchableOpacity onPress={() => handleAddTask(task)}>
							<View style={styles.addWrapper}>
								<Text style={styles.addText}>
									<Svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 64 64"
										width={55}
										height={55}
									>
										<G
											filter="url(#a)"
											fill="#000000"
											className="color000 svgShape"
										>
											<Path
												fill="url(#b)"
												fillRule="evenodd"
												d="M32 58C46.3594 58 58 46.3594 58 32C58 17.6406 46.3594 6 32 6C17.6406 6 6 17.6406 6 32C6 46.3594 17.6406 58 32 58ZM28 18C28 15.7909 29.7909 14 32 14C34.2091 14 36 15.7909 36 18V28H46C48.2091 28 50 29.7909 50 32C50 34.2091 48.2091 36 46 36H36V46C36 48.2091 34.2091 50 32 50C29.7909 50 28 48.2091 28 46V36H18C15.7909 36 14 34.2091 14 32C14 29.7909 15.7909 28 18 28H28V18Z"
												clipRule="evenodd"
											/>
										</G>
										<Defs>
											<LinearGradient
												id="b"
												x1={32}
												x2={32}
												y1={6}
												y2={58}
												gradientUnits="userSpaceOnUse"
											>
												<Stop
													stopColor="#0e9beb"
													className="stopColor97EB0E svgShape"
												/>
												<Stop
													offset={1}
													stopColor="#55bcf6"
													className="stopColor19B90B svgShape"
												/>
											</LinearGradient>
										</Defs>
									</Svg>
								</Text>
							</View>
						</TouchableOpacity>
					</KeyboardAvoidingView>
					<EmptyInputModal isVisible={modal} onClose={() => setModal(false)} />
					{taskOptionsVisible && (
						<TaskOptionsPopup
							onDelete={handleDeleteTask}
							onEdit={handleEditTask}
							onClose={handleCloseTaskOptions}
							position={selectedTaskPosition}
						/>
					)}
				</View>
			</TouchableWithoutFeedback>
		</TasksContext.Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#EBEAED",
	},
	tasksWrapper: {
		paddingTop: 80,
		paddingHorizontal: 20,
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: "bold",
	},
	items: {
		marginTop: 30,
	},
	writeTaskWrapper: {
		position: "absolute",
		bottom: 60,
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
	},
	input: {
		paddingVertical: 15,
		paddingHorizontal: 15,
		backgroundColor: "#FFF",
		borderRadius: 10,
		borderColor: "#C0C0C0",
		borderWidth: 1,
		width: 250,
	},
	addWrapper: {},
	addText: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
});
