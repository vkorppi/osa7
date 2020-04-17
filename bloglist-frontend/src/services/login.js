import axios from 'axios'
const loginurl = '/api/login'

const sendUserCreds = async  usernamePassword => {

  return (await axios.post(loginurl, usernamePassword)).data
}
  
export default { sendUserCreds }