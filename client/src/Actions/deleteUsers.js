//POP up delete user

export default function deleteUsers(condition) {
    return {type: 'POP_UP_DELETE_USER', payload: condition};
}