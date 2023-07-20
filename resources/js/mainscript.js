
function handleMainInputChange(event)
{
	let radioInpChecked = document.querySelector('input[name="radio-textinp"]:checked');
	handleMainInput(event.target, event.target.value, radioInpChecked.value);
}

function handleMainInputKeydown(event)
{
	if (event.key == "Enter")
	{
		let radioInpChecked = document.querySelector('input[name="radio-textinp"]:checked');
		handleMainInput(event.target, event.target.value, radioInpChecked.value);
	}
}

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

	const isHex = new RegExp("^0[xX]");
	const isPlainHexInt = new RegExp("^[0-9a-fA-F]+$");

	const isOct = new RegExp("^0[oO]");
	const isPlainOctInt = new RegExp("^[0-7]+$");

	const isBin = new RegExp("^0[bB]");
	const isPlainBinInt = new RegExp("^[0-1]+$");

	if (inpType == "Auto")
	{
		if (isPlainDecInt.test(inpText) || isNonDecInt.test(inpText))
		{
			let num = BigInt(inpText);
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
			let num = BigInt(inpText);
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
			let num = BigInt(inpText);
			let val = new BigInt64Array([num]);
			processInput(val);
			return;
		}
		else if (isPlainHexInt.test(inpText))
		{
			let num = BigInt("0x" + inpText);
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
			let num = BigInt(inpText);
			let val = new BigInt64Array([num]);
			processInput(val);
			return;
		}
		else if (isPlainOctInt.test(inpText))
		{
			let num = BigInt("0o" + inpText);
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
			let num = BigInt(inpText);
			let val = new BigInt64Array([num]);
			processInput(val);
			return;
		}
		else if (isPlainBinInt.test(inpText))
		{
			let num = BigInt("0b" + inpText);
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

function activateOverflowWarning(element)
{
	element.classList.add("overflow-warning");
}

function resetOverflowWarning(element)
{
	element.classList.remove("overflow-warning");
}

function processInput(val)
{
	// console.log(`val = ${val}, type = ${typeof val}, class name = ${val.constructor.name}`);

	const uint8 = new Uint8Array([Number(val[0])]);
	const uint16 = new Uint16Array([Number(val[0])]);
	const uint32 = new Uint32Array([Number(val[0])]);
	const uint64 = new BigUint64Array([val[0]]);
	const sint8 = new Int8Array([Number(val[0])]);
	const sint16 = new Int16Array([Number(val[0])]);
	const sint32 = new Int32Array([Number(val[0])]);
	const sint64 = new BigInt64Array([val[0]]);

	processInputFor(val, uint8, "uint8", 8);
}

function processInputFor(origVal, val, type, actualBits)
{
	const elm = document.getElementById(`${type}`);
	const decElm = document.getElementById(`${type}-dec`);
	const hexElm = document.getElementById(`${type}-hex`);
	const octElm = document.getElementById(`${type}-oct`);
	const binElm = document.getElementById(`${type}-bin`);

	//console.log(``);

	resetOverflowWarning(elm);
	if (origVal[0] != BigInt(val[0]))
	{
		activateOverflowWarning(elm);
	}

	resetBadInput(decElm);
	resetBadInput(hexElm);
	resetBadInput(octElm);
	resetBadInput(binElm);

	decElm.value = val[0].toString();
	hexElm.value = "0x" + val[0].toString(16).toUpperCase().padStart(actualBits / 4, '0');
	octElm.value = "0o" + val[0].toString(8).padStart(Math.ceil(actualBits / 3), '0');
	binElm.value = "0b" + val[0].toString(2).padStart(actualBits, '0');
}
