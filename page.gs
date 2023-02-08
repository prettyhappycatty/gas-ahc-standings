const pageTitle = ''//TODO ページタイトルを入力してください
const spreadSheetId = ''//TODO スプレッドシート IDを入力してください
//const pageTitle = 'MTK003'
//const spreadSheetId = '1o5qHSGHHnq5yff3q9MRq06ByQBYifC-DkPm3feYF4IA'

const lastRow = SpreadsheetApp.openById(spreadSheetId).getLastRow() - 1
const contestData = SpreadsheetApp.openById(spreadSheetId).getSheetByName("contest_info").getRange(1, 1, 3, 2).getValues();
const memberData = SpreadsheetApp.openById(spreadSheetId).getSheetByName("contest_info").getRange(6, 1, lastRow, 6).getValues();

function doGet() {
  const htmloutput =  HtmlService.createTemplateFromFile("index").evaluate(); 
  htmloutput.setTitle(pageTitle)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
  return htmloutput
}