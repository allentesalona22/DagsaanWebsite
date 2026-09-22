/** @format */

// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: "AIzaSyDYA4uZiJCdQpGY9cyJXOLrbXDYo6aQKfE",
	authDomain: "dagsaan-114ac.firebaseapp.com",
	projectId: "dagsaan-114ac",
	storageBucket: "dagsaan-114ac.appspot.com",
	messagingSenderId: "4371943924651:437194392465:web:e18ef303fe173f7e9e5030",
	appId: "1:437194392465:web:e18ef303fe173f7e9e5030",
	databaseURL:
		"https://dagsaan-114ac-default-rtdb.asia-southeast1.firebasedatabase.app",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth();
const database = firebase.database();

window.setInterval(function () {
	// Set interval for checking
	var date = new Date(); // Create a Date object to find out what time it is
	if (
		date.getMinutes() === 0 ||
		date.getMinutes() === 15 ||
		date.getMinutes() === 30 ||
		date.getMinutes() === 45
	) {
		// Check the time
		var rainint = firebase.database().ref("FloodHazardIndex/");

		//GETTING THE DATA
		firebase
			.database()
			.ref("FloodHazardIndex")
			.once("value", function (snapshot) {
				snapshot.forEach(function (ChildSnapshot) {
					let lat = new String(ChildSnapshot.val().Latitude);
					let long = new String(ChildSnapshot.val().Longtitude);
					let latlong = lat + " " + long;
					let brng = new String(ChildSnapshot.val().Barangay);

					let request = new XMLHttpRequest();
					request.open(
						"GET",
						"https://api.weatherapi.com/v1/current.json?key=185ce329bdfa4d2fa87110541232305&q=" +
							latlong +
							"&aqi=yes"
					);
					request.send();
					request.onload = () => {
						if (request.status == 200) {
							let x = JSON.parse(request.response);
							let precip = x.current.precip_mm;
							//let timestamp = x.current.last_updated;

							var rainref = ChildSnapshot.ref;
							rainref.update({
								RainInt: precip,
							});
						} else {
							console.log("error");
						}
					};
				});
			});
		var ref = firebase.database().ref("RainIntUpdates");
		firebase
			.database()
			.ref("FloodHazardIndex")
			.once("value", function (snapshot) {
				snapshot.forEach(function (ChildSnapshot) {
					let f = parseFloat(ChildSnapshot.val().FloodAccu);
					let i = parseFloat(ChildSnapshot.val().RainInt);
					let g = parseFloat(ChildSnapshot.val().Geology);
					let u = ChildSnapshot.val().LandUse;
					let se = parseFloat(ChildSnapshot.val().SlopeElv);
					let d = parseFloat(ChildSnapshot.val().DrainNet);
					let brng = ChildSnapshot.val().Barangay;

					//flood accumulation
					if (f <= 50) {
						floodAccu = 2;
					} else if (f > 51 && f <= 100) {
						floodAccu = 4;
					} else if (f > 100 && f <= 200) {
						floodAccu = 6;
					} else if (f > 201 && f <= 500) {
						floodAccu = 8;
					} else {
						floodAccu = 10;
					}
					var totalf = floodAccu * 0.2;

					//geology
					if (g == 1) {
						glgy = 10;
					} else {
						glgy = 5;
					}
					var totalg = glgy * 0.1;

					//land use
					if (u == "Mixed Forest") {
						luse = 2;
					} else if (u == "Sparsely Vegetated") {
						luse = 4;
					} else if (u == "Agricultural") {
						luse = 6;
					} else if (u == "Urban") {
						luse = 8;
					} else {
						luse = 10;
					}
					var totalu = luse * 0.1;

					//Slope and Elevation
					if ((se) => 41 && se <= 60) {
						sloelv = 2;
					} else if ((se) => 31 && se <= 40) {
						sloelv = 4;
					} else if ((se) => 21 && se <= 30) {
						sloelv = 6;
					} else if ((se) => 11 && se <= 20) {
						sloelv = 8;
					} else {
						sloelv = 10;
					}
					var totalse = sloelv * 0.3;

					//Drainage Network
					var totald = d * 0.3;

					//total FHI

					var totals = totalf + totalg + totalu + totalse + totald;
					var total = totals * i;

					//notification
					const topic = "/topics/" + brng;
					const notifmessage = {
						to: topic,
						notification: {
							title: "Dagsaan Notification",
							body:
								"Humanda sa pagbaha. Ang kabuuang Flood Hazard Index ay " +
								total +
								". Maaaring bumaha sa inyong lugar.", //can be edited
						},
					};

					//time
					var date = new Date();
					let hour = addZero(date.getHours());
					let mins = addZero(date.getMinutes());
					var time = hour + ":" + mins;

					var year = date.getFullYear();
					var plusmonth = ("0" + (date.getMonth() + 1)).slice(-2);
					var day = ("0" + date.getDate()).slice(-2);
					let yearnow = year.toString();

					let plusmonthnow = plusmonth.toString();
					let daynow = day.toString();
					let timenow = time.toString();
					let thisdate = plusmonth + "-" + daynow;
					let thisdatenow = thisdate.toString();

					if (total >= 10.0) {
						firebase
							.database()
							.ref("FloodNotification")
							.once("value", function (snapshot) {
								snapshot.forEach(function (ChildSnapshot) {
									var notifref = ChildSnapshot.ref;
									var notref = notifref
										.child("MessageSent")
										.child(yearnow)
										.child(thisdatenow)
										.child(timenow);
									notref.push({
										SentTo: brng,
									});
								});
							});
						fetch("https://fcm.googleapis.com/fcm/send", {
							method: "POST",
							headers: {
								Authorization:
									"key=AAAAZcrRA5E:APA91bHvK-sDaNH9WjIERKJXiQuaKbX1lYM0TSH-NpvWVcpimT5DivvTL6hoTLQ6F0puAzoORopR9sQbM4RCSA2wxgdxHg4M43fQbXXx1uOl1xjU27sAW1Q_Hx_iJITCFebRqpBWKsTQ",
								"Content-Type": "application/json",
							},
							body: JSON.stringify(notifmessage),
						})
							.then((results) => results.json())
							.then(console.log)
							.catch((error) => console.log(error));
					} else {
					}

					function addZero(i) {
						if (i < 10) {
							i = "0" + i;
						}
						return i;
					}

					//FHI saver
					firebase
						.database()
						.ref("RainIntUpdates")
						.orderByChild("Barangay")
						.equalTo(brng)
						.once("value", function (snapshot) {
							snapshot.forEach(function (data) {
								var dataref = data.ref;
								var key = dataref.key;
								var ref = dataref
									.child("Year")
									.child(yearnow)
									.child(plusmonthnow)
									.child(daynow)
									.child(timenow);
								ref.set({
									FHI: total,
								});
							});
						});
				});
			});
	}
}, 60000);

