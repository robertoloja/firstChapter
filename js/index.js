function fadeAndDeleteOverlay() {
	let overlay = document.getElementsByClassName('intro-overlay')[0]

	let overlayDeath = new Promise((res, rej) => {
		window.setTimeout(() => {overlay.style.opacity = 0}, 2000)
		res()
	})
	overlayDeath.then(window.setTimeout(() => { overlay.hidden = true }, 4000))
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

	for (let i = 0; i < mapping.length; i++) {
		if (message.data.id == i) continue
		document.getElementById(mapping[i]).hidden = true
	}

	let footnote = document.getElementById(mapping[message.data.id])

	if (message.data.type == "click") { 
		footnote.hidden = false
		
		let fadeFootnote = new Promise((res, rej) => {
			window.setTimeout(() => {
				footnote.style.opacity = 0
				res()
			}, 5000)
		})
		
		fadeFootnote.then(window.setTimeout(() => { 
			footnote.style.opacity = 100
			footnote.hidden = true
		}, 8000))

	} else {
		if (footnote.hidden) {
			footnote.hidden = false
		} else {
			footnote.hidden = true
		}
	}
}