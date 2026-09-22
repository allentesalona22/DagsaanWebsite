/** @format */

var barangayArr = [];
var fhiArr = [];
var colors = [];
const CHART = document.getElementById("lineChart").getContext("2d");
var brn = document.getElementById("tbl");
let myChart = new Chart(CHART, 0);
let fhi;

//chart
firebase
	.database()
	.ref("RainIntUpdates")
	.once("value", function (snapshot) {
		snapshot.forEach(function (ChildSnapshot) {
			let barangay = ChildSnapshot.val().Barangay;
			barangayArr.push(barangay);
			ChildSnapshot.forEach(function (SnapSnap) {
				SnapSnap.forEach(function (snaper) {
					//gets key of month which is the year
					snaper.forEach(function (snapping) {
						//gets key of day which is the month
						snapping.forEach(function (xtrasnap) {
							xtrasnap.forEach(function (sneyp) {
								if (sneyp.child("FHI").exists()) {
									fhi = sneyp.val().FHI;
								} else {
								}
							});
						});
					});
				});
			});

			if (fhi >= 0 && fhi <= 10) {
				color = "blue";
			} else if (fhi > 10 && fhi <= 20) {
				color = "orange";
			} else {
				color = "red";
			}
			colors.push(color);
			fhiArr.push(fhi);
		});

		const low = (ctx, value) => (ctx.p1.parsed.y <= 10 ? value : undefined);

		const mid = (ctx, value) =>
			ctx.p1.parsed.y > 10 && ctx.p1.parsed.y <= 20 ? value : undefined;

		const high = (ctx, value) => (ctx.p1.parsed.y > 20 ? value : undefined);

		myChart.destroy();

		const lineChart = {
			data: {
				labels: barangayArr,
				datasets: [
					{
						type: "line",
						label: "Barangay Flood Hazard Index",
						data: fhiArr,
						fill: true,
						borderColor: colors,
						borderWidth: 1,
						tension: 0.5,
						segment: {
							borderColor: (ctx) =>
								low(ctx, "blue") || mid(ctx, "orange") || high(ctx, "red"),
						},
					},
				],
			},
		};

		myChart = new Chart(CHART, lineChart);
	});

function brnsel() {
	const low = (ctx, value) => (ctx.p1.parsed.y <= 10 ? value : undefined);

	const mid = (ctx, value) =>
		ctx.p1.parsed.y > 10 && ctx.p1.parsed.y <= 20 ? value : undefined;

	const high = (ctx, value) => (ctx.p1.parsed.y > 20 ? value : undefined);

	var fhiArr = [];
	var timeArr = [];
	var colors = [];
	var ers = document.getElementById("first");
	//barangay
	var x = document.getElementById("barangay");
	var barangay = x.options[x.selectedIndex].text;
	//month
	var y = document.getElementById("month");
	var months = y.options[y.selectedIndex].text;
	//day
	var z = document.getElementById("day");
	var days = z.options[z.selectedIndex].text;

	if (barangay === "Bacoor") {
		location.reload();
	} else {
		firebase
			.database()
			.ref("RainIntUpdates")
			.once("value", function (snapshot) {
				snapshot.forEach(function (ChildSnapshot) {
					//year and barangay
					let barangays = ChildSnapshot.val().Barangay;
					if (barangays === barangay) {
						ChildSnapshot.forEach(function (SnapSnap) {
							//year value (can add another year value i.e. 2024 up) (also add condition)
							SnapSnap.forEach(function (snaper) {
								//gets key of month which is the year
								snaper.forEach(function (snapping) {
									//gets key of day which is the month
									let snappinger = snapping.key;
									if (snappinger === months) {
										snapping.forEach(function (xtrasnap) {
											//gets key of every minute which is the day
											let xtrasnaper = xtrasnap.key;
											if (xtrasnaper === days) {
												xtrasnap.forEach(function (sneyp) {
													let fhi = sneyp.val().FHI;
													if (fhi >= 0 && fhi <= 10) {
														color = "blue";
													} else if (fhi > 10 && fhi <= 20) {
														color = "orange";
													} else {
														color = "red";
													}
													colors.push(color);
													fhiArr.push(fhi);
													let timekey = sneyp.key;
													if (timekey === "Barangay") {
													} else {
														timeArr.push(timekey);
													}
													const lineChart1 = {
														type: "line",
														data: {
															labels: timeArr,
															datasets: [
																{
																	label: barangay + " Flood Hazard Index",
																	data: fhiArr,
																	fill: true,
																	borderColor: colors,
																	borderWidth: 1,
																	tension: 0.5,
																	segment: {
																		borderColor: (ctx) =>
																			low(ctx, "blue") ||
																			mid(ctx, "orange") ||
																			high(ctx, "red"),
																	},
																},
															],
														},
													};
													myChart.destroy();
													myChart = new Chart(CHART, lineChart1);
												});
											} else {
												ers.style.visibility = "visible";
											}
										});
									} else {
										ers.style.visibility = "visible";
									}
								});
							});
						});
					} else {
					}
				});
			});
	}
}