window.setInterval(function () {
	// Set interval for checking
	var date = new Date(); // Create a Date object to find out what time it is
	if (
		date.getMinutes() === 1 ||
		date.getMinutes() === 16 ||
		date.getMinutes() === 31 ||
		date.getMinutes() === 46
	) {
		// Check the time
		location.reload();
	}
}, 60000);

//navigation
function w3_open() {
	document.getElementById("mySidebar").style.display = "block";
}

function w3_close() {
	document.getElementById("mySidebar").style.display = "none";
}
function FHINav() {
	window.location.href = "floodhazard.html";
}
function StatisticNav() {
	window.location.href = "Statistics.html";
}
function FlooddrillNav() {
	window.location.href = "FloodDrill.html";
}

// Set up our login function
function login() {
	// Get all our input fields
	email = document.getElementById("email").value;
	password = document.getElementById("password").value;

	// Validate input fields
	if (validate_email(email) == false || validate_password(password) == false) {
		alert("Email or Password is Outta Line");
		return;
		// Don't continue running the code
	}

	//end users cannot login here
	firebase
		.database()
		.ref("User")
		.once("value", function (snapshot) {
			snapshot.forEach(function (ChildSnapshot) {
				let emails = ChildSnapshot.val().email;
				if (emails === email) {
					alert("You are not allowed in here");
					return;
				} else {
					auth
						.signInWithEmailAndPassword(email, password)
						.then(function () {
							// Declare user variable
							var user = auth.currentUser;

							// // Add this user to Firebase Database
							// var database_ref = database.ref()

							// Done
							window.location.href = "Statistics.html";
						})
						.catch(function (error) {
							// Firebase will use this to alert of its errors
							var error_code = error.code;
							var error_message = error.message;
							alert(error_message);
						});
				}
			});
		});
}

