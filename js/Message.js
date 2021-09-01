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
	static numberOfEmails = 0

	constructor(element) {
		super(element)
		let subject = element.attributes.subject
		let date = element.attributes.date

		this.subject = (subject ? subject.value : '')
		this.date = (date ? this.getDateTimeString(date.value) : '')
		Email.numberOfEmails += 1
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
	constructor(element) {
		super(element)
		this.createEmailSummary()
	}

	style() {
		let style = `overflow-y: scroll;
					background: white;
					border: 1px solid grey;
					margin: 0;
					padding: 20px;
					font-family: monospace;
					display: ${this.element.attributes.open != undefined ?
								'inline-block' : 
								'none'};`
		return style
	}

	createEmailSummary() {
		let emailSummaries = document.querySelector('#inbox').children[0]
		let button = document.createElement('button')
		button.id = `email${Email.numberOfEmails}-button`

		let cssClasses = ['nostyle', 'emaillink']

		if (Email.numberOfEmails == 1) {
			cssClasses.push('active')
			cssClasses.push('read')
		}

		cssClasses.map(x => {
			button.classList.add(x)
		})

		button.onclick = () => {openEmail.call(button, event, `email${Email.numberOfEmails}`)}

		button.innerHTML = `<img src="svg/envelope-${Email.numberOfEmails == 1 ? 'open' : 'closed'}.svg">
													<div class="info">
														<h4>
															${this.subject}
														</h4>
														<h5>${this.author}</h5>
														${this.stripHTML(this.text).substring(0, 50)}
													</div>
												</button>`

		emailSummaries.insertBefore(button, emailSummaries.lastElementChild)
	}

	stripHTML(text) {
		let result = text.split(/\<.+\>/).join(' ')
		return result
	}
}


class IrcMessage extends Message {
	constructor(element) {
		super(element)
		this.createNewMessage()
	}

	createNewMessage() {
		const characterColors = {
			'MS': 'blue',
			'JD': '#CC99FF',
			'PM': 'orange',
			'WH': 'red',
			'fungor': 'green',
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
		this.amAuthor = (element.attributes.amAuthor? element.attributes.amAuthor.value == 'true' : true)
		this.time = (element.attributes.time ? element.attributes.time.value : '')
		this.hasBeenRead = (element.attributes.hasBeenRead ? element.attributes.hasBeenRead.value == 'true' : '')
		this.deleted = (element.attributes.deleted ? element.attributes.deleted.value == 'true' : '')
		this.createNewMessage()
	}

	createNewMessage() {
		let children = [...this.element.children]
		this.element.className = `msg${(this.amAuthor ? ' sent' : ' received')}`

		// TODO: Get rid of this conditional and definitely don't let it breed
		if (this.deleted) {
			this.element.classList.add('deleted')
			this.element.innerHTML = '<p>🛇 You deleted this message</p>'
			return
		}

		this.element.innerHTML = 
		   `${children.map((p) => `<p>${p.innerHTML} <sub>${this.time} ${this.amAuthor ? `<span class="checkmarks${this.hasBeenRead ? ' read' : ''}">✓✓&nbsp</span>` : ''}</sub></p>`)
		   			  .join('')}`
	}
}

registeredClasses["IrcMessage"] = IrcMessage
registeredClasses["WhatsAppMessage"] = WhatsAppMessage
registeredClasses["EmailMessage"] = EmailMessage
registeredClasses["EmailReply"] = EmailReply
