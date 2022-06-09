function addChar(input, character) {
	if(input.value == null || input.value == "0")
		input.value = character
	else
		input.value += character
}

function cos(form) {
	form.display.value = Math.cos(form.display.value);
}

function sin(form) {
	form.display.value = Math.sin(form.display.value);
}

function tan(form) {
	form.display.value = Math.tan(form.display.value);
}

function sqrt(form) {
	form.display.value = Math.sqrt(form.display.value);
}

function ln(form) {
	form.display.value = Math.log(form.display.value);
}

function exp(form) {
	form.display.value = Math.exp(form.display.value);
}

function deleteChar(input) {
	input.value = input.value.substring(0, input.value.length - 1)
}

var val = 0.0;
function percent(form) {
    form.display.value = eval(form.display.value)/100;
}

function changeSign(input) {
	if(input.value.substring(0, 1) == "-")
		input.value = input.value.substring(1, input.value.length)
	else
		input.value = "-" + input.value
}

function compute(form) {
    form.display.value = eval(form.display.value);
}

function square(form) {
	form.display.value = eval(form.display.value) * eval(form.display.value)
}

function cube(form) {
	form.display.value = eval(form.display.value) * eval(form.display.value) * eval(form.display.value)
}

function checkNum(str) {
	for (var i = 0; i < str.length; i++) {
		var ch = str.charAt(i);
		if (ch < "0" || ch > "9") {
			if (ch != "/" && ch != "*" && ch != "+" && ch != "-" && ch != "."
				&& ch != "(" && ch!= ")" && ch != "%") {
				alert("invalid entry!")
				return false;
				}
			}
		}
		return true;
}

function degree(form){
    var pi = Math.PI;
    form.display.value = eval(form.display.value) * eval(180/pi);
}

function radian(form){
    var pi = Math.PI;
    form.display.value = eval(form.display.value) * eval(pi/180);
}

function fact(n) {
    if (n === 0){
        return 1;
    }    
    else{
       return (n * fact( n - 1 ));
    }
}

function factorial(form){
    form.display.value = eval(fact(form.display.value));
}

class MatrixCalculator {
	constructor() {
		this.matrixA = [];
		this.matrixB = [];
		for(var i=0; i<3; i++) {
			this.matrixA[i] = [];
			this.matrixB[i] = [];
		}
		
		this.AxDimension = 3;
		this.AyDimension = 3;
		this.BxDimension = 3;
		this.ByDimension = 3;
	}
	calculateDimensions() {
		//Calculating dimensions of matrix A
		this.AxDimension = 3;
		this.AyDimension = 3;
		
		var count = 2;
		//Decreasing the dimension and look at the next one, if there's a whole column of 0's  
		while (count>=0 && this.matrixA[0][count]==0 && this.matrixA[1][count]==0 && this.matrixA[2][count]==0) {
			this.AxDimension--;
			count--;
		}
		count = 2;
		//Decreasing the dimension and look at the next one, if there's a whole row of 0's 
		while (count>=0 && this.matrixA[count][0]==0 && this.matrixA[count][1]==0 && this.matrixA[count][2]==0) {
			this.AyDimension--;
			count--;
		}
		
		//Same calc for matrix B
		this.BxDimension = 3;
		this.ByDimension = 3;
		
		var count = 2;
		while (count>=0 && this.matrixB[0][count]==0 && this.matrixB[1][count]==0 && this.matrixB[2][count]==0) {
			this.BxDimension--;
			count--;
		}
		count = 2;
		while (count>=0 && this.matrixB[count][0]==0 && this.matrixB[count][1]==0 && this.matrixB[count][2]==0) {
			this.ByDimension--;
			count--;
		}		
	}

