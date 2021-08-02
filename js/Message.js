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
		/**
		 * @param date String
		 * Returns the date attribute in format "Sun May 10 2020 09:03".
		 **/ 
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
	// This class only exists to give a descriptive 
	// name to the relevant HTML tag
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
		const characterColors = {
			'MS': 'lightblue',
			'JD': 'gray',
			'PM': 'orange',
			'WH': 'red'
		}
		let styleClasses = "message"
		let displayText = ""

		if (this.author.toLowerCase() == "server") {
			styleClasses = styleClasses + " server-announcement"
			displayText = "* " + this.text
		} else if (this.text.slice(0,3) == '/me') {
			displayText = `<font color="purple">*${this.author} ${this.text.slice(4, this.text.length)}</font>`
		} else {
			displayText = `&lt;<font color="${characterColors[this.author]}">${this.author}</font>&gt; ${this.text}`
		}

		this.element.className = styleClasses
		this.element.innerHTML =
		   `<p class="message-text">
				${displayText}
			</p><br>`
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

registeredClasses["IrcMessage"] = IrcMessage
registeredClasses["WhatsAppMessage"] = WhatsAppMessage
registeredClasses["EmailMessage"] = EmailMessage
registeredClasses["EmailReply"] = EmailReply
