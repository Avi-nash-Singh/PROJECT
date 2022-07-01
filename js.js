console.log("working")

function downloadCSV(csv, filename) {
    let csvFile;
    let downloadLink;
    // CSV file
    csvFile = new Blob([csv], {type: "text/csv"});
    // Download link
    downloadLink = document.createElement("a");
    // File name
    downloadLink.download = filename;
    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);
    // Hide download link
    downloadLink.style.display = "none";
    // Add the link to DOM
    document.body.appendChild(downloadLink);
    // Click download link
    downloadLink.click();
}

function exportTableToCSV(filename) {
    let csv = [];
    let rows = document.querySelectorAll("table tr");
    for (var i = 0; i < rows.length; i++) {
        let row = [], cols = rows[i].querySelectorAll("td, th");
        
        for (var j = 0; j < cols.length; j++) 
            row.push(cols[j].innerText);
        
        csv.push(row.join(","));        
    }
    // Download CSV file
    downloadCSV(csv.join("\n"), filename);
}

let table=document.getElementById("dataTable");
let cells=table.getElementsByTagName("td");
for(let i=0; i<cells.length; i++){
    cells[i].onclick=function() {

        this.setAttribute("data-clicked","yes");
        this.setAttribute("data-text",this.innerHTML)
        // console.log("clicked");
        let input=document.createElement("input");
        input.setAttribute("type","text");
        input.value=this.innerHTML;
        input.style.width=this.offsetWidth - (this.clientLeft * 2)+ "px";
        input.style.height=this.offsetHeight - (this.clientTop * 2)+ "px";
        input.style.border="0px";
        input.style.fontFamily="inherit";
        input.style.fontSize="inherit";
        input.style.maxHeight="1em";
        input.style.maxWidth="7rem"
        input.style.backgroundColor="LightGoldenRodYellow";

        input.onblur=function(){
            let td=input.parentElement;
            let orig_text=input.parentElement.getAttribute("data-text");
            let current_text=this.value;

            if(orig_text != current_text){
                // There are changes in the cell Text
                td.removeAttribute("data-clicked");
                td.removeAttribute("data-text");
                td.innerHTML=current_text;
                td.style.cssText="padding: 5px";
                console.log(orig_text +' changed to ' + current_text);
            }
            else{
                td.removeAttribute("data-clicked");
                td.removeAttribute("data-text");
                td.innerHTML=orig_text;
                td.style.cssText="padding: 5px";
                console.log("No changes");
            }
        }
        this.innerHTML="";
        this.style.cssText="padding: 0px 0px";
        this.append(input);
        this.firstElementChild.select();
    }
}
// function addRow(){
// }
