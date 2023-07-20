
const isPlainDec = new RegExp("^[\+\-]?[0-9]+(\.[0-9]+(e[\+\-]?[0-9]+)?)?$");
const isPlainDecInt = new RegExp("^[\+\-]?[0-9]+$");

const isHex = new RegExp("^0[xX][0-9a-fA-F]+$");
const isPlainHexInt = new RegExp("^[0-9a-fA-F]+$");

const isOct = new RegExp("^0[oO][0-7]+$");
const isPlainOctInt = new RegExp("^[0-7]+$");

const isBin = new RegExp("^0[bB][0-1]+$");
const isPlainBinInt = new RegExp("^[0-1]+$");

function handleMainInputChange(event)
{
	handleMainInput(event.target);
}

function handleMainInputKeydown(event)
{
	if (event.key == "Enter")
	{
		event.target.blur();
		handleMainInput(event.target);
	}
}

function handleMainInput(element)
{
	const inpText = element.value;

	resetBadInput(element);

	if (isPlainDecInt.test(inpText) || isHex.test(inpText) || isOct.test(inpText) || isBin.test(inpText))
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

function handleInputChange(event)
{
	handleInput(event.target);
}

function handleInputFocusout(event)
{
	handleMainInput(document.getElementById("main-text-input"));
}

function handleInputKeydown(event)
{
	if (event.key == "Enter")
	{
		event.target.blur();
		handleInput(event.target);
	}
}

function handleInput(element)
{
	const inpText = element.value;
	const elmId = element.id;
	const inpType = elmId.slice(-3);
	const inpSigned = (elmId[0] == "s");
	const inpSize = Number.parseInt(elmId.slice(4));

	resetBadInput(element);

	if (inpType != "hex" && isNaN(Number(inpText)))
	{
		activateBadInput(element);
		return;
	}

	if (inpType == "dec")
	{
		if (isPlainDecInt.test(inpText))
		{
			let num = BigInt(inpText);
			if ((inpSigned && num < BigInt(2**inpSize / 2) && num >= BigInt(2**inpSize / -2)) || (!inpSigned && num >= 0 && num < BigInt(2**inpSize)))
			{
				let val = new BigInt64Array([num]);
				processInput(val);
				document.getElementById("main-text-input").value = inpText;
				return;
			}
			else
			{
				activateBadInput(element);
				return;
			}
		}
		else
		{
			activateBadInput(element);
			return;
		}
	}
	else if (inpType == "hex")
	{
		if (isHex.test(inpText))
		{
			let num = BigInt(inpText);
			if (num >= 0 && num < BigInt(2**inpSize))
			{
				let val = new BigInt64Array([num]);
				processInput(val);
				document.getElementById("main-text-input").value = formatHex(val, inpSize);
				return;
			}
			else
			{
				activateBadInput(element);
				return;
			}
		}
		else if (isPlainHexInt.test(inpText))
		{
			let num = BigInt("0x" + inpText);
			if (num >= 0 && num < BigInt(2**inpSize))
			{
				let val = new BigInt64Array([num]);
				processInput(val);
				document.getElementById("main-text-input").value = formatHex(val, inpSize);
				return;
			}
			else
			{
				activateBadInput(element);
				return;
			}
		}
		else
		{
			activateBadInput(element);
			return;
		}
	}
	else if (inpType == "oct")
	{
		if (isOct.test(inpText))
		{
			let num = BigInt(inpText);
			if (num >= 0 && num < BigInt(2**inpSize))
			{
				let val = new BigInt64Array([num]);
				processInput(val);
				document.getElementById("main-text-input").value = formatOct(val, inpSize);
				return;
			}
			else
			{
				activateBadInput(element);
				return;
			}
		}
		else if (isPlainOctInt.test(inpText))
		{
			let num = BigInt("0o" + inpText);
			if (num >= 0 && num < BigInt(2**inpSize))
			{
				let val = new BigInt64Array([num]);
				processInput(val);
				document.getElementById("main-text-input").value = formatOct(val, inpSize);
				return;
			}
			else
			{
				activateBadInput(element);
				return;
			}
		}
		else
		{
			activateBadInput(element);
			return;
		}
	}
	else if (inpType == "bin")
	{
		if (isBin.test(inpText))
		{
			let num = BigInt(inpText);
			if (num >= 0 && num < BigInt(2**inpSize))
			{
				let val = new BigInt64Array([num]);
				processInput(val);
				document.getElementById("main-text-input").value = formatBin(val, inpSize);
				return;
			}
			else
			{
				activateBadInput(element);
				return;
			}
		}
		else if (isPlainBinInt.test(inpText))
		{
			let num = BigInt("0b" + inpText);
			if (num >= 0 && num < BigInt(2**inpSize))
			{
				let val = new BigInt64Array([num]);
				processInput(val);
				document.getElementById("main-text-input").value = formatBin(val, inpSize);
				return;
			}
			else
			{
				activateBadInput(element);
				return;
			}
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
	const uint8 = new Uint8Array([Number(val[0])]);
	const uint16 = new Uint16Array([Number(val[0])]);
	const uint32 = new Uint32Array([Number(val[0])]);
	const uint64 = new BigUint64Array([val[0]]);
	const sint8 = new Int8Array([Number(val[0])]);
	const sint16 = new Int16Array([Number(val[0])]);
	const sint32 = new Int32Array([Number(val[0])]);
	const sint64 = new BigInt64Array([val[0]]);

	processInputFor(val, uint8, "uint8", 8);
	processInputFor(val, uint16, "uint16", 16);
	processInputFor(val, sint8, "sint8", 8);
	processInputFor(val, sint16, "sint16", 16);
}

function processInputFor(origVal, val, type, actualBits)
{
	const elm = document.getElementById(`${type}`);
	const decElm = document.getElementById(`${type}-dec`);
	const hexElm = document.getElementById(`${type}-hex`);
	const octElm = document.getElementById(`${type}-oct`);
	const binElm = document.getElementById(`${type}-bin`);

	resetOverflowWarning(elm);
	if (origVal[0] != BigInt(val[0]))
	{
		activateOverflowWarning(elm);
	}

	resetBadInput(decElm);
	resetBadInput(hexElm);
	resetBadInput(octElm);
	resetBadInput(binElm);

	console.log(val[0].toString());
	console.log(formatHex(val, actualBits));
	console.log(formatOct(val, actualBits));
	console.log(formatBin(val, actualBits));

	if (document.activeElement !== decElm)
		decElm.value = val[0].toString();
	if (document.activeElement !== hexElm)
		hexElm.value = formatHex(val, actualBits);
	if (document.activeElement !== octElm)
		octElm.value = formatOct(val, actualBits);
	if (document.activeElement !== binElm)
		binElm.value = formatBin(val, actualBits);
}

function formatHex(val, actualBits)
{
	return "0x" + (BigInt.asUintN(64, BigInt(val[0])) % (2n**BigInt(actualBits))).toString(16).toUpperCase().padStart(actualBits / 4, '0');
}

function formatOct(val, actualBits)
{
	return "0o" + (BigInt.asUintN(64, BigInt(val[0])) % (2n**BigInt(actualBits))).toString(8).padStart(Math.ceil(actualBits / 3), '0').slice(-Math.ceil(actualBits / 3));
}

function formatBin(val, actualBits)
{
	return "0b" + (BigInt.asUintN(64, BigInt(val[0])) % (2n**BigInt(actualBits))).toString(2).padStart(actualBits, '0').slice(-actualBits);
}