// Validate Functions
function validate_email(email) {
	expression = /^[^@]+@\w+(\.\w+)+\w$/;
	if (expression.test(email) == true) {
		// Email is good
		return true;
	} else {
		// Email is not good
		return false;
	}
}
function validate_password(password) {
	// Firebase only accepts lengths greater than 6
	if (password < 6) {
		return false;
	} else {
		return true;
	}
}
function validate_field(field) {
	if (field == null) {
		return false;
	}

	if (field.length <= 0) {
		return false;
	} else {
		return true;
	}
}

//FHI table
function FHI() {
	var table = document.getElementById("myTable");
	var upd = document.getElementById("update");
	firebase
		.database()
		.ref("RainIntUpdates")
		.orderByChild("Barangay")
		.equalTo("Alima")
		.limitToLast(1)
		.once("value", function (snapshot) {
			snapshot.forEach(function (ChildSnapshot) {
				ChildSnapshot.forEach(function (SnapSnap) {
					SnapSnap.forEach(function (snaper) {
						//gets key of month which is the year
						snaper.forEach(function (snapping) {
							//gets key of day which is the month
							snapping.forEach(function (xtrasnap) {
								xtrasnap.forEach(function (sneyp) {
									sneyp.forEach(function (x) {
										var xy = x.ref.parent.key;
										upd.innerHTML = xy;
									});
								});
							});
						});
					});
				});
			});
		});
	let arrrow = [[]];
	firebase
		.database()
		.ref("FloodHazardIndex")
		.limitToFirst(10)
		.once("value", function (snapshot) {
			snapshot.forEach(function (ChildSnapshot) {
				var row = table.insertRow(-1);
				var cel1 = row.insertCell(0);
				var cel2 = row.insertCell(1);
				var cel3 = row.insertCell(2);
				var cel4 = row.insertCell(3);
				var cel5 = row.insertCell(4);
				var cel6 = row.insertCell(5);
				var cel7 = row.insertCell(6);
				cel1.innerHTML = ChildSnapshot.val().Barangay;
				let floodHazard = parseFloat(
					ChildSnapshot.val().FloodAccu * 0.0002645833
				);
				cel2.innerHTML = floodHazard.toFixed(3) + " Meters";
				cel3.innerHTML = ChildSnapshot.val().RainInt + " mm";
				var geo = ChildSnapshot.val().Geology;
				if (geo == 1) {
					cel4.innerHTML = "Quatenary";
				} else {
					cel4.innerHTML = "Neogene";
				}
				cel5.innerHTML = ChildSnapshot.val().LandUse;
				cel6.innerHTML = ChildSnapshot.val().SlopeElv + "°";
				if (ChildSnapshot.val().DrainNet == 10) {
					cel7.innerHTML = "Below 2 Kilometers";
				} else if (ChildSnapshot.val().DrainNet == 8) {
					cel7.innerHTML = "2.1 to 5 Kilometers";
				} else if (ChildSnapshot.val().DrainNet == 6) {
					cel7.innerHTML = "5.1 to 7 Kilometers";
				} else if (ChildSnapshot.val().DrainNet == 4) {
					cel7.innerHTML = "7.1 to 10 kilometers";
				} else {
					cel7.innerHTML = "Above 10.1 kilometers";
				}
				// arrrow[[0]].push(row.innerHTML)
				// console.log(arrrow)
			});
		});
}

//barangay DD in flood hazard
function brngy() {
	let refer = firebase.database().ref("RainIntUpdates");
	refer.once("value", function (snapshot) {
		snapshot.forEach(function (ChildSnapshot) {
			let barangay = ChildSnapshot.val().Barangay;
			var x = document.getElementById("barangay");
			var option = document.createElement("option");
			option.value = barangay;
			option.text = barangay;
			x.add(option);
		});
	});
}

