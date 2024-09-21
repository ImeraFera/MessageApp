import { createAvatar } from '@dicebear/core';
import { bottts } from '@dicebear/collection';


export const generateAvatar = (seed) => {
    const avatar = createAvatar(bottts, {
        seed,
    });
    const svg = avatar.toJson();
    return svg;
}