function minimizeWindow() {
	let windows = document.getElementsByClassName("window")
	let mainWindow = [...windows].filter((x) => x.id != 'other-channel')[0]

	mainWindow.lastElementChild.hidden = !mainWindow.lastElementChild.hidden
	mainWindow.style.width = (mainWindow.style.width ? '' : '15rem')
	mainWindow.style.position = (mainWindow.style.position ? '' : 'absolute')
	mainWindow.style.bottom = "1rem"

	let otherButton = document.getElementById((this.id == 'min' ? 'max' : 'min'))
	this.classList.remove("click")
	otherButton.classList.add("click")
}
