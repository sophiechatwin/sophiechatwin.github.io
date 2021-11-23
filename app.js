var characters = [];

var loginBody = document.querySelector('#loginBody');
var mainBody = document.querySelector('#mainBody');

var addButton = document.querySelector("#addButton");
var createForm = document.querySelector("#createForm");
var createUserForm = document.querySelector("#createUserForm");

var responseDiv = document.querySelector('#responseDiv');
var responseButton = document.querySelector('#responseButton');
var responseContent = document.querySelector('#responseContent');

responseButton.onclick = function () {
	responseDiv.style.display = "none";
	responseContent.innerHTML = "";
}

addButton.onclick = function () {
	console.log("click!");
	//Query the document for the items
	createForm.style.display = "none";
	var newName = document.querySelector("#name");
	var newAge = document.querySelector("#age");
	var newBirthday = document.querySelector("#birthday");
	var newHairColor = document.querySelector("#hairColor");
	var newEyeColor = document.querySelector("#eyeColor");
	var newOccupation = document.querySelector("#occupation");
	//Get the values from the items
	var characterName = newName.value;
	var characterAge = newAge.value;
	var characterBirthday = newBirthday.value;
	var characterHairColor = newHairColor.value;
	var characterEyeColor = newEyeColor.value;
	var characterOccupation = newOccupation.value;

	createCharacterOnServer(characterName, characterAge, characterBirthday, characterHairColor, characterEyeColor, characterOccupation);

	newName.value = "";
	newAge.value = "";
	newBirthday.value = "";
	newHairColor.value = "";
	newEyeColor.value = "";
	newOccupation.value = "";
}

//Make sure to tell the user that registration was successful.
var createNewUserButton = document.querySelector("#createNewUserButton");
createNewUserButton.onclick = function () {
	createUserForm.style.display = "none";
	var createFirst = document.querySelector("#createFirst");
	var createLast = document.querySelector("#createLast");
	var createEmail = document.querySelector("#createEmail");
	var createPassword = document.querySelector("#createPassword");

	var userFirst = createFirst.value;
	var userLast = createLast.value;
	var userEmail = createEmail.value;
	var userPassword = createPassword.value;

	createUserOnServer(userFirst, userLast, userEmail, userPassword);

	createFirst.value = "";
	createLast.value = "";
	createEmail.value = "";
	createPassword.value = "";
}

var loginButton = document.querySelector("#loginButton");
var loginForm = document.querySelector("#loginForm");

loginButton.onclick = function () {
	loginForm.style.display = "block";
}

var confirmLoginButton = document.querySelector("#confirmLoginButton");

confirmLoginButton.onclick = function () {
	loginForm.style.display = "none";
	var loginEmail = document.querySelector("#loginEmail");
	var loginPassword = document.querySelector("#loginPassword");

	userEmail = loginEmail.value;
	userPassword = loginPassword.value;

	verifyUserOnServer(userEmail,userPassword);

	loginEmail.value = "";
	loginPassword.value = "";
}

var newUserButton = document.querySelector("#newUserButton");


newUserButton.onclick = function () {
	createUserForm.style.display = "block";
}

var createButton = document.querySelector("#createNewCharacterButton");

var cancelCreateButton = document.querySelector("#cancelCreateButton");

createButton.onclick = function () {
	createForm.style.display = "block";
}

cancelCreateButton.onclick = function () {
	createForm.style.display = "none";
	var newName = document.querySelector("#name");
	var newAge = document.querySelector("#age");
	var newBirthday = document.querySelector("#birthday");
	var newHairColor = document.querySelector("#hairColor");
	var newEyeColor = document.querySelector("#eyeColor");
	var newOccupation = document.querySelector("#occupation");
	newName.value = "";
	newAge.value = "";
	newBirthday.value = "";
	newHairColor.value = "";
	newEyeColor.value = "";
	newOccupation.value = "";

}


