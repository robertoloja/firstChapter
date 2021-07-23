class Message {
	constructor(element) {
		this.element = element
		
		let author = element.attributes.author
		this.author = (author ? author.value : '')
		this.text = element.innerHTML
		this.messageArea = element.parentElement
		this.element.style.cssText = this.style()
	}

	style() {}
}

class Email extends Message {
	constructor(element) {
		super(element)

		let subject = element.attributes.subject
		let date = element.attributes.date
		this.subject = (subject ? subject.value : '')
		this.date = (date ? this.getDateTimeString(date.value) : '')
		this.createNewMessage()
	}

	getDateTimeString(date) {
		// returns the date attribute in format "Sun May 10 2020 09:03"
		const zeroPad = (unit) => (unit.length == 1 ? '0' + unit : unit)

		const getTimeString = (date) => zeroPad(date.getHours().toString()) + ':' + 
										zeroPad(date.getMinutes().toString())

		let dateObj = new Date(Date.parse(date))
		return dateObj.toDateString() + ' ' + getTimeString(dateObj)
	}

	createNewMessage() {
		let emailHeader = document.createElement("p")
		emailHeader.style = 'margin: 0; padding: 0;'
		
		emailHeader.innerHTML = 
		   `<b>Subject:</b> ${this.subject} <br>
			<b>From:</b> ${this.author} <br>
			<b>Date:</b> ${this.date} <br><br>`

		this.element.insertBefore(emailHeader, this.element.firstChild)
	}
}

class EmailReply extends Email {
}

class EmailMessage extends Email {
	style() {
		let style = `overflow-y: scroll;
					background: white;
					border: 1px solid grey;
					margin: 0;
					padding: 20px;
					font-family: monospace;
					display: ${this.element.attributes.open ?
								'inline-block' : 
								'none'};`
		return style
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

		this.element.className = styleClasses

		this.element.innerHTML =
		   `<p class="message-text">
				${displayText}
			</p>`
	}
}


class WhatsAppMessage extends Message {
	constructor (element) {
		super(element)
		this.amAuthor = element.attributes.amAuthor.value == 'true'
		this.time = element.attributes.time.value
		this.hasBeenRead = element.attributes.hasBeenRead.value == 'true'
		this.createNewMessage()
	}

	createNewMessage() {
		let children = [...this.element.children]

		this.element.className = `msg${(this.amAuthor ? ' sent' : ' received')}`
		this.element.innerHTML = 
		   `${children.map((p) => `<p>${p.innerText} <sub>${this.time} ✓</sub></p>`)
		   			  .join('')}`
	}
}


function onLoad() {
	/*****
	 *	Body tag's onload function. Finds HTML tags that match the above classes,
	 *  instantiates the associated class, and attaches the instance to 
	 *  element.classInstance
	 ****/
	const registeredClasses = {
		"IrcMessage": IrcMessage,
		"WhatsAppMessage": WhatsAppMessage,
		"EmailMessage": EmailMessage,
		"EmailReply": EmailReply
	}

	Object.keys(registeredClasses).map((className) => {
		let registeredElements = [...document.getElementsByTagName(className)]

		registeredElements.map((element) => {
						  	element.classInstance = new registeredClasses[className](element)
						  })
	})
}