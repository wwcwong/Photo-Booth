var count = 0;

// uploads an image within a form object.  This currently seems
// to be the easiest way to send a big binary file.
function uploadFile() {
    var image = document.getElementById('theImage'+count);

    var url = "http://138.68.25.50:9918";

    // where we find the file handle
    var selectedFile = document.getElementById('fileSelector').files[0];
    var formData = new FormData();
    // stick the file into the form
    formData.append("userfile", selectedFile);

    // more or less a standard http request
    var oReq = new XMLHttpRequest();
    // POST requests contain data in the body
    // the "true" is the default for the third param, so
    // it is often omitted; it means do the upload
    // asynchornously, that is, using a callback instead
    // of blocking until the operation is completed.
    oReq.open("POST", url, true);
    oReq.onload = function() {
        // the response, in case we want to look at it
        console.log(oReq.responseText);
        image.style.opacity = 1.0;
    }
    oReq.send(formData);
    count++;
}


function readFile() {

    var selectedFile = document.getElementById('fileSelector').files[0];
    $(".image-container").append("<div id='block"+count+"' class='blockClass'></div>");
    var temp = "#block"+count;
    $(temp).append("<div id='imgblockout"+count+"' class = 'imgblockoutClass'></div>");
    $(temp).append("<div id='tagblockout"+count+"' class = 'tagblockoutClass'></div>");
    var temp2 = "#imgblockout"+count;
    $(temp2).append("<div id='imgblockin"+count+"' class = 'imgblockinClass'></div>");
    var temp3 = "#imgblockin"+count;
    $(temp3).append("<img id='theImage"+count+"'/>");
    $(temp3).append("<div id='option"+count+"' class = 'optionClass'></div>");
    var temp4 = "#option"+count;
    // $(temp4).append("<img' id='theIcon"+count+"'/>");
    $(temp4).append("<input type='image' class='iconclass' id='theIcon"+count+"'/>");


    $(temp4).append("<div id='changetagblock"+count+"' class = 'changetagclass'></div>");
    $(temp4).append("<div id='favblock"+count+"' class = 'favclass'></div>");
    $(temp4).append("<div id='inneropt"+count+"' class = 'inneroptclass'></div>");

    var temp5 = "#tagblockout"+count;
    $(temp5).append("<input type='text' class='tagSelector' id='tagSelector"+count+"'>");
    $(temp5).append("<button class='addButton' id='addButton"+count+"' >Add</button>");

    var change = "#changetagblock"+count;
    var fav = "#favblock"+count;
    var inner = "#inneropt"+count;
    $(change).append("<input type='button' class='button' value ='change tags' id='changetags"+count+"'/>");
    $(fav).append("<input type='button' class='button' value ='add to favorites' id='addfav"+count+"'/>");
    $(inner).append("<input type='image' class='button' id='innerIcon"+count+"'/>");

    var innericon = document.getElementById('innerIcon' + count);
    var myfav = document.getElementById('addfav' + count);
    var mychange = document.getElementById('changetags' + count);
    innericon.src = "./photobooth/options.png";
    innericon.style.display =  "none";
    myfav.style.display="none";
    mychange.style.display="none";
    var image = document.getElementById('theImage' + count);
    var icon = document.getElementById('theIcon' + count);
    var add = document.getElementById('addButton' + count);
    var fr = new FileReader();
    // anonymous callback uses file as image source
    fr.onload = function () {
        image.src = fr.result;
        image.style.opacity = 1;
        icon.src = "/photobooth/optionsTriangle.png";
        icon.style.opacity = 1;

    };

    add.onclick = (function() {
      var num = count;
      console.log("add:"+num);
      return function() {
                        readTag(selectedFileName, num); sendTag(selectedFileName, num);
                        }
    })();

    icon.onclick = (function() {
                        var iconnum = "theIcon"+count;
                        var imagenum = "theImage"+count;
                        var mycount =count;
                        console.log("my count:"+count);
                        return function() {
                        showMenu(iconnum, imagenum,mycount);
                        }
                        })();

    fr.readAsDataURL(selectedFile);    // begin reading
}