function fillOutUpdateForm(name, age, birthday, hairColor, eyeColor, occupation) {
	var nameInput = document.querySelector("#updateName"); 
	var ageInput = document.querySelector("#updateAge");
	var birthdayInput = document.querySelector("#updateBirthday");
	var hairColorInput = document.querySelector("#updateHairColor");
	var eyeColorInput = document.querySelector("#updateEyeColor");
	var occupationInput = document.querySelector("#updateOccupation");
	nameInput.value = name;
	ageInput.value = age;
	birthdayInput.value = birthday;
	hairColorInput.value = hairColor;
	eyeColorInput.value = eyeColor;
	occupationInput.value = occupation;
}

function createCharacterOnServer(characterName, characterAge, characterBirthday, characterHairColor, characterEyeColor, characterOccupation) {
	var data = "name=" + encodeURIComponent(characterName);
	data += "&age=" + encodeURIComponent(characterAge);
	data += "&birthday=" + encodeURIComponent(characterBirthday);
	data += "&hairColor=" + encodeURIComponent(characterHairColor);
	data += "&eyeColor=" + encodeURIComponent(characterEyeColor);
	data += "&occupation=" + encodeURIComponent(characterOccupation);

	fetch("https://charactercreator42.herokuapp.com/characters", {
		method: "POST",
		credentials: "include",
		body: data,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	}).then(function (response) {
		loadCharacters();
	});
}

function createUserOnServer(userFirst, userLast, userEmail, userPassword) {
	var data = "first=" + encodeURIComponent(userFirst);
	data += "&last=" + encodeURIComponent(userLast);
	data += "&email=" + encodeURIComponent(userEmail);
	data += "&password=" + encodeURIComponent(userPassword);

	fetch("https://charactercreator42.herokuapp.com/users", {
		method: "POST",
		credentials: "include",
		body: data,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	}).then(function (response) {
		if (response.status == 201) {
			//The new user was successfully created
			responseDiv.style.display = "block";
			responseContent.innerHTML = "User Created Successfully!";
		}
		else if (response.status == 422) {
			//The user already exists
			responseDiv.style.display = "block";
			responseContent.innerHTML = "User Already Exists";
		}
	});
}

function verifyUserOnServer(userEmail, userPassword) {
	var data = "email=" + encodeURIComponent(userEmail);
	data += "&password=" + encodeURIComponent(userPassword);

	fetch("https://charactercreator42.herokuapp.com/sessions", {
		method: "POST",
		credentials: "include",
		body: data,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	}).then(function (response) {
		if (response.status == 201) {
			//The user successfully logged in
			responseDiv.style.display = "block";
			responseContent.innerHTML = "Successfully Logged in!";
			loadCharacters();
		}
		else if (response.status == 401) {
			//The user entered wrong email or password
			responseDiv.style.display = "block";
			responseContent.innerHTML = "Incorrect Email or Password";
		}
	});
}

function deleteCharacterOnServer(characterId) {

	fetch("https://charactercreator42.herokuapp.com/characters/" + characterId, { 
		method: "DELETE",
		credentials: "include"
	}).then(function (response) {
		loadCharacters();
	});
}

function updateCharacterOnServer(characterId, characterName, characterAge, characterBirthday, characterHairColor, characterEyeColor, characterOccupation) {
	var data = "name=" + encodeURIComponent(characterName);
	data += "&age=" + encodeURIComponent(characterAge);
	data += "&birthday=" + encodeURIComponent(characterBirthday);
	data += "&hairColor=" + encodeURIComponent(characterHairColor);
	data += "&eyeColor=" + encodeURIComponent(characterEyeColor);
	data += "&occupation=" + encodeURIComponent(characterOccupation);

	fetch("https://charactercreator42.herokuapp.com/characters/" + characterId, { 
		method: "PUT",
		credentials: "include",
		body: data,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	}).then(function (response) {
		loadCharacters();
	});
}

