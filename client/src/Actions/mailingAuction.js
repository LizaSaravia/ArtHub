import axios from 'axios';

export default function mailinAuction (userEmail, info) {
    return async dispatch => {
        await axios.post(`http://localhost:3001/mailer/auction/${userEmail}`, {
            info
        }
)
            .then((res) => dispatch({ type: "SEND_MAIL_AUCTION", payload: res.data }))
    }
}