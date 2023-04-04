import React, { useEffect, useState } from "react";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, TextareaAutosize, styled } from "@mui/material";
import SendTimeExtensionIcon from "@mui/icons-material/SendTimeExtension";
import SendIcon from "@mui/icons-material/Send";

const ChatBot = () => {
	const [showChatWindow, setShowChatWindow] = useState(false);

	useEffect(() => {
		let chat = document.getElementById("chat");
		if (chat) {
			chat.scrollTop = chat?.scrollHeight;
		}
	}, [showChatWindow]);

	return (
		<>
			<ChatBotIcon>
				{showChatWindow ? (
					<CloseIcon
						sx={{ color: "#FFFFFF", fontSize: "30px" }}
						onClick={() => setShowChatWindow(false)}
					/>
				) : (
					<SmartToyIcon
						sx={{ color: "#FFFFFF", fontSize: "30px" }}
						onClick={() => setShowChatWindow(true)}
					/>
				)}
			</ChatBotIcon>

			{showChatWindow && (
				<ChatBotWindow>
					<HeaderSection>
						<AvatarSection>
							<SendTimeExtensionIcon
								sx={{ color: "#A32020", fontSize: "40px" }}
							/>
							<OnlineBubble />
						</AvatarSection>
						<NameSection>
							<MainName>ChatBot Support</MainName>
							<OnlineStatus>Online</OnlineStatus>
						</NameSection>
					</HeaderSection>
					<ChatContainer id="chat">
						<ChatSection>
							<ChatBubbleWrapper className="ClientChat">
								<ChatBubbleSection className="ClientChat">
									<IdentifierText>You</IdentifierText>
									<ChatBubble className="ClientChat">
										Lorem ipsum dolor, sit amet consectetur adipisicing elit.
										Sapiente vero porro necessitatibus nam rem fuga ea, id, nisi
										quae incidunt fugit dolorum magni. Quaerat ex, illum totam
										accusantium rem tenetur?
									</ChatBubble>
								</ChatBubbleSection>
							</ChatBubbleWrapper>

							<ChatBubbleWrapper className="BotChat">
								<ChatBubbleSection className="BotChat">
									<IdentifierText>ChatBot Support</IdentifierText>
									<ChatBubble className="BotChat">
										Lorem ipsum dolor, sit amet consectetur adipisicing elit.
										Sapiente vero porro necessitatibus nam rem fuga ea, id, nisi
										quae incidunt fugit dolorum magni. Quaerat ex, illum totam
										accusantium rem tenetur?
									</ChatBubble>
								</ChatBubbleSection>
							</ChatBubbleWrapper>

							<ChatBubbleWrapper className="ClientChat">
								<ChatBubbleSection className="ClientChat">
									<IdentifierText>You</IdentifierText>
									<ChatBubble className="ClientChat">
										Lorem ipsum dolor, sit amet consectetur adipisicing elit.
										Sapiente vero porro necessitatibus nam rem fuga ea, id, nisi
										quae incidunt fugit dolorum magni. Quaerat ex, illum totam
										accusantium rem tenetur?
									</ChatBubble>
								</ChatBubbleSection>
							</ChatBubbleWrapper>
						</ChatSection>
					</ChatContainer>

					<MessageSection>
						<MessageInput maxRows={1} placeholder="Enter your message..." />
						<SendButton>
							<SendIcon sx={{ color: "#FFFFFF", fontSize: "20px" }} />
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
	backgroundColor: "#A32020",
	"&:hover": {
		opacity: 0.8,
		backgroundColor: "#A32020",
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
});

const HeaderSection = styled("div")({
	height: "70px",
	backgroundColor: "#A32020",
	borderRadius: "10px 10px 0px 0px",
	display: "flex",
	alignItems: "center",
	padding: "10px 20px",
});

const AvatarSection = styled("div")({
	width: "60px",
	height: "60px",
	backgroundColor: "#FFFFFF",
	borderRadius: "50%",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	position: "relative",
});

const OnlineBubble = styled("div")({
	position: "absolute",
	bottom: "0px",
	right: "3px",
	width: "12px",
	height: "12px",
	backgroundColor: "#2ECC71",
	borderRadius: "50%",
});

const NameSection = styled("div")({
	display: "flex",
	flexDirection: "column",
	marginLeft: "30px",
	color: "#FFFFFF",
	alignItems: "flex-start",
	justifyContent: "center",
});

const MainName = styled("div")({
	fontSize: "20px",
	fontWeight: 600,
});

const OnlineStatus = styled("div")({
	fontSize: "14px",
	fontWeight: 400,
	color: "rgba(255, 255, 255, 0.5)",
});

const ChatContainer = styled("div")({
	maxHeight: "310px",
	overflowY: "auto",
});

const ChatSection = styled("div")({
	backgroundColor: "#FFFFFF",
	display: "flex",
	flexDirection: "column",
	justifyContent: "flex-end",
	padding: "10px",
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
	fontSize: "12px",
	fontWeight: 500,
	color: "rgba(0, 0, 0, 0.4)",
	marginBottom: "7px",
});

const ChatBubble = styled("div")({
	padding: "15px",
	fontSize: "13px",
	zIndex: 1000,
	textAlign: "left",
	"&.BotChat": {
		backgroundColor: "#A32020",
		color: "#FFFFFF",
		borderRadius: "5px 20px 20px 20px",
	},
	"&.ClientChat": {
		backgroundColor: "rgb(245, 245, 245,0.9)",
		color: "#000000",
		borderRadius: "20px 5px 20px 20px",
	},
});

const MessageSection = styled("div")({
	height: "50px",
	backgroundColor: "rgb(245, 245, 245,0.9)",
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
	borderRadius: "20px",
	resize: "none",
	"&:focus": {
		outline: "1px solid #A32020",
	},
});

const SendButton = styled(IconButton)({
	backgroundColor: "#A32020",
	height: "35px",
	width: "35px",
	borderRadius: "50%",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	"&:hover": {
		opacity: 0.6,
		backgroundColor: "#A32020",
	},
});

export default ChatBot;
