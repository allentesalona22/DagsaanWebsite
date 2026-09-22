function filter(){
  var x = document.getElementById("barangay");
  var barangay = x.options[x.selectedIndex].text;
  if(barangay === "Bacoor"){
    location.reload(); 
  }
  else{
  var table = document.getElementById("myTable");
  var tableHeaderRowCount = 1;
  var rowCount = table.rows.length;
  for (var i = tableHeaderRowCount; i < rowCount; i++) {
    table.deleteRow(tableHeaderRowCount);
  }
  firebase.database().ref('FloodHazardIndex').orderByChild("Barangay").equalTo(barangay).once('value', function(snapshot){
    snapshot.forEach(function(ChildSnapshot){
        var row = table.insertRow(-1);
        var cel1 = row.insertCell(0);
        var cel2 = row.insertCell(1);
        var cel3 = row.insertCell(2);
        var cel4 = row.insertCell(3);
        var cel5 = row.insertCell(4);
        var cel6 = row.insertCell(5);
        var cel7 = row.insertCell(6);
        cel1.innerHTML = ChildSnapshot.val().Barangay;
        let floodHazard = parseFloat(ChildSnapshot.val().FloodAccu * 0.0002645833);
        cel2.innerHTML = floodHazard.toFixed(3) + " Meters";
        cel3.innerHTML = ChildSnapshot.val().RainInt + " mm";
        var geo = ChildSnapshot.val().Geology;
        if(geo == 1){
          cel4.innerHTML = "Quatenary";
        } else{
          cel4.innerHTML = "Neogene";
        }
        cel5.innerHTML = ChildSnapshot.val().LandUse;
        cel6.innerHTML = ChildSnapshot.val().SlopeElv + "°";
        if (ChildSnapshot.val().DrainNet == 10){
          cel7.innerHTML = "Below 2 Kilometers";
        }
        else if (ChildSnapshot.val().DrainNet == 8){
          cel7.innerHTML = "2.1 to 5 Kilometers";
        }
        else if (ChildSnapshot.val().DrainNet == 6){
          cel7.innerHTML = "5.1 to 7 Kilometers";
        }
        else if (ChildSnapshot.val().DrainNet == 4){
          cel7.innerHTML = "7.1 to 10 kilometers";
        }
        else {
          cel7.innerHTML = "Above 10.1 kilometers";
        }
    })
  })
  }
}

function first(){
  var table = document.getElementById("myTable");
  var tableHeaderRowCount = 1;
  var rowCount = table.rows.length;
  for (var i = tableHeaderRowCount; i < rowCount; i++) {
    table.deleteRow(tableHeaderRowCount);
  }
  firebase.database().ref('FloodHazardIndex').limitToFirst(10).once('value', function(snapshot){
    snapshot.forEach(function(ChildSnapshot){
        var row = table.insertRow(-1);
        var cel1 = row.insertCell(0);
        var cel2 = row.insertCell(1);
        var cel3 = row.insertCell(2);
        var cel4 = row.insertCell(3);
        var cel5 = row.insertCell(4);
        var cel6 = row.insertCell(5);
        var cel7 = row.insertCell(6);
        cel1.innerHTML = ChildSnapshot.val().Barangay;
        let floodHazard = parseFloat(ChildSnapshot.val().FloodAccu * 0.0002645833);
        cel2.innerHTML = floodHazard.toFixed(3) + " Meters";
        cel3.innerHTML = ChildSnapshot.val().RainInt + " mm";
        var geo = ChildSnapshot.val().Geology;
        if(geo == 1){
          cel4.innerHTML = "Quatenary";
        } else{
          cel4.innerHTML = "Neogene";
        }
        cel5.innerHTML = ChildSnapshot.val().LandUse;
        cel6.innerHTML = ChildSnapshot.val().SlopeElv + "°";
        if (ChildSnapshot.val().DrainNet == 10){
          cel7.innerHTML = "Below 2 Kilometers";
        }
        else if (ChildSnapshot.val().DrainNet == 8){
          cel7.innerHTML = "2.1 to 5 Kilometers";
        }
        else if (ChildSnapshot.val().DrainNet == 6){
          cel7.innerHTML = "5.1 to 7 Kilometers";
        }
        else if (ChildSnapshot.val().DrainNet == 4){
          cel7.innerHTML = "7.1 to 10 kilometers";
        }
        else {
          cel7.innerHTML = "Above 10.1 kilometers";
        }
    })

})
}

