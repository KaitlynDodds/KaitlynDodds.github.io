
/* AJAX GET Repository Info
****************************/
	
$.ajax({
	method: "GET",
	url: "https://api.github.com/users/KaitlynDodds/repos?sort=created&direction=desc",
	success: (data) => {
	  	handleRepoData(data);
	},
	error: (err) => {
		console.log(`Error: ${err.message}`);
	}
});


/* Build UI Functions
****************************/

/* Project Div Layout *
<div class="project">
	<h3>
		[PROJECT NAME]
	</h3>
	<div>
		<span>
			<a href="[GITHUB REPO LINK]">code</a>
		</span>
		<span>
			<a href="[ACTIVE SITE LINK]">site</a>
		</span>
	</div>
	<p>
		[PROJECT DESCRIPTION]
	</p>
</div>
*/

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

function createProjectDiv(repoObj) {
	// create project div 
	const projectDiv = $('<div>');
	projectDiv.addClass('project');

	// create h3 
	const nameH3 = $(`<h3>${repoObj.name}</h3>`);

	// create code and site links
	const linksDiv = $(`<div><span><a href="${repoObj.html_url}">code</a></span><span><a href="">site</a></span></div>`);

	// create p desc
	const descriptionPara = $(`<p>${(repoObj.description ? repoObj.description : "")}</p>`);

	// add to projectDiv
	nameH3.appendTo(projectDiv);
	linksDiv.appendTo(projectDiv);
	descriptionPara.appendTo(projectDiv);

	return projectDiv;
}























