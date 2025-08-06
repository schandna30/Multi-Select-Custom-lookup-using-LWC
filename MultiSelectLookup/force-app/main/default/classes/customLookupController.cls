public with sharing class customLookupController {
  @AuraEnabled(cacheable=true)//to invoke from lwc , cacheble= true to invoke from wire decorater
   public static List<sobject> fetchLookupdata(String searchkey,String objectName){
    List<sObject> sobjectList= new List<sObject>();

    if(string.isBlank(searchkey)){
        return sobjectList;
    }
    else{
string key = '%' + searchkey + '%';
string query = 'SELECT Id, Name FROM ' + objectName + 
               ' WHERE Name LIKE :key ORDER BY Name LIMIT 5';
    sobjectList=Database.query(query,AccessLevel.USER_MODE );//Accesslevel.USER_MODE o return only the records to which users have access
    return sobjectList;
   }
}
}