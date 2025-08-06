import { api, LightningElement ,wire} from 'lwc';
import fetchLookupdata from '@salesforce/apex/customLookupController.fetchLookupdata';
const DELAY=300;
export default class MultiLookup extends LightningElement {
    searchKey;
    hasRecords=false;
    serachOutput=[];
    timeout;
    
    @api label='Account';
    @api iconName='standard:account'
    @api placeholder='Search Account'
    @api objectApiName='Account'
    @wire(fetchLookupdata,{
        searchkey :"$searchKey",
        objectName :"$objectApiName"
        
    }) searchResult({data,error}){
        if(data){
            console.log(data)
            this.hasRecords = data.length > 0 ? true : false;
            console.log(this.hasRecords,'has records');
            this.serachOutput=data;
            console.log('i was here 1')
        }
        else if(error){
            console.log(error)
            console.log('i was here')
        }
    }
    changeHandler(event){
        clearTimeout(this.timeOut);
        let value= event.target.value;
        console.log(this.value,value);
        this.timeOut= setTimeout(()=>{this.searchKey=value;},DELAY);
    }
    clickHandler(event)
    {
        let recId=event.target.getAttribute("data-recid");
        console.log(recId,"recId");
        let seletcedRecord= this.serachOutput.find((currItem)=>currItem.Id===recId);
          let Pill = [
        {
            type: 'icon',
            name: 'recId',
            label:  'seletcedRecord.Name',
            IconName: 'this.iconName',
            alternativeText: 'seletcedRecord.Name',
            
        }
      
    ];
    }
    

}