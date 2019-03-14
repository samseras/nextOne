import axios from '~/plugins/http'
// import { getUrl } from './path'


const tts = {
    getAllConsume () {
        return axios({
          method: 'get',
          url: `ttsv2/consume/statistics`
        })
      }
}
export default tts