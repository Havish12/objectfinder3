status="";
objects=[];

function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = 'Status: Detecting Objects';
    inputtag = document.getElementById("objectname").value
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status=true;
}


function draw()
{
    image(video, 0, 0, 380, 380);

    if(status !="")
    {
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Objects detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects Detected are : " + objects.length;

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" + 15, objects[i].y +15);
            noFill();
            stroke("FF0000");
            rect(objects[i].x, objects[i].y, objects[i],width, objects[i].height);
        }
    }
}

function gotResult()
{
    objects = results;
    objectDetector.detect(gotResult);
    document.getElementById("status").innerHTML = "The object mentioned has been located.";
    
    utterThis = new SpeechSynthesisUtterance(results[0].status);
    synth.speak(utterThis);
}