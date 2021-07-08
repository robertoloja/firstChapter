function fadeAndDeleteOverlay() {
	let overlay = document.getElementsByClassName('intro-overlay')[0]

	window.setTimeout(() => {overlay.style.opacity = 0}, 2000)
	window.setTimeout(() => {overlay.hidden = true}, 4000)
}

function newSrc() {
	const urls = {
		"Stories/End.html": "ms-whatsapp.html",
		"email.html": "pm-whatsapp.html",
		"twitter.html": "jd-whatsapp.html"
	}

	var arrows = document.getElementById("arrows")
	var newSrc = this.options[this.selectedIndex].id

	document.getElementById('proscenium').src = newSrc
	arrows.href = urls[newSrc]
}

window.onmessage = function hoverFootnote(message) {
	const mapping = ['dart', 'chituma']

	let footnote = document.getElementById(mapping[message.data.id])

	if (message.data.type == "click") { 
		footnote.hidden = false
		
		window.setTimeout(() => {
			footnote.style.opacity = 0
		}, 2000)

		window.setTimeout(() => { 
			footnote.style.opacity = 100
			footnote.hidden = true
		}, 3000)

	} else {
		if (footnote.hidden) {
			footnote.hidden = false
		} else {
			footnote.hidden = true
		}
	}
}