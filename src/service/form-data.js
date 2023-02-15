export function toFormData(data) {
  const formData = new FormData();
  buildFormData(formData, data);
  return formData;
}

function buildFormData(
  formData,
  data,
  parentKey
) {
  if (
    data &&
    typeof data === "object" &&
    !(data instanceof Array)&&
    !(data instanceof Date) &&
    !(data instanceof Blob)
  ) {
    Object.keys(data).forEach(key => {
      buildFormData(
        formData,
        data[key],
        parentKey
          ? !isNaN(+key)
            ? `${parentKey}[${key}]`
            : `${parentKey}.${key}`
          : key
      );
    });
  } else if (parentKey) {
    const value = data instanceof Date ? data.toString() : data;
    formData.append(parentKey, value);
  }
}
