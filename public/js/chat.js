// C Socket.IO
const socket = io();

// Send a message
function sendMessage() {
  const messageInput = document.getElementById('messageInput');
  const message = messageInput.value.trim();

  if (message) {
    // Emit the 'chat message' event with the message data
    socket.emit('chat message', { sender: 'user', message });
    messageInput.value = '';
  }
}

//  messages
socket.on('chat message', data => {
  const chatMessages = document.getElementById('chat-messages');
  const messageElement = document.createElement('div');
  messageElement.textContent = `${data.sender}: ${data.message}`;
  chatMessages.appendChild(messageElement);
});

// Handle form submission
const messageForm = document.getElementById('messageForm');
messageForm.addEventListener('submit', event => {
  event.preventDefault();
  sendMessage();
});
