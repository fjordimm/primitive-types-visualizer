
function handleMainInputChange(event)
{
	let radioInpChecked = document.querySelector('input[name="radio-textinp"]:checked');
	handleMainInput(event.target, event.target.value, radioInpChecked.value);
}

/*
function handleMainInputKeydown(event)
{
	if (event.key == "Enter")
	{
		let radioInpChecked = document.querySelector('input[name="radio-textinp"]:checked');
		handleMainInput(event.target, event.target.value, radioInpChecked.value);
	}
}
*/

function handleRadioInputClick(event)
{
	let mainInput = document.getElementById("main-text-input");
	handleMainInput(mainInput, mainInput.value, event.target.value);
}

function handleMainInput(element, inpText, inpType)
{
	resetBadInput(element);

	if (inpType != "Hexadecimal" && isNaN(Number(inpText)))
	{
		activateBadInput(element);
		return;
	}

	const isPlainDec = new RegExp("^[\+\-]?[0-9]+(\.[0-9]+(e[\+\-]?[0-9]+)?)?$");
	const isPlainDecInt = new RegExp("^[\+\-]?[0-9]+$");
	const isNonDecInt = new RegExp("^0[a-zA-Z]");

	const isHex = new RegExp("^[\+\-]?0[xX]");
	const isPlainHexInt = new RegExp("^[\+\-]?[0-9a-fA-F]+$");

	const isOct = new RegExp("^[\+\-]?0[oO]");
	const isPlainOctInt = new RegExp("^[\+\-]?[0-7]+$");

	const isBin = new RegExp("^[\+\-]?0[bB]");
	const isPlainBinInt = new RegExp("^[\+\-]?[0-1]+$");

	if (inpType == "Auto")
	{
		if (isPlainDecInt.test(inpText) || isNonDecInt.test(inpText))
		{
			let num = BigInt(Number(inpText));
			let val = new BigInt64Array([num]);
			processInput(val);
			return;
		}
		else if (isPlainDec.test(inpText))
		{
			let num = Number(inpText);
			let val = new Float64Array([num]);
			processInput(val);
			return;
		}
		else
		{
			activateBadInput(element);
			return;
		}
	}
	else if (inpType == "Decimal (Int)")
	{
		if (isPlainDecInt.test(inpText) || isNonDecInt.test(inpText))
		{
			let num = BigInt(Number(inpText));
			let val = new BigInt64Array([num]);
			processInput(val);
			return;
		}
		else
		{
			activateBadInput(element);
			return;
		}
	}
	else if (inpType == "Decimal (Float)")
	{
		if (isPlainDec.test(inpText))
		{
			let num = Number(inpText);
			let val = new Float64Array([num]);
			processInput(val);
			return;
		}
		else
		{
			activateBadInput(element);
			return;
		}
	}
	else if (inpType == "Hexadecimal")
	{
		if (isHex.test(inpText))
		{
			let num = BigInt(Number(inpText));
			let val = new BigInt64Array([num]);
			processInput(val);
			return;
		}
		else if (isPlainHexInt.test(inpText))
		{
			let num = BigInt(Number("0x" + inpText));
			let val = new BigInt64Array([num]);
			processInput(val);
			return;
		}
		else
		{
			activateBadInput(element);
			return;
		}
	}
	else if (inpType == "Octal")
	{
		if (isOct.test(inpText))
		{
			let num = BigInt(Number(inpText));
			let val = new BigInt64Array([num]);
			processInput(val);
			return;
		}
		else if (isPlainOctInt.test(inpText))
		{
			let num = BigInt(Number("0o" + inpText));
			let val = new BigInt64Array([num]);
			processInput(val);
			return;
		}
		else
		{
			activateBadInput(element);
			return;
		}
	}
	else if (inpType == "Binary")
	{
		if (isBin.test(inpText))
		{
			let num = BigInt(Number(inpText));
			let val = new BigInt64Array([num]);
			processInput(val);
			return;
		}
		else if (isPlainBinInt.test(inpText))
		{
			let num = BigInt(Number("0b" + inpText));
			let val = new BigInt64Array([num]);
			processInput(val);
			return;
		}
		else
		{
			activateBadInput(element);
			return;
		}
	}
}

function activateBadInput(element)
{
	element.classList.add("bad-input");
}

function resetBadInput(element)
{
	element.classList.remove("bad-input");
}

function processInput(val)
{
	console.log(`val = ${val}, type = ${typeof val}, class name = ${val.constructor.name}`);
}