function second(){
  var table = document.getElementById("myTable");
  var tableHeaderRowCount = 1;
  var rowCount = table.rows.length;
  for (var i = tableHeaderRowCount; i < rowCount; i++) {
    table.deleteRow(tableHeaderRowCount);
  }
  firebase.database().ref('FloodHazardIndex').orderByKey().startAt('10').endAt('19').once('value', function(snapshot){
    snapshot.forEach(function(ChildSnapshot){
        var row = table.insertRow(-1);
        var cel1 = row.insertCell(0);
        var cel2 = row.insertCell(1);
        var cel3 = row.insertCell(2);
        var cel4 = row.insertCell(3);
        var cel5 = row.insertCell(4);
        var cel6 = row.insertCell(5);
        var cel7 = row.insertCell(6);
        cel1.innerHTML = ChildSnapshot.val().Barangay;
        let floodHazard = parseFloat(ChildSnapshot.val().FloodAccu * 0.0002645833);
        cel2.innerHTML = floodHazard.toFixed(3) + " Meters";
        cel3.innerHTML = ChildSnapshot.val().RainInt + " mm";
        var geo = ChildSnapshot.val().Geology;
        if(geo == 1){
          cel4.innerHTML = "Quatenary";
        } else{
          cel4.innerHTML = "Neogene";
        }
        cel5.innerHTML = ChildSnapshot.val().LandUse;
        cel6.innerHTML = ChildSnapshot.val().SlopeElv + "°";
        if (ChildSnapshot.val().DrainNet == 10){
          cel7.innerHTML = "Below 2 Kilometers";
        }
        else if (ChildSnapshot.val().DrainNet == 8){
          cel7.innerHTML = "2.1 to 5 Kilometers";
        }
        else if (ChildSnapshot.val().DrainNet == 6){
          cel7.innerHTML = "5.1 to 7 Kilometers";
        }
        else if (ChildSnapshot.val().DrainNet == 4){
          cel7.innerHTML = "7.1 to 10 kilometers";
        }
        else {
          cel7.innerHTML = "Above 10.1 kilometers";
        }
    })

})
}
function third(){
  var table = document.getElementById("myTable");
  var tableHeaderRowCount = 1;
  var rowCount = table.rows.length;
  for (var i = tableHeaderRowCount; i < rowCount; i++) {
    table.deleteRow(tableHeaderRowCount);
  }
  firebase.database().ref('FloodHazardIndex').orderByKey().startAt('20').endAt('29').once('value', function(snapshot){
    snapshot.forEach(function(ChildSnapshot){
        var row = table.insertRow(-1);
        var cel1 = row.insertCell(0);
        var cel2 = row.insertCell(1);
        var cel3 = row.insertCell(2);
        var cel4 = row.insertCell(3);
        var cel5 = row.insertCell(4);
        var cel6 = row.insertCell(5);
        var cel7 = row.insertCell(6);
        cel1.innerHTML = ChildSnapshot.val().Barangay;
        let floodHazard = parseFloat(ChildSnapshot.val().FloodAccu * 0.0002645833);
        cel2.innerHTML = floodHazard.toFixed(3) + " Meters";
        cel3.innerHTML = ChildSnapshot.val().RainInt + " mm";
        var geo = ChildSnapshot.val().Geology;
        if(geo == 1){
          cel4.innerHTML = "Quatenary";
        } else{
          cel4.innerHTML = "Neogene";
        }
        cel5.innerHTML = ChildSnapshot.val().LandUse;
        cel6.innerHTML = ChildSnapshot.val().SlopeElv + "°";
        if (ChildSnapshot.val().DrainNet == 10){
          cel7.innerHTML = "Below 2 Kilometers";
        }
        else if (ChildSnapshot.val().DrainNet == 8){
          cel7.innerHTML = "2.1 to 5 Kilometers";
        }
        else if (ChildSnapshot.val().DrainNet == 6){
          cel7.innerHTML = "5.1 to 7 Kilometers";
        }
        else if (ChildSnapshot.val().DrainNet == 4){
          cel7.innerHTML = "7.1 to 10 kilometers";
        }
        else {
          cel7.innerHTML = "Above 10.1 kilometers";
        }
    })

})
}

