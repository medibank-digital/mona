export const assertTagNameIsAllowed = (
  tagName: string,
  allowedTagNames: string[],
): void => {
  if (allowedTagNames.includes(tagName)) {
    return;
  }

  throw new Error(
    `Invalid Tag Name: '${tagName}'. Should be one of [${allowedTagNames
      .map((c) => `'${c}'`)
      .join(', ')}]`,
  );
};
