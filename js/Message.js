class Message {
	constructor(message) {
		this.author = message.author
		this.text = message.text
		this.createNewMessage()
	}
}


class WhatsAppMessage extends Message {
	constructor (message) {
		super(message)
		this.amAuthor = message.amAuthor
		this.time = message.time
		this.hasBeenRead = message.hasBeenRead
	}

	createNewMessage() {
		let messageArea = [...document.getElementsByClassName("msgArea")].filter((x) => x.id == this.author)[0]

		let messageContainer = document.createElement('div')
		messageContainer.classList.add('msg')
		messageContainer.classList.add((this.amAuthor ? 'sent' : 'received'))

		for (message of this.text) {
			let p = document.createElement('p')
			p.innerText = message

			let timeAndStatus = document.createElement('sub')
			timeAndStatus.innerText = `${this.time} ${(this.hasBeenRead ? '✓✓' : '✓')}`
			p.appendChild(timeAndStatus)

			messageContainer.appendChild(p)
		}
		messageArea.appendChild(messageContainer)
	}
}


class IrcMessage extends Message {
	createNewMessage() {
		let newDiv = document.createElement("div")
		newDiv.classList.add("message")

		let newMessage = document.createElement("p")
		newMessage.classList.add("message-text")

		if (message.author.toLowerCase() == "server") { 
			newDiv.classList.add("server-announcement") 
			newMessage.innerText = '* ' + message.text
		} else {
			newMessage.innerText = `<${message.author.toUpperCase()}> ${message.text}`
		}

		newDiv.appendChild(newMessage)

		let messageArea = [...document.getElementsByClassName("message-area")][0]
		messageArea.appendChild(newDiv)
	}
}