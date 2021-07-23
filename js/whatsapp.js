function showContacts() {
	const contacts = document.querySelector('.contacts')
	const msgNav = document.querySelector('.msgNav')

	if ([...contacts.classList].indexOf('hidden') == -1) {
		contacts.classList.add('hidden')
		msgNav.classList.remove('hidden')
	} else {
		contacts.classList.remove('hidden')
		msgNav.classList.add('hidden')
	}
}

function showMessages() {
	showContacts()
	console.log(this)
}