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
	const fadeTimer = 5000

	const footnotes = [...document.getElementsByClassName('footnote')]

	for (footnote of footnotes) {
		if (footnote.id == message.data.id) {
			chosenFootnote = footnote
			continue
		}
		footnote.hidden = true
	}

	switch(message.data.type) {
		case "click":
			chosenFootnote.hidden = false
		
			let fadeFootnote = new Promise((res, rej) => {
				window.setTimeout(() => {
					chosenFootnote.style.opacity = 0
					res()
				}, fadeTimer)
			})
			
			fadeFootnote.then(window.setTimeout(() => { 
				chosenFootnote.style.opacity = 100
				chosenFootnote.hidden = true
			}, fadeTimer + 2000))
			break

		case "mouseover":
			chosenFootnote.hidden = false
			break
		case "mouseout":
			chosenFootnote.hidden = true
			break
	}
}