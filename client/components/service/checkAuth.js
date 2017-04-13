import axios from 'axios'
console.log('checkAuth ran')

export default function () {
  let authItems = {
    token: localStorage.getItem('token'),
    user: localStorage.getItem('username')
  }

  return axios.post('/auth/checkAuth', authItems)
  .then((res) => {
    if (res.data.validUser) {
      return true
    } else {
      return false
    }
  })
  .catch((err) => {
    console.error('error checking credentials', err)
  })
}