function fourth(){
  var table = document.getElementById("myTable");
  var tableHeaderRowCount = 1;
  var rowCount = table.rows.length;
  for (var i = tableHeaderRowCount; i < rowCount; i++) {
    table.deleteRow(tableHeaderRowCount);
  }
  firebase.database().ref('FloodHazardIndex').orderByKey().startAt('30').endAt('39').once('value', function(snapshot){
    snapshot.forEach(function(ChildSnapshot){
        var row = table.insertRow(-1);
        var cel1 = row.insertCell(0);
        var cel2 = row.insertCell(1);
        var cel3 = row.insertCell(2);
        var cel4 = row.insertCell(3);
        var cel5 = row.insertCell(4);
        var cel6 = row.insertCell(5);
        var cel7 = row.insertCell(6);
        cel1.innerHTML = ChildSnapshot.val().Barangay;
        let floodHazard = parseFloat(ChildSnapshot.val().FloodAccu * 0.0002645833);
        cel2.innerHTML = floodHazard.toFixed(3) + " Meters";
        cel3.innerHTML = ChildSnapshot.val().RainInt + " mm";
        var geo = ChildSnapshot.val().Geology;
        if(geo == 1){
          cel4.innerHTML = "Quatenary";
        } else{
          cel4.innerHTML = "Neogene";
        }
        cel5.innerHTML = ChildSnapshot.val().LandUse;
        cel6.innerHTML = ChildSnapshot.val().SlopeElv + "°";
        if (ChildSnapshot.val().DrainNet == 10){
          cel7.innerHTML = "Below 2 Kilometers";
        }
        else if (ChildSnapshot.val().DrainNet == 8){
          cel7.innerHTML = "2.1 to 5 Kilometers";
        }
        else if (ChildSnapshot.val().DrainNet == 6){
          cel7.innerHTML = "5.1 to 7 Kilometers";
        }
        else if (ChildSnapshot.val().DrainNet == 4){
          cel7.innerHTML = "7.1 to 10 kilometers";
        }
        else {
          cel7.innerHTML = "Above 10.1 kilometers";
        }
    })

})
}
function fifth(){
  var table = document.getElementById("myTable");
  var tableHeaderRowCount = 1;
  var rowCount = table.rows.length;
  for (var i = tableHeaderRowCount; i < rowCount; i++) {
    table.deleteRow(tableHeaderRowCount);
  }
  firebase.database().ref('FloodHazardIndex').orderByKey().startAt('40').endAt('49').once('value', function(snapshot){
    snapshot.forEach(function(ChildSnapshot){
        var row = table.insertRow(-1);
        var cel1 = row.insertCell(0);
        var cel2 = row.insertCell(1);
        var cel3 = row.insertCell(2);
        var cel4 = row.insertCell(3);
        var cel5 = row.insertCell(4);
        var cel6 = row.insertCell(5);
        var cel7 = row.insertCell(6);
        cel1.innerHTML = ChildSnapshot.val().Barangay;
        let floodHazard = parseFloat(ChildSnapshot.val().FloodAccu * 0.0002645833);
        cel2.innerHTML = floodHazard.toFixed(3) + " Meters";
        cel3.innerHTML = ChildSnapshot.val().RainInt + " mm";
        var geo = ChildSnapshot.val().Geology;
        if(geo == 1){
          cel4.innerHTML = "Quatenary";
        } else{
          cel4.innerHTML = "Neogene";
        }
        cel5.innerHTML = ChildSnapshot.val().LandUse;
        cel6.innerHTML = ChildSnapshot.val().SlopeElv + "°";
        if (ChildSnapshot.val().DrainNet == 10){
          cel7.innerHTML = "Below 2 Kilometers";
        }
        else if (ChildSnapshot.val().DrainNet == 8){
          cel7.innerHTML = "2.1 to 5 Kilometers";
        }
        else if (ChildSnapshot.val().DrainNet == 6){
          cel7.innerHTML = "5.1 to 7 Kilometers";
        }
        else if (ChildSnapshot.val().DrainNet == 4){
          cel7.innerHTML = "7.1 to 10 kilometers";
        }
        else {
          cel7.innerHTML = "Above 10.1 kilometers";
        }
    })

})
}

