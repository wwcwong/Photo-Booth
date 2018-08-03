var fav_count = 0;
//display the tag in the web page
function display_fav()
{
    
    alert("fav is loaded");
    var url = "http://138.68.25.50:8592/query?op=favload";
    var oReq = new XMLHttpRequest();
    oReq.open("GET", url);
    oReq.onload = function()
    {
        alert("onload?");
        //  console.log("back to call back");
        //     console.log(oReq.responseText);
        var dataArray = JSON.parse(oReq.responseText);
    //    console.log(dataArray[0].fileName);
      //      var mylength = (dataArray.length);
       // console.log(mylength);
        if (dataArray.length > 0)
        {
            addPhotosToFav(dataArray);
        }
        else
        {
            alert("tf?");
        }
    };
    oReq.send();
    
    
}


function addPhotosToFav(dataArray)
{
    alert("try to load fav photo");
    // //   console.log(dataArray[0].fileName);
    var mylength = (dataArray.length);
    console.log(mylength);
    
    //create a new img tag in html
    for (fav_count=0;fav_count<mylength;fav_count++)
    {
        console.log(dataArray[fav_count].fileName);
        var source = dataArray[fav_count].fileName
        $(".favimg-container").append("<img id='favImage"+fav_count+"'/>");
        $('favImage'+fav_count).css("opacity", "1");
        var image = document.getElementById('favImage' + fav_count);
        image.src = "../"+source;
        
    }
    
}