import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  
  return (await axios.get(baseUrl)).data  
}

const createNew = async (newblog,account) => {

  return (await axios.post(baseUrl, newblog,{ "headers": { "Authorization": `bearer ${account.userToken}`}  })).data
}

const update = async (updatedblog) => {
  const updateurl = baseUrl+'/'+updatedblog.id
  return (await axios.put(updateurl, updatedblog)).data
}

const addComment = async (id,comment) => {
  const updateurl = baseUrl+'/'+id+'/comments'
  console.log(updateurl)
  return (await axios.post(updateurl, comment)).data
}

const remove = async (id,account) => {
  const deleteurl = baseUrl+'/'+id
  return await axios.delete(deleteurl,{ "headers": { "Authorization": `bearer ${account.userToken}`}  })
}

export default { getAll,createNew,update,remove,addComment}


