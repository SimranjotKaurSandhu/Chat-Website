const simranSelectorBtn = document.querySelector('#simran-selector')
const harrySelectorBtn = document.querySelector('#harry-selector')
const chatHeader = document.querySelector('.chat-header')
const chatMessages = document.querySelector('.chat-messages')
const chatInputForm = document.querySelector('.chat-input-form')
const chatInput = document.querySelector('.chat-input')
const clearChatBtn = document.querySelector('.clear-chat-button')

const messages = JSON.parse(localStorage.getItem('messages')) || []

const createChatMessageElement = (message) => `
    <div class="message ${message.sender === 'Simran' ? 'blue-bg' : 'gray-bg'}">
        <div class=message-sender">${message.sender}</div>
        <div class="message-text">${message.text}</div>
        <div class="message-timestamp">${message.timestamp}</div>
    </div>
`

window.onload = () => {
    messages.forEach((message) => {
        chatMessages.innerHTML += createChatMessageElement(message)
    })
}

let messageSender = 'Simran'

const updateMessageSender = (name) => {
    messageSender = name
    chatHeader.innerText = `${messageSender}'s texting ...`
    chatInput.placeholder = `Start typing, ${messageSender}...`

    if(name == 'Simran'){
        simranSelectorBtn.classList.add('active-person')
        harrySelectorBtn.classList.remove('active-person')
    }
    // if(name === 'Harry'){
    else{    
        harrySelectorBtn.classList.add('active-person')
        simranSelectorBtn.classList.remove('active-person')
    }

    chatInput.focus()
}

simranSelectorBtn.onclick = () => updateMessageSender('Simran')
harrySelectorBtn.onclick = () => updateMessageSender('Harry')

const sendMessage = (e) => {
    e.preventDefault()

    const timestamp = new Date().toLocaleString('en-Us', {hour:'numeric',minute:'numeric', hour12:true})
    const message = {
        sender : messageSender,
        text : chatInput.value,
        timestamp,
    }

    messages.push(message)
    localStorage.setItem('messages',JSON.stringify(messages))

    chatMessages.innerHTML += createChatMessageElement(message)
    chatInputForm.reset()
    chatMessages.scrollTop=chatMessages.scrollHeight
}

chatInputForm.addEventListener('submit', sendMessage)

clearChatBtn.addEventListener('click',() => {
    localStorage.clear()
    chatMessages.innerHTML = ''
})