export const convertToURL = (url: string) => {
    let newURL = url;
    newURL = newURL.replace(/[^\w\s-]+/g, '');
    newURL = newURL.replace(/\s/g, '-');
    return newURL.toLocaleLowerCase();
};
