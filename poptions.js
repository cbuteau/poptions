
const CODES = {
  OBJECT: 1,
  BOOLEAN: 2,
  STRING: 3,
  ARRAY: 4,
  FUNCTION: 5,
  REGEX: 6,
  NULL: 7,
  UNDEFINED: 8
}


function getType(value) {
  if (value === null) {
    return CODES.NULL;
  }
  if (value === undefined) {
    return CODES.UNDEFINED;
  }
  if (value === true || value === false) {
    return CODES.BOOLEAN;
  }
  if (Array.isArray(value)) {
    return CODES.ARRAY;
  }
  if (value.call && value.length) {
    return CODES.FUNCTION;
  }
  if (value.toString && value.hasOwnProperty) {
    return CODES.OBJECT;
  }
  if (value.test && value.exec) {
    return CODES.REGEX;
  }
}

function getMore(type, value) {
  if (type === CODES.OBJECT) {
    return buildPropMap(value);
  }
  if (type === CODES.FUNCTION) {
    return {
      paramCount: value.length
    };
  }

  return {
    empty: true
  };
}

function buildPropMap(value) {
  let map = {};
  let keys = Object.keys(value);
  for (let i = 0; i < keys.length; i++) {
    let prop = keys[i];
    let val = value[prop];
    let type = getType(val)
    map[prop] = {
      type: type,
      more: getMore(type, val)
    };
  }
  return map;
}

function arrayCompare(arrayOne, arrayTwo) {
  if (arrayOne.length === arrayTwo.length) {
    let passes = 0;
    for (let i = 0; i < arrayOne.length; i++) {
      let item = arrayOne[i];
      if (arrayTwo.indexOf(item) !== -1) {
        pass++;
      }
    }
    return pass === arrayOne.length;
  } else {
    return false;
  }
}

function compareMaps(optionMap, validationMap) {
  let optsKeyList = Object.keys(optionMap);
  let valKeyList = Object.keys(validationMap);
  if (arrayCompare(optsKeyList, valKeyList)) {

  } else {
    return false;
  }
}

function POPTIONS(options, validation) {
  let map = buildPropMap(options);
  let val = buildPropMap(validation);
  this.isValid = compareMaps(map, val);
}