function display_img()
{

   alert("Image is loaded");
    var url = "http://138.68.25.50:9918/query?op=dump";
    var oReq = new XMLHttpRequest();
    oReq.open("GET", url);
    oReq.onload = function()
    {
      //  console.log("back to call back");
   //     console.log(oReq.responseText);
        var dataArray = JSON.parse(oReq.responseText);
        if (dataArray.length > 0)
        {
            addPhotosToDOM(dataArray);
        }
    };
    oReq.send();


}
function addPhotosToDOM(dataArray)
{
    alert("try to add photo");
// //   console.log(dataArray[0].fileName);
    var mylength = (dataArray.length);
    console.log(mylength);

    //create a new img tag in html
    for (count=0;count<mylength;count++)
    {
        console.log(dataArray[count].fileName);
        var source = dataArray[count].fileName;

        $(".image-container").append("<div id='block"+count+"' class='blockClass'></div>");
        var temp = "#block"+count;
        $(temp).append("<div id='imgblockout"+count+"' class = 'imgblockoutClass'></div>");
        $(temp).append("<div id='tagblockout"+count+"' class = 'tagblockoutClass'></div>");
        var temp2 = "#imgblockout"+count;
        $(temp2).append("<div id='imgblockin"+count+"' class = 'imgblockinClass'></div>");
        var temp3 = "#imgblockin"+count;
        $(temp3).append("<img id='theImage"+count+"'/>");
        $(temp3).append("<div id='option"+count+"' class = 'optionClass'></div>");
        var temp4 = "#option"+count;
        // $(temp4).append("<img onclick='box()' id='theIcon"+count+"'/>");
        $(temp4).append("<input type='image' class='iconclass' id='theIcon"+count+"'/>");

        $(temp4).append("<div id='changetagblock"+count+"' class = 'changetagclass'></div>");
        $(temp4).append("<div id='favblock"+count+"' class = 'favclass'></div>");
        $(temp4).append("<div id='inneropt"+count+"' class = 'inneroptclass'></div>");

        var temp5 = "#tagblockout"+count;
        $(temp5).append("<input type='text' class='tagSelector' id='tagSelector"+count+"'>");
        $(temp5).append("<button class='addButton' id='addButton"+count+"' >Add</button>");


        var change = "#changetagblock"+count;
        var fav = "#favblock"+count;
        var inner = "#inneropt"+count;
        $(change).append("<input type='button' class='button' value ='change tags' id='changetags"+count+"'/>");
        $(fav).append("<input type='button' class='button' value ='add to favorites' id='addfav"+count+"'/>");
        $(inner).append("<input type='image' class='button' id='innerIcon"+count+"'/>");

        var innericon = document.getElementById('innerIcon' + count);
        var myfav = document.getElementById('addfav' + count);
        var mychange = document.getElementById('changetags' + count);
        innericon.src = "./photobooth/options.png";
        innericon.style.display =  "none";
        myfav.style.display="none";
        mychange.style.display="none";
        // $(temp4).append("<div class='optionbox' style='display:none;' id='boxes'><ul><li><a>change tags</a></li><li><a>add to favorite</a></li><li><a><br></a></li></ul></div>")

        var image = document.getElementById('theImage' + count);
        var icon = document.getElementById('theIcon' + count);
        image.src = "../"+source;
        icon.src = "/photobooth/optionsTriangle.png";

        icon.onclick = (
                        function() {
                        var iconnum = "theIcon"+count;
                        var imagenum = "theImage"+count;
                        var mycount =count;

                        console.log("my count:"+count);

                        return function() {
                          showMenu(iconnum, imagenum,mycount);
                        }
                        })();

        var add = document.getElementById('addButton' + count);
        add.onclick = (function() {
                  var num = count;
                  console.log("dom add:"+num);
                  return function() {
                                    readTag(source, num); sendTag(source, num);
                                    }
                })();
        // var box ="<div class='optionbox' style='display:none;' id='boxes"+count+"'><ul><li><a>change tags</a></li><li><a>add to favorite</a></li><li><a><br></a></li></ul></div>"
    /*    $(".image-container").append("<img id='theImage"+count+"'/>");
        $('theImage'+count).css("opacity", "1");
        var image = document.getElementById('theImage' + count);
        image.src = "../"+source;*/
    }
}



function favpic(imgName) {
    // where we find the label
 //   var label = document.getElementById('tagSelector').value;
console.log("in fav?");

    var url = "http://138.68.25.50:9918/query?op=fav&img="+imgName;

    // more or less a standard http request
    var oReq = new XMLHttpRequest();
    // POST requests contain data in the body
    // the "true" is the default for the third param, so
    // it is often omitted; it means do the upload
    // asynchornously, that is, using a callback instead
    // of blocking until the operation is completed.
    oReq.open("GET", url);
    oReq.onload = function() {
        // the response, in case we want to look at it
        console.log(oReq.responseText);
        //image.style.opacity = 1.0;
    }
    oReq.send();
}


function showMenu(iconnum, imagenum, mycount)
{

    console.log(iconnum);
    console.log(imagenum);
    console.log(mycount);

    var innericon = document.getElementById('innerIcon' + mycount);
    var myfav = document.getElementById('addfav' + mycount);
    var mychange = document.getElementById('changetags' + mycount);
    var oldicon =document.getElementById(iconnum);
    oldicon.style.display = "none";
    innericon.style.display =  "inline-block";
    myfav.style.display="inline-block";
    mychange.style.display="inline-block";


    var image = document.getElementById('theImage' + mycount);
    var temp = image.src.split("/"); // get query string
    var mylength = (temp.length);
    var imgName = temp[mylength-1];


    myfav.onclick = (
      function() {
        console.log(imgName);
        return function() {
          favpic(imgName);
        }
      })();
      innericon.onclick = (
        function() {
          console.log("???");
          return function() {
            oldicon.style.display = "block";
            myfav.style.display = "none";
            innericon.style.display = "none";
            mychange.style.display="none";
          }
        })();
}
