function home() //Doesn't work properly
{
	if(document.location.href == "./home.html")
		return;
	else
	{
		document.location.href = "./home.html";
	}
}
// doesnt work properly
function resume()
{
	if(document.location.href == "./resume.html")
		return;
	else
		document.location.href = "./resume.html"
}

function fb(){
	document.location.href= "https://www.facebook.com/jacob.abkes1"
}

function gh(){
	document.location.href= "https://github.com/jaabkes"
}