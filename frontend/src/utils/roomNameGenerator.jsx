



export const generateRoomName = (user1Id, user2Id) => {
    const sortedIds = [user1Id, user2Id].sort();
    return `${sortedIds[0]}_${sortedIds[1]}`;
};
