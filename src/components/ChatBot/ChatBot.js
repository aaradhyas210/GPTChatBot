import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, TextareaAutosize, styled } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { COLORS } from "../styleSpecs/Color";

const ChatBot = () => {
	const [showChatWindow, setShowChatWindow] = useState(false);
	const [chatHistory, setChatHistory] = useState([]);
	const [messageValue, setMessageValue] = useState("");
	const endpoint = "https://webscraperbackend.azurewebsites.net/ask";

	const getChatResponse = async (value) => {
		fetch(endpoint + "?question=" + value)
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else {
					throw new Error("Something went wrong ...");
				}
			})
			.then((data) => {
				const chat = {
					message: data.message,
					sender: "bot",
				};
				setChatHistory((curr) => [...curr, chat]);
			})
			.catch((error) => console.log(error));
	};

	const onMessageInputChange = (e) => {
		if (e.key === "Enter" && !e.shiftKey) return;
		setMessageValue(e.target.value);
	};

	const checkSendMessage = (e) => {
		if (e.key === "Enter" && !e.shiftKey) {
			addNewChat(e.target.value);
		}
	};

	const addNewChat = (value) => {
		if (value === "") return;
		const chat = {
			message: value,
			sender: "client",
		};
		setChatHistory([...chatHistory, chat]);
		setMessageValue("");
		setTimeout(() => {
			getChatResponse(value);
		}, 1000);
	};

	useEffect(() => {
		let chat = document.getElementById("chat");
		if (chat) {
			chat.scrollTop = chat?.scrollHeight;
		}
	}, [showChatWindow, chatHistory]);

	return (
		<>
			<ChatBotIcon onClick={() => setShowChatWindow((val) => !val)}>
				{showChatWindow ? (
					<CloseIcon sx={{ color: "#FFFFFF", fontSize: "30px" }} />
				) : (
					<BotIcon className="small" src="./Bot_Pwc.png" />
				)}
			</ChatBotIcon>

			{showChatWindow && (
				<ChatBotWindow>
					<HeaderSection>
						<AvatarSection>
							<BotIcon
								className="large"
								src="./Bot_Pwc.png"
								onClick={() => setShowChatWindow(true)}
							/>
						</AvatarSection>
						<NameSection>
							<MainName>ChatBot Support</MainName>
							<OnlineSection>
								<OnlineBubble />
								<OnlineStatus>Online</OnlineStatus>
							</OnlineSection>
						</NameSection>
					</HeaderSection>
					<ChatContainer id="chat">
						<ChatSection>
							{chatHistory?.map((chat) => (
								<ChatBubbleWrapper
									className={
										chat.sender === "client" ? "ClientChat" : "BotChat"
									}>
									<ChatBubbleSection
										className={
											chat.sender === "client" ? "ClientChat" : "BotChat"
										}>
										<IdentifierText>
											{chat.sender === "client" ? "You" : "ChatBot"}
										</IdentifierText>
										<ChatBubble
											className={
												chat.sender === "client" ? "ClientChat" : "BotChat"
											}>
											{chat.message}
										</ChatBubble>
									</ChatBubbleSection>
								</ChatBubbleWrapper>
							))}
						</ChatSection>
					</ChatContainer>

					<MessageSection>
						<MessageInput
							onChange={onMessageInputChange}
							onKeyUp={checkSendMessage}
							value={messageValue}
							maxRows={1}
							placeholder="Enter your message..."
						/>
						<SendButton onClick={() => addNewChat(messageValue)}>
							<SendIcon sx={{ color: COLORS.primary, fontSize: "30px" }} />
						</SendButton>
					</MessageSection>
				</ChatBotWindow>
			)}
		</>
	);
};

const ChatBotIcon = styled(IconButton)({
	position: "fixed",
	bottom: "35px",
	right: "35px",
	zIndex: 1000,
	width: "50px",
	height: "50px",
	backgroundColor: COLORS.primary,
	"&:hover": {
		opacity: 0.8,
		backgroundColor: COLORS.primary,
	},
});

