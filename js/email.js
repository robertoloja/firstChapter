function openEmail(evt, emailId) {
	this.classList.add("read")

	let allEmails = [...document.getElementsByTagName('EmailMessage')]
	allEmails.map((email) => {email.style.display = 'none'})

	let emailButtons = [...document.getElementsByClassName("emaillink")]
	emailButtons.map((button) => {button.classList.remove("active")})

	allEmails[emailButtons.indexOf(this)].style.display = 'inline-block'
	this.classList.add("active")
	this.firstElementChild.src = "svg/envelope-open.svg"
}

function openWindowFromRibbon(evt) {
	let possibleButtons = ['inbox', 'compose']
	let thisButtonLabel = this.children[1].innerHTML.toLowerCase()
	document.getElementById(thisButtonLabel).style.display = 'flex'
	document.getElementById(possibleButtons.filter((x) => x != thisButtonLabel)).style.display = 'none'
}