function sixth(){
  var table = document.getElementById("myTable");
  var tableHeaderRowCount = 1;
  var rowCount = table.rows.length;
  for (var i = tableHeaderRowCount; i < rowCount; i++) {
    table.deleteRow(tableHeaderRowCount);
  }
  firebase.database().ref('FloodHazardIndex').orderByKey().startAt('50').endAt('59').once('value', function(snapshot){
    snapshot.forEach(function(ChildSnapshot){
        var row = table.insertRow(-1);
        var cel1 = row.insertCell(0);
        var cel2 = row.insertCell(1);
        var cel3 = row.insertCell(2);
        var cel4 = row.insertCell(3);
        var cel5 = row.insertCell(4);
        var cel6 = row.insertCell(5);
        var cel7 = row.insertCell(6);
        cel1.innerHTML = ChildSnapshot.val().Barangay;
        let floodHazard = parseFloat(ChildSnapshot.val().FloodAccu * 0.0002645833);
        cel2.innerHTML = floodHazard.toFixed(3) + " Meters";
        cel3.innerHTML = ChildSnapshot.val().RainInt + " mm";
        var geo = ChildSnapshot.val().Geology;
        if(geo == 1){
          cel4.innerHTML = "Quatenary";
        } else{
          cel4.innerHTML = "Neogene";
        }
        cel5.innerHTML = ChildSnapshot.val().LandUse;
        cel6.innerHTML = ChildSnapshot.val().SlopeElv + "°";
        if (ChildSnapshot.val().DrainNet == 10){
          cel7.innerHTML = "Below 2 Kilometers";
        }
        else if (ChildSnapshot.val().DrainNet == 8){
          cel7.innerHTML = "2.1 to 5 Kilometers";
        }
        else if (ChildSnapshot.val().DrainNet == 6){
          cel7.innerHTML = "5.1 to 7 Kilometers";
        }
        else if (ChildSnapshot.val().DrainNet == 4){
          cel7.innerHTML = "7.1 to 10 kilometers";
        }
        else {
          cel7.innerHTML = "Above 10.1 kilometers";
        }
    })

})
}
function seventh(){
  var table = document.getElementById("myTable");
  var tableHeaderRowCount = 1;
  var rowCount = table.rows.length;
  for (var i = tableHeaderRowCount; i < rowCount; i++) {
    table.deleteRow(tableHeaderRowCount);
  }
  firebase.database().ref('FloodHazardIndex').orderByKey().startAt('60').endAt('72').once('value', function(snapshot){
    snapshot.forEach(function(ChildSnapshot){
        var row = table.insertRow(-1);
        var cel1 = row.insertCell(0);
        var cel2 = row.insertCell(1);
        var cel3 = row.insertCell(2);
        var cel4 = row.insertCell(3);
        var cel5 = row.insertCell(4);
        var cel6 = row.insertCell(5);
        var cel7 = row.insertCell(6);
        cel1.innerHTML = ChildSnapshot.val().Barangay;
        let floodHazard = parseFloat(ChildSnapshot.val().FloodAccu * 0.0002645833);
        cel2.innerHTML = floodHazard.toFixed(3) + " Meters";
        cel3.innerHTML = ChildSnapshot.val().RainInt + " mm";
        var geo = ChildSnapshot.val().Geology;
        if(geo == 1){
          cel4.innerHTML = "Quatenary";
        } else{
          cel4.innerHTML = "Neogene";
        }
        cel5.innerHTML = ChildSnapshot.val().LandUse;
        cel6.innerHTML = ChildSnapshot.val().SlopeElv + "°";
        if (ChildSnapshot.val().DrainNet == 10){
          cel7.innerHTML = "Below 2 Kilometers";
        }
        else if (ChildSnapshot.val().DrainNet == 8){
          cel7.innerHTML = "2.1 to 5 Kilometers";
        }
        else if (ChildSnapshot.val().DrainNet == 6){
          cel7.innerHTML = "5.1 to 7 Kilometers";
        }
        else if (ChildSnapshot.val().DrainNet == 4){
          cel7.innerHTML = "7.1 to 10 kilometers";
        }
        else {
          cel7.innerHTML = "Above 10.1 kilometers";
        }
    })

})
}