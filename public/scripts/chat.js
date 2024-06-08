const socket = io();

const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = chatInput.value;
  socket.emit('message', message);
  chatInput.value = '';
});

socket.on('message', (data) => {
  const messageElement = document.createElement('div');
  messageElement.textContent = data;
  chatMessages.appendChild(messageElement);
});