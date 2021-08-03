function showContacts() {
	const contacts = document.querySelector('.contacts')
	const messageAreas = [...document.getElementsByClassName('message-area')]

	if ([...contacts.classList].indexOf('hidden') == -1) {
		contacts.classList.add('hidden')
	} else {
		contacts.classList.remove('hidden')
	}
}

function showMessages(author) {
	showContacts()
	const clicked = document.getElementById(author)

	const allMessages = [...document.getElementsByClassName('message-area')]
	allMessages.map(x => {
		x.hidden = true
	})
	clicked.hidden = false

	const allContacts = [...document.getElementsByClassName('contact')]
	allContacts.map(x => { x.classList.remove('active') })
	this.classList.add('active')
}