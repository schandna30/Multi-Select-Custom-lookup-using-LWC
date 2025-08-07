import { api, LightningElement ,wire} from 'lwc';
import fetchLookupdata from '@salesforce/apex/customLookupController.fetchLookupdata';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const DELAY=300;
export default class MultiLookup extends LightningElement {
    searchKey;
    hasRecords=false;
    serachOutput=[];
    timeout;
    selectedRecords=[];
    
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
        clearTimeout(this.timeout);
        let value= event.target.value;
        console.log(this.value,value);
        this.timeout= setTimeout(()=>{this.searchKey=value;},DELAY);
    }
    clickHandler(event)
    {

        let recId=event.target.getAttribute("data-recid");
        console.log(recId,"recId");
        if(this.validateDuplicate(recId)){
          let selectedRecord= this.serachOutput.find((currItem)=>currItem.Id===recId);
          let Pill = [
        {
            type: 'icon',
            name: recId,
            label:  selectedRecord.Name,
            IconName: this.iconName,
            alternativeText: selectedRecord.Name
            
        }
      
    ];
    this.selectedRecords=[...this.selectedRecords, Pill];
        }
       
    }
    
    get showPillContainer(){
        return this.selectedRecords.length >0 ? true :false;

    }
    handleItemRemove(event){
       
        const index = event.detail.index;
        this.selectedRecords.splice(index, 1);
    }

    validateDuplicate(selectedRecord){
        let isValid=true;
        let isRecordAlreadySelected= this.selectedRecords.find((currItem=>currItem.Name===selectedRecord))
        if(isRecordAlreadySelected){
            isValid=false;
            this.dispatchEvent(new ShowToastEvent({
                title:'Error',
                message:'Record Already Removed',
                variant: 'error'
            }));
         
        }
        else{
            isValid=true;
        }

        return isValid;
    }
}