    rebuildMatrix() {
		var row1 = document.getElementsByClassName("m1r1");
		var row2 = document.getElementsByClassName("m1r2");
		var row3 = document.getElementsByClassName("m1r3");
		for (var i=0; i<3; i++) {
			this.matrixA[0][i] = row1[i].value;
			this.matrixA[1][i] = row2[i].value;
			this.matrixA[2][i] = row3[i].value;
		}
		row1 = document.getElementsByClassName("m2r1");
		row2 = document.getElementsByClassName("m2r2");
		row3 = document.getElementsByClassName("m2r3");
		for (var i=0; i<3; i++) {
			this.matrixB[0][i] = row1[i].value;
			this.matrixB[1][i] = row2[i].value;
			this.matrixB[2][i] = row3[i].value;
		}
		this.calculateDimensions();
	}
	
    calc_DetA() {
		this.rebuildMatrix();
		if (this.AxDimension!=this.AyDimension) {
			this.determinantA=null;
			this.printOnConsole("Non-square matrix, determinant cannot be calculated.");
			return;
		}
		var determinant;
		if (this.AxDimension==1) {
			determinant = this.matrixA[0][0];
		}
		if (this.AxDimension==2) {
			determinant = (this.matrixA[0][0]*this.matrixA[1][1])-(this.matrixA[0][1]*this.matrixA[1][0]);
		}
		if (this.AxDimension==3) {
			// If we want to calculate determinatant of a 3*3 matrix 
			//      |a b c|
			// |A|= |d e f|  = ( a*e*i + b*f*g + c*d*h - a*f*h -b*f*g - c*e*g)
			//      |g h i|

			var op1, op2, op3, r1, r2, r3;
			op1 = this.matrixA[0][0]*this.matrixA[1][1]*this.matrixA[2][2];
			op2 = this.matrixA[0][1]*this.matrixA[1][2]*this.matrixA[2][0];
			op3 = this.matrixA[0][2]*this.matrixA[1][0]*this.matrixA[2][1];
			r1 = this.matrixA[0][2]*this.matrixA[1][1]*this.matrixA[2][0];
			r2 = this.matrixA[0][0]*this.matrixA[1][2]*this.matrixA[2][1];
			r3 = this.matrixA[0][1]*this.matrixA[1][0]*this.matrixA[2][2];
			determinant = Math.round((op1+op2+op3-r1-r2-r3)*100)/100;
		}
		this.determinantA = determinant;
		let det;
		if(localStorage.getItem('Determinant(A)')===null){
			det=[];
		}else{
			det=JSON.parse(localStorage.getItem('Determinant(A)'));
		}
		det.push(determinant);
		localStorage.setItem('Determinant(A)',JSON.stringify(det));

		this.printOnConsole("Determinant of matrix A: "+determinant)
		return;
	}

    transposeMatrixA() {
		this.rebuildMatrix();
		var string = "Transposition result of matrix A:\r";
		for (var i =0; i<this.AxDimension; i++) {
			for (var j=0; j<this.AyDimension; j++) {
				string=string+"\t"+this.matrixA[j][i];
			}
			string=string+"\r";
		}
		this.printOnConsole(string);
	}
	
	calRankA() {
		this.rebuildMatrix();
		
		var rank = this.AxDimension;
		var row = this.AyDimension;
		var mat = this.matrixA;
		
		for (row = 0; row < rank; row++) { 
			if (mat[row][row]) { 
			   for (var col = 0; col < this.AyDimension; col++) { 
				   if (col != row) { 
					 var mult = Math.round(mat[col][row] / mat[row][row]*100)/100; 
					 for (var i = 0; i < rank; i++) 
					   mat[col][i] -= mult * mat[row][i]; 
				  } 
			   } 
			} 
			else
			{ 
				var reduce = true; 
				for (var i = row + 1; i < this.AyDimension;  i++) 
				{ 
					if (mat[i][row]) 
					{ 
						var aux = mat[row];
						mat[row] = math[i];
						math[i] = aux;
						reduce = false; 
						break; 
					} 
				} 
				if (reduce) 
				{ 
					rank--; 
					for (i = 0; i < this.AyDimension; i++) 
						mat[i][row] = mat[i][rank]; 
				} 
				row--; 
			} 
		} 
		let rankA;
		if(localStorage.getItem('Rank(A)')===null){
			rankA=[];
		}else{
			rankA=JSON.parse(localStorage.getItem('Rank(A)'));
		}
		rankA.push(rank);
		localStorage.setItem('Rank(A)',JSON.stringify(rankA));
		this.printOnConsole("Rank of matrix A: "+rank); 		
	}

