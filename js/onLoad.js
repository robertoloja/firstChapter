const registeredClasses = {}

function onLoad() {
	/*****
	 *	Body tag's onload function. Finds HTML tags that match the above classes,
	 *  instantiates the associated class, and attaches the instance to 
	 *  element.classInstance
	 ****/

	Object.keys(registeredClasses).map((className) => {
		let registeredElements = [...document.getElementsByTagName(className)]

		registeredElements.map((element) => {
						  	element.classInstance = new registeredClasses[className](element)
						  })
	})
}