const BotIcon = styled("img")({
	"&.small": {
		width: "43px",
	},
	"&.large": {
		width: "75px",
	},
});

const ChatBotWindow = styled("div")({
	position: "fixed",
	bottom: "90px",
	right: "50px",
	height: "450px",
	width: "300px",
	backgroundColor: "#FFFFFF",
	borderRadius: "10px",
	boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
	zIndex: 2000,
	display: "flex",
	flexDirection: "column",
});

const HeaderSection = styled("div")({
	height: "70px",
	backgroundColor: COLORS.primary,
	borderRadius: "10px 10px 0px 0px",
	display: "flex",
	alignItems: "center",
	padding: "10px 20px",
});

const AvatarSection = styled("div")({
	width: "60px",
	height: "60px",
	borderRadius: "50%",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	position: "relative",
});

const OnlineBubble = styled("div")({
	width: "10px",
	height: "10px",
	backgroundColor: "#175D2D",
	borderRadius: "50%",
	marginRight: "5px",
});

const NameSection = styled("div")({
	display: "flex",
	flexDirection: "column",
	marginLeft: "20px",
	color: "#FFFFFF",
	alignItems: "flex-start",
	justifyContent: "center",
});

const MainName = styled("div")({
	fontSize: "20px",
	fontWeight: 600,
	color: "#000000",
});

const OnlineSection = styled("div")({
	display: "flex",
	alignItems: "center",
	marginTop: "5px",
});

const OnlineStatus = styled("div")({
	fontSize: "15px",
	fontWeight: 400,
	color: "rgba(0, 0, 0, 0.5)",
});

const ChatContainer = styled("div")({
	height: "310px",
	overflowY: "auto",
	flexGrow: 1,
	display: "flex",
	flexDirection: "column",
});

const ChatSection = styled("div")({
	backgroundColor: "#EEEEEE",
	display: "flex",
	flexDirection: "column",
	justifyContent: "flex-end",
	padding: "10px",
	flexGrow: 1,
});

const ChatBubbleWrapper = styled("div")({
	width: "100%",
	display: "flex",
	"&.BotChat": {
		justifyContent: "flex-start",
	},
	"&.ClientChat": {
		justifyContent: "flex-end",
	},
});

const ChatBubbleSection = styled("div")({
	width: "80%",
	display: "flex",
	marginBottom: "10px",
	flexDirection: "column",
	border: "none",
	"&.BotChat": {
		alignItems: "flex-start",
	},
	"&.ClientChat": {
		alignItems: "flex-end",
	},
});

const IdentifierText = styled("div")({
	fontSize: "10px",
	fontWeight: 500,
	color: "rgba(0, 0, 0, 0.4)",
	marginBottom: "7px",
});

const ChatBubble = styled("div")({
	padding: "15px",
	fontSize: "12px",
	zIndex: 1000,
	textAlign: "left",
	whiteSpace: "pre-wrap",
	"&.BotChat": {
		backgroundColor: COLORS.primary,
		color: "rgb(0, 0, 0, 0.7)",
		borderRadius: "5px 20px 20px 20px",
	},
	"&.ClientChat": {
		backgroundColor: "#FFFFFF",
		color: "#000000",
		borderRadius: "20px 5px 20px 20px",
	},
});

const MessageSection = styled("div")({
	height: "50px",
	backgroundColor: "#EEEEEE",
	borderRadius: "0px 0px 10px 10px",
	display: "flex",
	alignItems: "center",
	padding: "0px 10px",
	justifyContent: "space-between",
});

const MessageInput = styled(TextareaAutosize)({
	padding: "8px",
	width: "80%",
	fontFamily: "inherit",
	backgroundColor: "#FFFFFF",
	borderRadius: "10px",
	resize: "none",
	borderColor: COLORS.primary,
	borderStyle: "dashed",
	"&:focus": {
		outline: "none",
	},
});

const SendButton = styled(IconButton)({
	backgroundColor: "none",
	height: "35px",
	width: "35px",
	borderRadius: "50%",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
});

export default ChatBot;