	clear(){
       this.printOnConsole(document.getElementById('console').value = 'Result:');

	}

    addMatrix() {
		this.rebuildMatrix();
		if (this.AxDimension!=this.AyDimension) {
			this.printOnConsole("Matrices have different dimmensions.");
			return;
		}
		var result = [];
		for(var i=0; i<3; i++) 
			result[i]=[];
		for (i =0; i<this.AyDimension; i++) {
			for (var j=0; j<this.AxDimension; j++) {
				//Parsing is necessary here since addition operator can also concatenate strings
				result[i][j]=Math.round((parseFloat(this.matrixA[i][j])+parseFloat(this.matrixB[i][j]))*100)/100;
			}
		}
		var string = "Addition result:\r";
		for (i =0; i<this.AyDimension; i++) {
			for (var j=0; j<this.AxDimension; j++) {
				string=string+"\t"+result[i][j];
			}
			string=string+"\r";
		}
		this.printOnConsole(string);
	}
    
	subtractMatrix() {
		this.rebuildMatrix();
		if (this.AxDimension!=this.AyDimension) {
			this.printOnConsole("Matrices have different dimmensions.");
			return;
		}
		var result = [];
		for(var i=0; i<3; i++) 
			result[i]=[];
		for (i =0; i<this.AyDimension; i++) {
			for (var j=0; j<this.AxDimension; j++) {
				result[i][j]=Math.round((parseFloat(this.matrixA[i][j])-parseFloat(this.matrixB[i][j]))*100)/100;
			}
		}
		var string = "Subtraction result:\r";
		for (i =0; i<this.AyDimension; i++) {
			for (var j=0; j<this.AxDimension; j++) {
				string=string+"\t"+result[i][j];
			}
			string=string+"\r";
		}
		this.printOnConsole(string);
	}
	
	multiplyMatrix() {
		this.rebuildMatrix();
		if (this.AxDimension!=this.ByDimension) {
			this.printOnConsole("Number of columns on A is different from number of rows on B.");
			return;
		}
		var result = [];
		for(var i=0; i<3; i++) 
			result[i]=[];
		i=0;
		var j=0;
		//x refers to columns, y refers to rows
		var rowsRes = this.AyDimension;
		var columnsRes = this.BxDimension;
		
		for (i=0; i<rowsRes; i++) {
			for (j=0; j<columnsRes; j++) {
				result[i][j] = this.matrixA[i][0]*this.matrixB[0][j]+this.matrixA[i][1]*this.matrixB[1][j]+this.matrixA[i][2]*this.matrixB[2][j];
				result[i][j] = Math.round(result[i][j]*100)/100;
			}
		}
		var string = "Multiplication result:\r";
		for (i=0; i<rowsRes; i++) {
			for (j=0; j<columnsRes; j++) {
				string=string+"\t"+result[i][j];
			}
			string=string+"\r";
		}
		this.printOnConsole(string);
	}
	calc_DetB() {
		this.rebuildMatrix();
		if (this.BxDimension!=this.ByDimension) {
			this.determinantB=null;
			this.printOnConsole("Non-square matrix so determinant cannot be calculated.");
			return;
		}
		var determinant;
		if (this.BxDimension==1) {
			determinant = this.matrixB[0][0];
		}
		if (this.BxDimension==2) {
			determinant = (this.matrixB[0][0]*this.matrixB[1][1])-(this.matrixB[0][1]*this.matrixB[1][0]);
		}
		if (this.BxDimension==3) {
			var op1, op2, op3, r1, r2, r3;
			op1 = this.matrixB[0][0]*this.matrixB[1][1]*this.matrixB[2][2];
			op2 = this.matrixB[0][1]*this.matrixB[1][2]*this.matrixB[2][0];
			op3 = this.matrixB[0][2]*this.matrixB[1][0]*this.matrixB[2][1];
			r1 = this.matrixB[0][2]*this.matrixB[1][1]*this.matrixB[2][0];
			r2 = this.matrixB[0][0]*this.matrixB[1][2]*this.matrixB[2][1];
			r3 = this.matrixB[0][1]*this.matrixB[1][0]*this.matrixB[2][2];
			determinant = Math.round((op1+op2+op3-r1-r2-r3)*100)/100;
		}
		this.determinantB = determinant;
		let det;
		if(localStorage.getItem('Determinant(B)')===null){
			det=[];
		}else{
			det=JSON.parse(localStorage.getItem('Determinant(B)'));
		}
		det.push(determinant);
		localStorage.setItem('Determinant(B)',JSON.stringify(det));
		this.printOnConsole("Determinant of matrix B: "+determinant)
		return;
	}

