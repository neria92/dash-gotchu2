
export const uuid = (length) => {
    let uuid = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = length || characters.length;
    for (let i = 0; i < charactersLength; i++) {
        uuid += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return uuid;
}