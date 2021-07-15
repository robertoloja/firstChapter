class Message {
	constructor(element) {
		this.element = element
		this.author = element.attributes.author.value
		this.text = element.innerHTML
		this.messageArea = element.parentElement
	}
}


class EmailMessage extends Message {
	constructor(element) {
		super(element)
		this.subject = element.attributes.subject.value
		this.date = this.getDateTimeString(element.attributes.date.value)
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
		this.element.innerHTML = 
		   `<b>Subject:</b> ${this.subject} <br>
			<b>From:</b> ${this.author} <br>
			<b>Date:</b> ${this.date} <br><br>
			${this.text}`
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
		this.amAuthor = (element.attributes.amAuthor.value == 'true')
		this.time = element.attributes.time.value
		this.hasBeenRead = (element.attributes.hasBeenRead.value == 'true')
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
		"EmailMessage": EmailMessage
	}

	Object.keys(registeredClasses).map((className) => {
		[...document.body.getElementsByTagName(className)].map((element) => {
			element.classInstance = new registeredClasses[className](element)
		})
	})
}