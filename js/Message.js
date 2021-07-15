class Message {
	tagName = this.__proto__.constructor.name
	author

	constructor(element) {
		this.element = element
		this.author = element.attributes.author.value
		this.text = element.innerHTML
		this.messageArea = element.parentElement
		this.text.replace(`${this.text[4]}`, "<br><br>")
	}
}


class EmailMessage extends Message {
	subject
	date

	constructor(element) {
		super(element)
		this.subject = element.attributes.subject.value
		this.date = element.attributes.date.value
		this.createNewMessage()
	}

	createNewMessage() {
		this.element.innerHTML = `
			<b>Subject: </b> ${this.subject} <br>
			<b>From: </b> ${this.author} <br>
			<b>Date: </b> ${this.date} <br><br>
			${this.text.replace('\n', '<br><br>')}
		`
	}
}


class IrcMessage extends Message {
	constructor(element) {
		super(element)
		this.createNewMessage()
	}
	createNewMessage() {
		let styleClasses = "message"
		let displayText = ""

		if (this.author.toLowerCase() == "server") {
			styleClasses = styleClasses + " server-announcement"
			displayText = "* " + this.text
		} else {
			displayText = `&lt;${this.author}&gt; ${this.text}`
		}

		this.element.innerHTML =
			`<div class="${styleClasses}">
				<p class="message-text">
				${displayText}
				</p>
			</div>`
	}
}


class WhatsAppMessage extends Message {
	constructor (message) {
		super(message)
		this.amAuthor = message.amAuthor
		this.time = message.time
		this.hasBeenRead = message.hasBeenRead
		this.createNewMessage()
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

const registeredClasses = {
	"IrcMessage": IrcMessage,
	"WhatsAppMessage": WhatsAppMessage,
	"EmailMessage": EmailMessage
}

function onLoad() {
	/*****
	 *	Body tag's onload function. Finds all non-standard HTML tags,
	 *  instantiates the associated class, and attaches the instance
	 *  to element.classInstance
	 ****/
	let allElements = document.body.getElementsByTagName("*")
	const isElementUnknown = (element) => element.__proto__.constructor.name == "HTMLUnknownElement"
	let customElements = [...allElements].filter(isElementUnknown)

	customElements.map((element) => {
		let className = Object.keys(registeredClasses).filter((x) => x.toLowerCase() == element.tagName.toLowerCase())[0]
		element.classInstance = new registeredClasses[className](element)
	})
}