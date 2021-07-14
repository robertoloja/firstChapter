class Message {
	constructor(message) {
		this.author = message.author
		this.text = message.text
		this.messageArea = [...document.getElementsByClassName("message-area")]
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
		let messageContainer = document.createElement('div')
		messageContainer.classList.add('msg')
		messageContainer.classList.add((this.amAuthor ? 'sent' : 'received'))

		for (let message of this.text) {
			let p = document.createElement('p')
			p.innerText = message

			let timeAndStatus = document.createElement('sub')
			timeAndStatus.innerText = `${this.time} ${(this.hasBeenRead ? '✓✓' : '✓')}`
			p.appendChild(timeAndStatus)

			messageContainer.appendChild(p)
		}
		this.messageArea.filter((x) => x.id == this.author)[0].appendChild(messageContainer)
	}
}


class IrcMessage extends Message {
	createNewMessage() {
		let newDiv = document.createElement("div")
		newDiv.classList.add("message")

		let newMessage = document.createElement("p")
		newMessage.classList.add("message-text")

		if (this.author.toLowerCase() == "server") { 
			newDiv.classList.add("server-announcement") 
			newMessage.innerText = '* ' + this.text
		} else {
			newMessage.innerText = `<${this.author.toUpperCase()}> ${this.text}`
		}

		newDiv.appendChild(newMessage)

		this.messageArea[0].appendChild(newDiv)
	}
}