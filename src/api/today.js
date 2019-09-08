import axios from 'axios'

const today = async number =>
  await axios
    .get(`http://gank.io/api/today?key=${number}`)
    .then(({ data }) => data)

export default today
