export { imageToDataURL } from './imageToDataURL';
export { gpxToGeoJSON } from './gpxToGeoJSON';

export function dataURLtoFile(dataurl: string, filename: string) {
    if (dataurl.length === 0) return null;
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/);
    if (!mime) return null;
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime[0] });
}