    transposeMatrixB() {
		this.rebuildMatrix();
		var string = "Transposition result of matrix B:\r";
		for (var i =0; i<this.BxDimension; i++) {
			for (var j=0; j<this.ByDimension; j++) {
				string=string+"\t"+this.matrixB[j][i];
			}
			string=string+"\r";
		}
		this.printOnConsole(string);
	}
	
	calRankB() {
		this.rebuildMatrix();
		
		var rank = this.BxDimension;
		var row = this.ByDimension;
		var mat = this.matrixB;
		
		for (row = 0; row < rank; row++) { 
			if (mat[row][row]) { 
			   for (var col = 0; col < this.ByDimension; col++) { 
				   if (col != row) { 
					 var mult = Math.round(mat[col][row] / mat[row][row]*100)/100; 
					 for (var i = 0; i < rank; i++) 
					   mat[col][i] -= mult * mat[row][i]; 
				  } 
			   } 
			} 
			else
			{ 
				var reduce = true; 
				for (var i = row + 1; i < this.ByDimension;  i++) 
				{ 
					if (mat[i][row]) 
					{ 
						var aux = mat[row];
						mat[row] = math[i];
						math[i] = aux;
						reduce = false; 
						break; 
					} 
				} 
				if (reduce) 
				{ 
					rank--; 
					for (i = 0; i < this.ByDimension; i++) 
						mat[i][row] = mat[i][rank]; 
				} 
				row--; 
			} 
		} 
		let rankB;
		if(localStorage.getItem('Rank(B)')===null){
			rankB=[];
		}else{
			rankB=JSON.parse(localStorage.getItem('Rank(B)'));
		}
		rankB.push(rank);
		localStorage.setItem('Rank(B)',JSON.stringify(rankB));
		this.printOnConsole("Rank of matrix B: "+rank); 		
	}
    
	printOnConsole(val) {
		document.getElementById("console").value = val;
	}
	
	
	
}
var mat_calc = new MatrixCalculator();

function myFunction() {
	var element = document.body;
	element.classList.toggle("dark-mode");
 }
 
 var loader;

 function loadNow(opacity) {
	 if (opacity <= 0) {
		 displayContent();
	 } else {
		 loader.style.opacity = opacity;
		 window.setTimeout(function() {
			 loadNow(opacity - 0.05);
		 }, 50);
	 }
 }
 
 function displayContent() {
	 loader.style.display = 'none';
	 document.getElementById('content').style.display = 'block';
 }
 
 document.addEventListener("DOMContentLoaded", function() {
	 loader = document.getElementById('loader');
	 loadNow(1);
 }); 