function loadCharacters() {

	fetch("https://charactercreator42.herokuapp.com/characters", {
		credentials: "include"
	}).then(function (response) {

		if (response.status == 401) {
			//hide main body
			//show login/register
			loginBody.style.display = "block";
			mainBody.style.display = "none";
			return;
		}
		else if (response.status == 200) {
			//hide login/register
			//show main body
			loginBody.style.display = "none";
			mainBody.style.display = "block";
		}

		response.json().then(function (dataFromServer) {

			characters = dataFromServer;

			var characterList = document.querySelector("#characterList");
			characterList.innerHTML = "";

			characters.forEach(function (character) {
				var newCharacterListItem = document.createElement("li");

				var nameDiv = document.createElement("div");
				nameDiv.innerHTML = "Name: " + character.name;
				nameDiv.classList.add("characterName");
				newCharacterListItem.appendChild(nameDiv);

				var ageDiv = document.createElement("div");
				ageDiv.innerHTML = "Age: " + character.age;
				ageDiv.classList.add("characterAge");
				newCharacterListItem.appendChild(ageDiv);

				var birthdayDiv = document.createElement("div");
				birthdayDiv.innerHTML = "Birthday: " + character.birthday;
				birthdayDiv.classList.add("characterBirthday");
				newCharacterListItem.appendChild(birthdayDiv);

				var hairColorDiv = document.createElement("div");
				hairColorDiv.innerHTML = "Hair Color: " + character.haircolor;
				hairColorDiv.classList.add("characterHairColor");
				newCharacterListItem.appendChild(hairColorDiv);

				var eyeColorDiv = document.createElement("div");
				eyeColorDiv.innerHTML = "Eye Color: " + character.eyecolor;
				eyeColorDiv.classList.add("characterEyeColor");
				newCharacterListItem.appendChild(eyeColorDiv);

				var occupationDiv = document.createElement("div");
				occupationDiv.innerHTML = "Occupation: " + character.occupation;
				occupationDiv.classList.add("characterOccupation");
				newCharacterListItem.appendChild(occupationDiv);

				var deleteButton = document.createElement("button");
				deleteButton.innerHTML = "Delete";
				deleteButton.style.background = "#ffa59c";
				deleteButton.style.marginTop = "5px";
				deleteButton.style.marginBottom = "5px";

				deleteButton.onclick = function () {
					if (confirm("Are you sure you want to delete " + character.name + "?")) {
						deleteCharacterOnServer(character.id);
					}
				};

				var updateButton = document.createElement("button");
				updateButton.innerHTML = "Update";
				updateButton.style.background = "#c8ff9e";

				updateButton.onclick = function () {
					fillOutUpdateForm(character.name, character.age, character.birthday, character.haircolor, character.eyecolor, character.occupation);

					var updateForm = document.querySelector("#updateForm");
					updateForm.style.display = "block";


					var cancelUpdateButton = document.querySelector("#cancelUpdateButton");
					cancelUpdateButton.onclick = function () {
						updateForm.style.display = "none";
					}

					var mainUpdateButton = document.querySelector("#mainUpdateButton");
					mainUpdateButton.onclick = function () {
						var nameInput = document.querySelector("#updateName"); 
						var ageInput = document.querySelector("#updateAge");
						var birthdayInput = document.querySelector("#updateBirthday");
						var hairColorInput = document.querySelector("#updateHairColor");
						var eyeColorInput = document.querySelector("#updateEyeColor");
						var occupationInput = document.querySelector("#updateOccupation");
						updateCharacterOnServer(character.id, nameInput.value, ageInput.value, birthdayInput.value, hairColorInput.value, eyeColorInput.value, occupationInput.value);
						nameInput.value = "";
						ageInput.value = "";
						birthdayInput.value = "";
						hairColorInput.value = "";
						eyeColorInput.value = "";
						occupationInput.value = "";
						updateForm.style.display = "none";
					};
				};

				newCharacterListItem.appendChild(deleteButton);
				newCharacterListItem.appendChild(updateButton);

				characterList.appendChild(newCharacterListItem);

			});

		});
	});
}

loadCharacters();