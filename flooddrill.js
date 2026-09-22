/** @format */

function selected() {
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

	function addZero(i) {
		if (i < 10) {
			i = "0" + i;
		}
		return i;
	}

	var x = document.getElementById("barangay");
	var msg = document.getElementById("msg").value;
	var barangay = x.options[x.selectedIndex].text;
	var postUrl = "https://fcm.googleapis.com/fcm/send";
	var fcmServerKey =
		"key=AAAAZcrRA5E:APA91bHvK-sDaNH9WjIERKJXiQuaKbX1lYM0TSH-NpvWVcpimT5DivvTL6hoTLQ6F0puAzoORopR9sQbM4RCSA2wxgdxHg4M43fQbXXx1uOl1xjU27sAW1Q_Hx_iJITCFebRqpBWKsTQ";

	// The topic name can be optionally prefixed with "/topics/".
	const topic = "/topics/" + barangay;

	const message = {
		to: topic,
		notification: {
			title: "Dagsaan Notification",
			body: msg,
		},
	};

	firebase
		.database()
		.ref("FloodNotification")
		.once("value", function (snapshot) {
			snapshot.forEach(function (ChildSnapshot) {
				var notifref = ChildSnapshot.ref;
				var notref = notifref
					.child("MessageDrill")
					.child(yearnow)
					.child(thisdatenow)
					.child(timenow);
				notref.push({
					SentTo: barangay,
					Message: msg,
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
		body: JSON.stringify(message),
	})
		.then((results) => results.json())
		.then(console.log)
		.catch((error) => console.log(error));
	alert("Message Sent to " + barangay);
	//location.reload();
}
