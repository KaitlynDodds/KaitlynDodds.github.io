
/* AJAX GET Repository Info
****************************/

	
$.ajax({
	method: "GET",
	url: "https://api.github.com/users/KaitlynDodds/repos?sort=created&direction=desc",
	success: (data) => {
	  	handleRepoData(data);
	},
	error: (err) => {
		console.log(`Error: ${err.Message}`);
	}
});

function handleRepoData(dataArr) {
	// take first 20 repos 
	const recentRepos = dataArr.slice(0, 20);

	let projectDiv;
	// for each repo, build project div 
	for (let r = 0; r < recentRepos.length; r++) {
		// create div to hold project info
		projectDiv = createProjectDiv(recentRepos[r]);

		// add to list of projects 
		$(projectDiv).appendTo('.project-list');
	}
}

/*
<div class="project">
	<h3>
		guess-the-phrase-game
	</h3>
	<div>
		<span><a href="">code</a></span><span><a href="">site</a></span>
	</div>
	<p>
		Fun guess the phrase game (mimics wheel of fortune) created in html, css, and vanilla js.
	</p>
</div>
*/

function createProjectDiv(repoObj) {
	// project name
	const projectName = repoObj.name;
	// url to github code
	const projectCodeUrl = repoObj.html_url;
	// url to site (if available)
	// TODO
	// description
	const projectDesc = repoObj.description;

	// create project div 
	const projectDiv = $('<div>');
	projectDiv.addClass('project');

	// create h3 
	const nameH3 = $(`<h3>${projectName}</h3>`);

	// create p desc
	const descriptionPara = $(`<p>${projectDesc}</p>`);

	// create code and site links
	const linksDiv = $(`<div><span><a href="${projectCodeUrl}">code</a></span><span><a href="">site</a></span></div>`);

	// add to projectDiv
	nameH3.appendTo(projectDiv);
	linksDiv.appendTo(projectDiv);
	descriptionPara.appendTo(projectDiv);

	return projectDiv;
}























