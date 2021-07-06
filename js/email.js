function openEmail(evt, email) {
	this.classList.add("read")

	let tabcontent = document.getElementsByClassName("emailbody")
	for (tab of tabcontent) { tab.style.display = "none" }

	let tablinks = document.getElementsByClassName("emaillink")
	for (tablink of tablinks) { tablink.classList.remove("active") }

	document.getElementById(email).style.display = "block";
	this.classList.add("active")
	evt.currentTarget.firstElementChild.src = "svg/envelope-open.svg"
}

function openWindowFromRibbon(evt) {
	let possibleButtons = ['inbox', 'compose']
	let thisButtonLabel = this.children[1].innerHTML.toLowerCase()
	document.getElementById(thisButtonLabel).style.display = 'flex'
	document.getElementById(possibleButtons.filter((x) => x != thisButtonLabel)).style.display = 'none'
}