//Barangay DropDown
function brngyDD() {
	let refer = firebase.database().ref("RainIntUpdates");
	let months = document.getElementById("month");
	let days = document.getElementById("day");
	let mnts = document.getElementById("mo");
	let dys = document.getElementById("daynumb");

	refer.once("value", function (snapshot) {
		snapshot.forEach(function (ChildSnapshot) {
			let barangay = ChildSnapshot.val().Barangay;
			var x = document.getElementById("barangay");
			var option = document.createElement("option");
			option.value = barangay;
			option.text = barangay;
			x.add(option);
		});
	});
	for (let i = 1; i < 13; i++) {
		month = i <= 9 ? "0" + i : i;
		var monthoption = document.createElement("option");
		monthoption.value = month;
		monthoption.text = month;
		months.add(monthoption);
	}
	for (let x = 1; x < 32; x++) {
		var dayoption = document.createElement("option");
		dayoption.value = x;
		dayoption.text = x;
		days.add(dayoption);
	}

	refer.once("value", function (snapshot) {
		snapshot.forEach(function (ChildSnapshot) {
			let barangay = ChildSnapshot.val().Barangay;
			var x = document.getElementById("brns");
			var option = document.createElement("option");
			option.value = barangay;
			option.text = barangay;
			x.add(option);
		});
	});

	for (let i = 1; i < 13; i++) {
		z = i <= 9 ? "0" + i : i;
		var monthoptions = document.createElement("option");
		monthoptions.value = z;
		monthoptions.text = z;
		mnts.add(monthoptions);
	}
	for (let x = 1; x < 32; x++) {
		var daysoption = document.createElement("option");
		daysoption.value = x;
		daysoption.text = x;
		dys.add(daysoption);
	}
}

// new function for notif and drill
function notification() {
	let arr = [];
	const newArr = [];
	let table = document.getElementById("notif");
	let drilltbl = document.getElementById("drill");
	let notificref = firebase.database().ref("FloodNotification").child("notif");

	notificref.child("MessageSent").once("value", function (snapshot) {
		snapshot.forEach(function (ChildSnapshot) {
			ChildSnapshot.forEach(function (snapsnap) {
				let asd = snapsnap.key;
				var numb = document.getElementById("notif").rows.length;

				var row = table.insertRow(1);
				row.innerHTML = asd;
				var aTable = document.createElement("table");

				snapsnap.forEach(function (wiefunc) {
					let das = wiefunc.key;
					let url = wiefunc.ref + ".json";

					var arow = document.createElement("tr");
					var acel1 = arow.insertCell(-1);
					acel1.appendChild(document.createTextNode("Time: " + das));
					acel1.style.cursor = "pointer";
					acel1.onclick = function (e) {
						var sentToList = [];

						wiefunc.forEach(function (wiewie) {
							let sentTo = wiewie.val().SentTo;
							sentToList.push(sentTo);
						});
						var uniqueSentToList = Array.from(new Set(sentToList));

						var sentToText = uniqueSentToList.join(", ");

						alert("Sento to Barangay: " + sentToText);
					};

					wiefunc.forEach(function (wiewie) {
						let x = wiewie.val().SentTo;
					});
					//wiefunc
					arow.appendChild(acel1);
					aTable.appendChild(arow);
					row.appendChild(aTable);
				});
			});
		});
	});

	// notificref.child("MessageSent").once("value", function (snapshot) {
	// 	snapshot.forEach(function (yearSnapshot) {
	// 		yearSnapshot.forEach(function (monthSnapshot) {
	// 			monthSnapshot.forEach(function (timeSnapshot) {
	// 				timeSnapshot.forEach(function (messageSnapshot) {
	// 					let year = yearSnapshot.key;
	// 					let date = monthSnapshot.key;
	// 					let time = timeSnapshot.key;
	// 					let sentTo = messageSnapshot.child("SentTo").val();
	// 					let message = messageSnapshot.child("Message").val();

	// 					var row = table.insertRow(1);
	// 					var aTable = document.createElement("table");

	// 					var arow = document.createElement("tr");

	// 					// Create a cell for date, time, barangay, and message
	// 					var acel1 = document.createElement("td");
	// 					acel1.textContent = Time: ${time};
	// 					acel1.style.cursor = "pointer";
	// 					acel1.onclick = function () {
	// 						alert(Barangay: ${sentTo});
	// 					};
	// 					arow.appendChild(acel1);

	// 					// Add the row to the table
	// 					aTable.appendChild(arow);
	// 					row.appendChild(aTable);
	// 				});
	// 			});
	// 		});
	// 	});
	// });

	// finorce loop ko nalng talaga since madaming barangay yung naka implement sa database/json
	notificref.child("MessageDrill").once("value", function (snapshot) {
		snapshot.forEach(function (yearSnapshot) {
			yearSnapshot.forEach(function (monthSnapshot) {
				monthSnapshot.forEach(function (timeSnapshot) {
					timeSnapshot.forEach(function (messageSnapshot) {
						let year = yearSnapshot.key;
						let date = monthSnapshot.key;
						let time = timeSnapshot.key;
						let sentTo = messageSnapshot.child("SentTo").val();
						let message = messageSnapshot.child("Message").val();

						var row = drilltbl.insertRow(1);
						var aTable = document.createElement("table");

						var arow = document.createElement("tr");

						var acel1 = document.createElement("td");
						acel1.textContent = `Date: ${date}, Time: ${time}, Barangay: ${sentTo}`;
						acel1.style.cursor = "pointer";
						acel1.onclick = function () {
							alert(
								`Date: ${date}, Time: ${time}, Barangay: ${sentTo}\nMessage: ${message}`
							);
						};
						arow.appendChild(acel1);

						aTable.appendChild(arow);
						row.appendChild(aTable);
					});
				});
			});
		});
	});
}
// old function for notif and drill
// function notification() {
// 	let arr = [];
// 	const newArr = [];
// 	let table = document.getElementById("notif");
// 	let drilltbl = document.getElementById("drill");
// 	let notificref = firebase.database().ref("FloodNotification").child("notif");

