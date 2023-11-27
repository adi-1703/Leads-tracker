let myLeads = [] ;
let inputbtn = document.querySelector("#input-btn");
let inputel= document.querySelector("#input-el");
let ulEl = document.querySelector("#ul-el");

const leadsFromStorage = JSON.parse( localStorage.getItem("myLeads"));
if(leadsFromStorage){
    myLeads=leadsFromStorage;
    render(myLeads);
}

let tabBtn= document.querySelector("#tab-btn");
tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active:true , currentWindow:true} , function(tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads" , JSON.stringify(myLeads));
        render(myLeads);
    })
})

function render(leads){
    let listItems = "";
    for(let i=0;i<leads.length;i++)
    {
        listItems += `
            <li>
                <a href='${leads[i]}' target='_blanck'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML=listItems;
}

let deletebtn = document.querySelector("#delete-btn");
deletebtn.addEventListener("dblclick", function(){
    localStorage.clear();
    myLeads=[];
    render(myLeads);
})

inputbtn.addEventListener("click" , function(){
    myLeads.push(inputel.value);
    inputel.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
})


