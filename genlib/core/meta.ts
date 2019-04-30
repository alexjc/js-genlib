// genlib — Copyright (c) 2019, Alex J. Champandard. Code licensed under the GNU AGPLv3.

function setdefault(object, key, value) {
  if (key in object) {
    return object[key];
  }
  object[key] = value;
  return value;
}

function watching(...keys: string[]) {
  return (target: any, _: string, descriptor: TypedPropertyDescriptor<any>) => {
    setdefault(target, "_genlib", {});
    setdefault(target._genlib, "methods_watching", {});

    for (const key of keys) {
      const methods = setdefault(target._genlib.methods_watching, key, []);
      methods.push(descriptor.value);
    }
    return descriptor;
  };
}

function provides(...keys: string[]) {
  return (target: any, _: string, descriptor: TypedPropertyDescriptor<any>) => {
    setdefault(target, "_genlib", {});
    const methods = setdefault(target._genlib, "method_provides", {});

    for (const key of keys) {
      methods[key] = descriptor.value;
    }
    return descriptor;
  };
}

export { watching, provides };
