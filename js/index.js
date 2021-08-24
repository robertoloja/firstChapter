function fadeAndDeleteOverlay() {
	let overlay;

	const url = new URL(window.location.href)
	const param = new URLSearchParams(url.search.slice(1))

	if (param.get('overlay') == 'false') {
		overlay = document.getElementsByClassName('intro-overlay')[0]
		overlay.hidden = true
		let select = document.querySelector('#part-select')
		newSrc.call(select, param.get('owner'))
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
	animateChapterTitle()
}


function animateChapterTitle() {
	let title = document.getElementById('chapter-title')
	title.innerText = ''
	let finalText = '0: intro'
	document.title = ''

	let totalDelay = 0
	let maxDelay = 200
	let minDelay = 50

	for (let char of finalText.split('')) {
		let delay = Math.random() * (maxDelay - minDelay) + minDelay
		totalDelay += delay

		window.setTimeout(() => {
			title.innerText = title.innerText + char
			document.title = document.title + char
		}, totalDelay)
	}
}

function newSrc(destination) {
	const urls = {
		"blog.html": "ms",
		"email.html": "pm",
		"twitter.html": "jd"
	}

	if (destination != undefined) {
		let characters = ['ms', 'pm', 'jd']
		this.selectedIndex = characters.indexOf(destination)
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