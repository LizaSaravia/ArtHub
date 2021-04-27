//Change user log status
export default function userLog(condition){
    return {type:'IS_USER_LOGGED', payload:condition}
  }