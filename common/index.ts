export function formatErrorString(
  propertyName: string,
  propertyValue: any,
  type: string
): Error {
  let enumerableTypeLength: string = "";
  if (
    (type.toLowerCase() === "array" && Array.isArray(propertyValue)) ||
    (type.toLowerCase() === "string" && typeof propertyValue === "string")
  ) {
    enumerableTypeLength = ` with a length of (${propertyValue.length})`;
  }
  if (type.toLowerCase() === "object") {
    enumerableTypeLength = ` with (${
      Object.keys(propertyValue).length
    }) number of keys`;
  }
  const errorMessage =
    `Expected (${propertyName}) to be of type (${type}) but received: (${propertyValue}) type of (${typeof propertyValue})` +
    enumerableTypeLength;
  throw new Error(errorMessage);
}
