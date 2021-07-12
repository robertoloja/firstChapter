function fadeAndDeleteOverlay() {
	let overlay;

	const url = new URL(window.location.href)
	const param = new URLSearchParams(url.search.slice(1))

	if (param.get('overlay') == 'false') {
		return
	} else {
		overlay = document.getElementsByClassName('intro-overlay')[0]
		overlay.hidden = false
	}

	let overlayDeath = new Promise((res, rej) => {
		window.setTimeout(() => {overlay.style.opacity = 0}, 2000)
		res()
	})

	overlayDeath.then(window.setTimeout(() => { overlay.hidden = true }, 4000))
}


function newSrc() {
	const urls = {
		"Stories/End.html": "ms",
		"email.html": "pm",
		"twitter.html": "jd"
	}
	let newSrc = this.options[this.selectedIndex].id
	document.getElementById('proscenium').src = newSrc

	let arrows = document.getElementById("arrows")
	arrows.href = `whatsapp.html?owner=${urls[newSrc]}`
}


window.onmessage = function hoverFootnote(message) {
	let chosenFootnote;
	const footnotes = [...document.getElementsByClassName('footnote')]

	for (footnote of footnotes) {
		if (footnote.id == message.data.id) {
			chosenFootnote = footnote
			continue
		}
		footnote.hidden = true
	}

	if (message.data.type == "click") { 
		chosenFootnote.hidden = false
		
		let fadeFootnote = new Promise((res, rej) => {
			window.setTimeout(() => {
				chosenFootnote.style.opacity = 0
				res()
			}, 5000)
		})
		
		fadeFootnote.then(window.setTimeout(() => { 
			chosenFootnote.style.opacity = 100
			chosenFootnote.hidden = true
		}, 8000))

	} else {
		if (chosenFootnote.hidden) {
			chosenFootnote.hidden = false
		} else {
			chosenFootnote.hidden = true
		}
	}
}