function statstbl() {
	var table = document.getElementById("tbl");
	var tableHeaderRowCount = 1;
	var rowCount = table.rows.length;
	for (var i = tableHeaderRowCount; i < rowCount; i++) {
		table.deleteRow(tableHeaderRowCount);
	}
	var fhiArr = [];
	var ers = document.getElementById("second");
	//barangay
	var x = document.getElementById("brns");
	var barangay = x.options[x.selectedIndex].text;
	//month
	var y = document.getElementById("mo");
	var months = y.options[y.selectedIndex].text;
	//day
	var z = document.getElementById("daynumb");
	var days = z.options[z.selectedIndex].text;
	//chance
	var a = document.getElementById("chance");
	var chnc = a.options[a.selectedIndex].text;

	if (chnc === "-") {
		if (barangay === "Bacoor") {
			location.reload();
		} else {
			var row = brn.insertRow(-1);
			var cel1 = row.insertCell(0);
			var cel2 = row.insertCell(1);
			var cel3 = row.insertCell(2);
			var cel4 = row.insertCell(3);
			firebase
				.database()
				.ref("RainIntUpdates")
				.once("value", function (snapshot) {
					snapshot.forEach(function (ChildSnapshot) {
						//year and barangay
						let barangays = ChildSnapshot.val().Barangay;
						if (barangays === barangay) {
							ChildSnapshot.forEach(function (SnapSnap) {
								//year value (can add another year value i.e. 2024 up) (also add condition)
								SnapSnap.forEach(function (snaper) {
									//gets key of month which is the year
									snaper.forEach(function (snapping) {
										//gets key of day which is the month
										let snappinger = snapping.key;
										if (snappinger === months) {
											snapping.forEach(function (xtrasnap) {
												//gets key of every minute which is the day
												cel1.innerHTML = barangay;
												cel2.innerHTML =
													xtrasnap.key + "/" + snapping.key + "/" + snaper.key;
												let xtrasnaper = xtrasnap.key;
												if (xtrasnaper === days) {
													xtrasnap.forEach(function (sneyp) {
														let fhi = sneyp.val().FHI;
														fhiArr.push(fhi);
													});
												} else {
												}
											});
											let sum = 0;
											fhiArr.forEach((item) => {
												sum += item;
											});
											let calcave = sum / fhiArr.length;
											cel3.innerHTML = calcave;
											if (calcave > 10 && calcave <= 20) {
												cel4.innerHTML = "Moderate Chance";
											} else if (calcave > 20) {
												cel4.innerHTML = "High Chance";
											} else {
												cel4.innerHTML = "Low Chance";
											}
										} else {
										}
									});
								});
							});
						} else {
						}
					});
				});
		}
	} else if (chnc === "Low") {
		var fhiArr = [];
		let fhi;
		let barangays;
		let date;
		let sum = 0;
		firebase
			.database()
			.ref("RainIntUpdates")
			.once("value", function (snapshot) {
				snapshot.forEach(function (ChildSnapshot) {
					//year and barangay
					barangays = ChildSnapshot.val().Barangay;
					ChildSnapshot.forEach(function (SnapSnap) {
						//year value (can add another year value i.e. 2024 up) (also add condition)
						SnapSnap.forEach(function (snaper) {
							//gets key of month which is the year
							snaper.forEach(function (snapping) {
								//gets key of day which is the month
								snapping.forEach(function (xtrasnap) {
									//gets key of every minute which is the day
									date = xtrasnap.key + "/" + snapping.key + "/" + snaper.key;
									xtrasnap.forEach(function (sneyp) {
										fhiArr.push(sneyp.val().FHI);
										sum += sneyp.val().FHI;
										// if(sneyp.child('FHI').exists()){
										//   fhi = sneyp.val().FHI;
										// }else{}
									});
								});
							});
						});
					});
					let calcave = sum / fhiArr.length;
					if (calcave <= 10) {
						var row = brn.insertRow(-1);
						var cel1 = row.insertCell(0);
						var cel2 = row.insertCell(1);
						var cel3 = row.insertCell(2);
						var cel4 = row.insertCell(3);
						cel1.innerHTML = barangays;
						cel2.innerHTML = date;
						cel3.innerHTML = calcave;
						cel4.innerHTML = "Low Chance";
					} else {
					}
				});
			});
	} else if (chnc === "Moderate") {
		var fhiArr = [];
		let fhi;
		let barangays;
		let date;
		let sum = 0;
		firebase
			.database()
			.ref("RainIntUpdates")
			.once("value", function (snapshot) {
				snapshot.forEach(function (ChildSnapshot) {
					//year and barangay
					barangays = ChildSnapshot.val().Barangay;
					ChildSnapshot.forEach(function (SnapSnap) {
						//year value (can add another year value i.e. 2024 up) (also add condition)
						SnapSnap.forEach(function (snaper) {
							//gets key of month which is the year
							snaper.forEach(function (snapping) {
								//gets key of day which is the month
								snapping.forEach(function (xtrasnap) {
									//gets key of every minute which is the day
									date = xtrasnap.key + "/" + snapping.key + "/" + snaper.key;
									xtrasnap.forEach(function (sneyp) {
										fhiArr.push(sneyp.val().FHI);
										sum += sneyp.val().FHI;
										// if(sneyp.child('FHI').exists()){
										//   fhi = sneyp.val().FHI;
										// }else{}
									});
								});
							});
						});
					});
					let calcave = sum / fhiArr.length;
					if (calcave > 10 && calcave <= 20) {
						var row = brn.insertRow(-1);
						var cel1 = row.insertCell(0);
						var cel2 = row.insertCell(1);
						var cel3 = row.insertCell(2);
						var cel4 = row.insertCell(3);
						cel1.innerHTML = barangays;
						cel2.innerHTML = date;
						cel3.innerHTML = calcave;
						cel4.innerHTML = "Moderate Chance";
					} else {
					}
				});
			});
	} else {
		var fhiArr = [];
		let fhi;
		let barangays;
		let date;
		let sum = 0;
		firebase
			.database()
			.ref("RainIntUpdates")
			.once("value", function (snapshot) {
				snapshot.forEach(function (ChildSnapshot) {
					//year and barangay
					barangays = ChildSnapshot.val().Barangay;
					ChildSnapshot.forEach(function (SnapSnap) {
						//year value (can add another year value i.e. 2024 up) (also add condition)
						SnapSnap.forEach(function (snaper) {
							//gets key of month which is the year
							snaper.forEach(function (snapping) {
								//gets key of day which is the month
								snapping.forEach(function (xtrasnap) {
									//gets key of every minute which is the day
									date = xtrasnap.key + "/" + snapping.key + "/" + snaper.key;
									xtrasnap.forEach(function (sneyp) {
										fhiArr.push(sneyp.val().FHI);
										sum += sneyp.val().FHI;
										// if(sneyp.child('FHI').exists()){
										//   fhi = sneyp.val().FHI;
										// }else{}
									});
								});
							});
						});
					});
					let calcave = sum / fhiArr.length;
					if (calcave > 20) {
						var row = brn.insertRow(-1);
						var cel1 = row.insertCell(0);
						var cel2 = row.insertCell(1);
						var cel3 = row.insertCell(2);
						var cel4 = row.insertCell(3);
						cel1.innerHTML = barangays;
						cel2.innerHTML = date;
						cel3.innerHTML = calcave;
						cel4.innerHTML = "High Chance";
					} else {
					}
				});
			});
	}
}