// 	notificref.child("MessageSent").once("value", function (snapshot) {
// 		snapshot.forEach(function (ChildSnapshot) {
// 			ChildSnapshot.forEach(function (snapsnap) {
// 				let asd = snapsnap.key;
// 				var numb = document.getElementById("notif").rows.length;

// 				var row = table.insertRow(1);
// 				row.innerHTML = asd;
// 				var aTable = document.createElement("table");

// 				snapsnap.forEach(function (wiefunc) {
// 					let das = wiefunc.key;
// 					let url = wiefunc.ref + ".json";

// 					var arow = document.createElement("tr");
// 					var acel1 = arow.insertCell(-1);
// 					acel1.appendChild(document.createTextNode("Time: " + das));

// 					acel1.onclick = function (e) {
// 						window.open(url);
// 					};

// 					wiefunc.forEach(function (wiewie) {
// 						let x = wiewie.val().SentTo;
// 					});
// 					//wiefunc
// 					arow.appendChild(acel1);
// 					aTable.appendChild(arow);
// 					row.appendChild(aTable);
// 				});
// 			});
// 		});
// 	});

// 	notificref.child("MessageDrill").once("value", function (snapshot) {
// 		snapshot.forEach(function (ChildSnapshot) {
// 			ChildSnapshot.forEach(function (snapsnap) {
// 				let asd = snapsnap.key;
// 				var numb = document.getElementById("drill").rows.length;

// 				var row = drilltbl.insertRow(1);
// 				row.innerHTML = asd;
// 				var aTable = document.createElement("table");

// 				snapsnap.forEach(function (wiefunc) {
// 					let das = wiefunc.key;
// 					let url = wiefunc.ref + ".json";

// 					var arow = document.createElement("tr");
// 					var acel1 = arow.insertCell(-1);
// 					acel1.appendChild(document.createTextNode("Time: " + das));

// 					acel1.onclick = function (e) {
// 						window.open(url);
// 					};

// 					wiefunc.forEach(function (wiewie) {
// 						// let x = wiewie.val().SentTo;
// 					});
// 					//wiefunc
// 					arow.appendChild(acel1);
// 					aTable.appendChild(arow);
// 					row.appendChild(aTable);
// 				});
// 			});
// 		});
// 	});
// }
