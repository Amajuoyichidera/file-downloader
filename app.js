const fileInput = document.querySelector("input");
downloadBtn = document.querySelector("button");

downloadBtn.addEventListener("click", e => {
   e.preventDefault();  // preventing form from submitting
   downloadBtn.innerText = "Downloading file...";
   fetchfile(fileInput.value);
});

function fetchfile(url) {
    // fetching file and returning response as blob
    fetch(url).then(res => res.blob()).then(file => {
        // URL.createObjectURL creates a url of passed object
        let tempUrl = URL.createObjectURL(file);
        let aTag = document.createElement('a');
        aTag.href = tempUrl;  // passing tempUrl as href value of <a> tag
        aTag.download = url.replace(/^,*[\\\/]/, '');  // passing file last name and extension as download value of <a> tag
        document.body.appendChild(aTag);  // adding <a> tag to inside body
        aTag.click(); // clicking <a> tag on the file download
        aTag.remove(); // removing <a> tag once file downloaded
        URL.revokeObjectURL(tempUrl); // removing tempurl from the document
        downloadBtn.innerText = "Download file";
    }).catch(() => {
        // catch method will call if any error comes during downloading
        downloadBtn.innerText = "Download file";
        alert("Failed to download file!");
    })
}