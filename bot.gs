//TODO::このメソッドを定期実行することにする
function updateScore() {

  problem_id = contestData[0][1]
  start_at = Date.parse(contestData[1][1])/1000
  end_at = Date.parse(contestData[2][1])/1000
  Logger.log(start_at)
  Logger.log(end_at)

  team_point = {}
  for(var i=0;i<memberData.length;i++){
    user_id = memberData[i][0]
    if (user_id === ""){
      continue
    }
    team_name = memberData[i][1]
    //if ( -1 == Object.keys(student).indexOf(team_name)){//連想配列に含まれない場合初期化
    //  team_score[team_name] = 0
    //}
    point = 0
    lang = ""
    url = "https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions?user=" + user_id +"&from_second=" + start_at;
    Logger.log(url)
    var res = UrlFetchApp.fetch(url);
    submits = JSON.parse(res)
    for(var j=0; j<submits.length;j++){
      //Logger.log(submits[j])
      if (submits[j].problem_id != problem_id){
        continue
      }
      //if (submits[j].user_id === "meowmeowcats"){
      //  Logger.log("check")
      //  Logger.log(submits[j].problem_id)
      //  Logger.log(submits[j].point)
      //  Logger.log(submits[j].epoch_second)
      //  Logger.log(end_at)
      //}
      
      if (submits[j].epoch_second >= end_at){
        //Logger.log("continue")
        //Logger.log(submits[j].point)
        //Logger.log(point)
        j = submits.length
        break
      }
      //Logger.log(submits[j].point)
      if (point < submits[j].point){
        point = submits[j].point
        lang = submits[j].language
      }
    }
    //Logger.log(point)
    //Logger.log(SpreadsheetApp.openById(spreadSheetId).getSheetByName("contest_info").getRange(i+6,3).getValue())
    SpreadsheetApp.openById(spreadSheetId).getSheetByName("contest_info").getRange(i+6,3).setValue(point)
    SpreadsheetApp.openById(spreadSheetId).getSheetByName("contest_info").getRange(i+6,4).setValue(lang)
  }
}
