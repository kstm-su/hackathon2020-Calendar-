
async function query(type, data){
  let tmp_data = {type: type, data: data}
  let ret = await axios.post('./main.php', JSON.stringify(tmp_data)).then(function(response) {
    console.log(response.data)
    console.log(response.status)
    return response.data
  }).catch(function(e) {
    console.error(e)
  })
  return ret
}


function registerUser(data) {
  //{userid:'a'}
  let ret = query('newUser', data)
  //{userid:'a', teamid:'b'}
  return ret
}

function loginUser(data){
  //{userid:'a'}
  let ret = query('loginUser', data)
  //{userid:'a'}
  return ret
}

function resisterTeam(data){
  //{userid:'a', teamid:'c'}
  return ret = query('newTeam', data)
  //{userid:'a', teamid:'c'}
}

async function registerEvent(data){
  //{userid:'a', teamid:"ks", eventname:"LT", starttime:'2020-11-14 11:00:00', endtime:'2020-11-15 16:00:00', priority:'3', memo:'hello', istodo:'true', istimetable:'true'}
  return query('newEvent', data)
  //{teamid:"ks", eventid:'some' or 'null', eventname:"LT", starttime:'2020-11-14 11:00:00', endtime:'2020-11-15 16:00:00', priority:'3', memo:'hello', istodo:'true', istimetable:'true'}
}

async function fetchEvents(data){
  return query('newEvent', data)
}

function deleteEvent(data){
  //{userid:'a', teamid:"kstm", eventname:"LT", starttime:'2020-11-14 11:00:00', endtime:'2020-11-15 16:00:00', priority:'3', memo:'hello', istodo:'true', istimetable:'true'}
  let ret = query('deleteteEvent', data)
  //{teamid:"kstm", eventid:'some' or 'null', eventname:"LT", starttime:'2020-11-14 11:00:00', endtime:'2020-11-15 16:00:00', priority:'3', memo:'hello', istodo:'true', istimetable:'true'}
  return ret
}

function joinTeam(data){
  // {userid:'a', teamid:'', teamname:'', ismyself:'', color:''}
  let ret = query('joinTeam', data)
  // {userid:'a', teamid:''or 'null', teamname:'', ismyself:'', color:''}
  return ret
}

function leaveTeam(data){
  // {userid:'a', teamid:'', teamname:'', ismyself:'', color:''}
  let ret = query('leaveTeam', data)
  // {userid:'a', teamid:'' or 'null', teamname:'', ismyself:'', color:''}
  return ret
}

function deleteUser(data){
  //{userid:'a'}
  let ret = query('deleteUser', data)
  //{userid:'a'}
  return ret
}

// new_user
// user_login
// add_team
// add_event
// join_team
// leave_team
// del_event
// del_team
// del_user
// INSERT INTO Users (userid, teamid)
// INSERT INTO Teams (teamid, teamname, ismyself, color)
// INSERT INTO Events (teamid, eventid, eventname, starttime, endtime, priority, memo, istodo, istimetable)
