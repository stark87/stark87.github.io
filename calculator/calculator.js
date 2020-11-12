function change(){
			if (document.getElementById("from").value == "Binary" && document.getElementById("to").value == "Octal"){
				document.getElementById("tag").innerHTML = "Binary To Octal";
			}

			if (document.getElementById("from").value == "Binary" && document.getElementById("to").value == "Decimal"){
				document.getElementById("tag").innerHTML = "Binary To Decimal";
			}

			if (document.getElementById("from").value == "Octal" && document.getElementById("to").value == "Binary"){
				document.getElementById("tag").innerHTML = "Octal To Binary";
			}

			if (document.getElementById("from").value == "Octal" && document.getElementById("to").value == "Decimal"){
				document.getElementById("tag").innerHTML = "Octal To Decimal";
			}

			if (document.getElementById("from").value == "Decimal" && document.getElementById("to").value == "Binary"){
				document.getElementById("tag").innerHTML = "Decimal To Binary";
			}

			if (document.getElementById("from").value == "Decimal" && document.getElementById("to").value == "Octal"){
				document.getElementById("tag").innerHTML = "Decimal To Octal";
			}

			if (document.getElementById("from").value == "Decimal" && document.getElementById("to").value == "Hexadecimal"){
				document.getElementById("tag").innerHTML = "Decimal To Hexadecimal";
			}

			if (document.getElementById("from").value == document.getElementById("to").value){
				document.getElementById("tag").innerHTML = document.getElementById("from").value;
			}
		}

		function convert(){
			var y = document.getElementById("number").value;
			var calc = "";

			if (document.getElementById("from").value == "Binary" && document.getElementById("to").value == "Octal"){
				calc = binarytoOctal(y);
			}

			if (document.getElementById("from").value == "Binary" && document.getElementById("to").value == "Decimal"){
				calc = binarytoDecimal(y);
			}

			if (document.getElementById("from").value == "Octal" && document.getElementById("to").value == "Binary"){
				calc = octaltoBinary(y);
			}

			if (document.getElementById("from").value == "Octal" && document.getElementById("to").value == "Decimal"){
				calc = octaltoDecimal(y);
			}

			if (document.getElementById("from").value == "Decimal" && document.getElementById("to").value == "Binary"){
				calc = decimaltoBinary(y);
			}

			if (document.getElementById("from").value == "Decimal" && document.getElementById("to").value == "Octal"){
				calc = decimaltoOctal(y);
			}

			if (document.getElementById("from").value == "Decimal" && document.getElementById("to").value == "Hexadecimal"){
				calc = decimaltoHex(y);
			}

			if (document.getElementById("from").value == document.getElementById("to").value){
				calc = y;
			}

			document.getElementById("output").value = calc;
		}

		function binarytoDecimal(x) {
			var dec = 0;
			var ans = 0;
			var arr = Array.from(String(x), Number);
			var arrCheck = Array.from(String(x), Number);
			arrCheck.sort(function(a, b){return b - a});
			if (arrCheck[0] > 1) {document.getElementById("display").innerHTML = "The number is not in base 2"; return "";}
			else {
				document.getElementById("display").innerHTML = "";
				arr.reverse();

				for (var i = 0; i < arr.length; i++) {
					ans = arr[i] * (2**i);
					dec = dec + ans;
				}
				Number(dec);
				return dec;
			}
		}

		function decimaltoBinary(x) {
			var ans = "";
			var bin = "";
			var fin = "";

			while (x > 1){
				ans = x % 2;
				bin += ans;
				x = Math.floor(x / 2);
			}

			if (x <= 1) {bin += x;}

			for (i = bin.length-1; i >= 0; i--) {
				fin += bin.substr(i,1);
			}
			Number(fin);

			return fin;
		}

		function decimaltoOctal(x) {
			var ans = "";
			var bin = "";
			var fin = "";

			while (x > 7){
				ans = x % 8;
				bin += ans;
				x = Math.floor(x / 8);
			}

			if (x <= 7) {bin += x;}

			for (i = bin.length-1; i >= 0; i--) {
				fin += bin.substr(i,1);
			}
			Number(fin);

			return fin;
		}

		function octaltoDecimal (x) {
			var dec = 0;
			var ans = 0;
			var arr = Array.from(String(x), Number);
			var arrCheck = Array.from(String(x), Number);
			arrCheck.sort(function(a, b){return b - a});
			if (arrCheck[0] > 7) {document.getElementById("display").innerHTML = "The number is not in base 8"; return"";}
			else {
				document.getElementById("display").innerHTML = "";
				arr.reverse();

				for (var i = 0; i < arr.length; i++) {
					ans = arr[i] * (8**i);
					dec = dec + ans;
				}
				Number(dec);
				return dec;
			}
		}

		function binarytoOctal (x) {
			return decimaltoOctal(binarytoDecimal(x));
		}

		function octaltoBinary (x) {
			return decimaltoBinary(octaltoDecimal(x));
		}

		function decimaltoHex (x) {
			var ans = "";
			var bin = "";
			var fin = "";

			while (x > 15){
				ans = x % 16;
				if (ans == 10){ans = "A";}
			    if (ans == 11){ans = "B";}
			    if (ans == 12){ans = "C";}
			    if (ans == 13){ans = "D";}
			    if (ans == 14){ans = "E";}
			    if (ans == 15){ans = "F";}
				bin += ans;
				x = Math.floor(x / 16);
			}

			if (x <= 15) {
				if (x == 10){x = "A";}
			    if (x == 11){x = "B";}
			    if (x == 12){x = "C";}
			    if (x == 13){x = "D";}
			    if (x == 14){x = "E";}
			    if (x == 15){x = "F";}
				bin += x;}

			for (i = bin.length-1; i >= 0; i--) {
				fin += bin.substr(i,1);
			}
			//Number(fin);

			return fin;
		}